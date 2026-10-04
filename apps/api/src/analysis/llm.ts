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
  modelName: 'mistralai/pixtral-12b:free',
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
      const result = await Promise.race([
        primaryStructured.invoke(input),
        new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Gemini Timeout or Rate Limit'));
          }, 10000);
        }),
      ]);
      return result;
    } catch (error) {
      console.warn(
        'Gemini failed or blocked, immediately switching to Mistral...',
        error,
      );
      return await openRouterStructured.invoke(input);
    }
  });
}
