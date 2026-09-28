import dotenv from 'dotenv';
dotenv.config();

export const config = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  TAVILY_API_KEY: process.env.TAVILY_API_KEY || '',
  PRIMARY_MODEL: process.env.PRIMARY_MODEL || 'gemini-3.7-flash',
  FALLBACK_MODEL: process.env.FALLBACK_MODEL || 'gemini-3.6-flash',
};
