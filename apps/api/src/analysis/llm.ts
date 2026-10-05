import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import { config } from './config';
import { RunnableLambda, Runnable } from '@langchain/core/runnables';
import { BaseLanguageModelInput } from '@langchain/core/language_models/base';

export const primaryModel = new ChatGoogleGenerativeAI({
  model: config.PRIMARY_MODEL,
  apiKey: config.GEMINI_API_KEY,
  temperature: 0.3,
  maxRetries: 0,
});

export const openRouterFallbackModel = new ChatOpenAI({
  modelName: 'mistralai/pixtral-12b:free',
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

export const llm = createWithFallbackAndTimeout(
  primaryModel,
  openRouterFallbackModel,
);

export function getStructuredLlm<T extends z.ZodType>(schema: T) {
  const primaryStructured = primaryModel.withStructuredOutput(schema);
  const openRouterStructured =
    openRouterFallbackModel.withStructuredOutput(schema);

  return createWithFallbackAndTimeout(primaryStructured, openRouterStructured);
}
