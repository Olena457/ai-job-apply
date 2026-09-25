import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { z } from 'zod';
import { config } from './config';

export const primaryModel = new ChatGoogleGenerativeAI({
  model: config.PRIMARY_MODEL,
  apiKey: config.GEMINI_API_KEY,
  temperature: 0.3,
  maxRetries: 1,
});

export const fallbackModel = new ChatGoogleGenerativeAI({
  model: config.FALLBACK_MODEL,
  apiKey: config.GEMINI_API_KEY,
  temperature: 0.3,
  maxRetries: 2,
});

export const llm = primaryModel.withFallbacks({
  fallbacks: [fallbackModel],
});

export function getStructuredLlm<T extends z.ZodType>(schema: T) {
  const primaryStructured = primaryModel.withStructuredOutput(schema);
  const fallbackStructured = fallbackModel.withStructuredOutput(schema);
  return primaryStructured.withFallbacks({
    fallbacks: [fallbackStructured],
  });
}
