import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import { config } from './config';
import { RunnableLambda } from '@langchain/core/runnables';
import { BaseLanguageModelInput } from '@langchain/core/language_models/base';

export const primaryModel = new ChatGoogleGenerativeAI({
  model: config.PRIMARY_MODEL,
  apiKey: config.GEMINI_API_KEY,
  temperature: 0.3,
  maxRetries: 0,
});

export const openRouterFallbackModel = new ChatOpenAI({
  modelName: 'openrouter/free',
  openAIApiKey: config.OPENROUTER_API_KEY,
  temperature: 0.3,
  maxRetries: 2,
  configuration: {
    baseURL: 'https://openrouter.ai/api/v1',
  },
});

export const llm = primaryModel.withFallbacks({
  fallbacks: [openRouterFallbackModel],
});

export function getStructuredLlm<T extends z.ZodType>(schema: T) {
  const primaryStructured = primaryModel.withStructuredOutput(schema);
  const openRouterStructured =
    openRouterFallbackModel.withStructuredOutput(schema);

  return RunnableLambda.from(async (input: BaseLanguageModelInput) => {
    try {
      // Збільшено таймаут до 40 секунд
      const result = await Promise.race([
        primaryStructured.invoke(input),
        new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Gemini Timeout or Rate Limit'));
          }, 40000);
        }),
      ]);
      return result;
    } catch (primaryError) {
      console.warn(
        'Gemini failed or timed out, switching to fallback model...',
        primaryError,
      );

      try {
        const fallbackResult = await openRouterStructured.invoke(input);
        return fallbackResult;
      } catch (fallbackError) {
        console.error('Fallback model ALSO failed:', fallbackError);
        throw new Error(
          'Both primary and fallback AI models failed to process the request.',
        );
      }
    }
  });
}
