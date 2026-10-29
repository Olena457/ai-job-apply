import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import { config } from './config';
import { RunnableLambda, Runnable } from '@langchain/core/runnables';
import { BaseLanguageModelInput } from '@langchain/core/language_models/base';

import { ApiKeysConfig } from './state';

export function createModels(keys?: ApiKeysConfig) {
  const geminiApiKey = keys?.geminiKey?.trim() || config.GEMINI_API_KEY;
  const openRouterApiKey =
    keys?.openRouterKey?.trim() || config.OPENROUTER_API_KEY;

  const primary = new ChatGoogleGenerativeAI({
    model: config.PRIMARY_MODEL,
    apiKey: geminiApiKey,
    temperature: 0.3,
    maxRetries: 0,
  });

  const fallback = new ChatOpenAI({
    modelName: 'openrouter/free',
    apiKey: openRouterApiKey || 'none',
    openAIApiKey: openRouterApiKey || 'none',
    temperature: 0.3,
    maxRetries: 2,
    configuration: {
      baseURL: 'https://openrouter.ai/api/v1',
    },
  });

  return { primary, fallback, hasFallback: Boolean(openRouterApiKey) };
}

export const primaryModel = new ChatGoogleGenerativeAI({
  model: config.PRIMARY_MODEL,
  apiKey: config.GEMINI_API_KEY,
  temperature: 0.3,
  maxRetries: 0,
});

export const openRouterFallbackModel = new ChatOpenAI({
  modelName: 'openrouter/free',
  apiKey: config.OPENROUTER_API_KEY,
  openAIApiKey: config.OPENROUTER_API_KEY,
  temperature: 0.3,
  maxRetries: 2,
  configuration: {
    baseURL: 'https://openrouter.ai/api/v1',
  },
});

function createWithFallbackAndTimeout<
  RunInput = BaseLanguageModelInput,
  RunOutput = unknown,
>(
  primary: Runnable<RunInput, RunOutput>,
  fallback: Runnable<RunInput, RunOutput>,
  hasFallback = true,
) {
  return RunnableLambda.from(async (input: RunInput): Promise<RunOutput> => {
    let timeoutId: NodeJS.Timeout | undefined;

    try {
      const result = await Promise.race([
        primary.invoke(input),
        new Promise<never>((_, reject) => {
          timeoutId = setTimeout(() => {
            reject(new Error('Gemini Timeout or Rate Limit'));
          }, 40000);
        }),
      ]);

      if (timeoutId) clearTimeout(timeoutId);
      return result;
    } catch (primaryError) {
      if (timeoutId) clearTimeout(timeoutId);

      if (!hasFallback) {
        console.error(
          'Primary AI model failed and no fallback configured:',
          primaryError,
        );
        throw primaryError;
      }

      console.warn(
        'Gemini failed or timed out, switching to fallback model...',
        primaryError,
      );

      try {
        return await fallback.invoke(input);
      } catch (fallbackError) {
        console.error('Fallback model ALSO failed:', fallbackError);
        throw new Error(
          'Both primary and fallback AI models failed to process the request.',
        );
      }
    }
  });
}

export function getLlm(keys?: ApiKeysConfig) {
  if (!keys?.geminiKey && !keys?.openRouterKey) {
    return createWithFallbackAndTimeout(
      primaryModel,
      openRouterFallbackModel,
      Boolean(config.OPENROUTER_API_KEY),
    );
  }
  const { primary, fallback, hasFallback } = createModels(keys);
  return createWithFallbackAndTimeout(primary, fallback, hasFallback);
}

export const llm = getLlm();

export function getStructuredLlm<T extends z.ZodType>(
  schema: T,
  keys?: ApiKeysConfig,
) {
  if (!keys?.geminiKey && !keys?.openRouterKey) {
    const primaryStructured = primaryModel.withStructuredOutput(schema);
    const openRouterStructured =
      openRouterFallbackModel.withStructuredOutput(schema);
    return createWithFallbackAndTimeout(
      primaryStructured,
      openRouterStructured,
      Boolean(config.OPENROUTER_API_KEY),
    );
  }

  const { primary, fallback, hasFallback } = createModels(keys);
  const primaryStructured = primary.withStructuredOutput(schema);
  const openRouterStructured = fallback.withStructuredOutput(schema);

  return createWithFallbackAndTimeout(
    primaryStructured,
    openRouterStructured,
    hasFallback,
  );
}
