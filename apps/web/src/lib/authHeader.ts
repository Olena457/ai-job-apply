
import { getUserApiKeys } from "./keysStorage";

export function getAuthHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const { geminiApiKey, tavilyApiKey, openRouterApiKey, googleScriptUrl, appPassword } =
    getUserApiKeys();

  const headers: Record<string, string> = {};

  if (appPassword) {
    headers["x-app-password"] = appPassword;
  }
  if (geminiApiKey) {
    headers["x-gemini-api-key"] = geminiApiKey;
  }
  if (tavilyApiKey) {
    headers["x-tavily-api-key"] = tavilyApiKey;
  }
  if (openRouterApiKey) {
    headers["x-openrouter-api-key"] = openRouterKeyOrEmpty(openRouterApiKey);
  }
  if (googleScriptUrl) {
    headers["x-sheets-url"] = googleScriptUrl;
  }

  return headers;
}

function openRouterKeyOrEmpty(key: string): string {
  return key.trim();
}

