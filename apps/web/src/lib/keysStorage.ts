export interface UserApiKeys {
  geminiApiKey: string;
  tavilyApiKey: string;
  openRouterApiKey: string;
  googleScriptUrl: string;
  appPassword: string;
}

const STORAGE_KEYS = {
  geminiApiKey: "user_gemini_api_key",
  tavilyApiKey: "user_tavily_api_key",
  openRouterApiKey: "user_openrouter_api_key",
  googleScriptUrl: "user_google_script_url",
  appPassword: "appPassword",
} as const;

export function getUserApiKeys(): UserApiKeys {
  if (typeof window === "undefined") {
    return {
      geminiApiKey: "",
      tavilyApiKey: "",
      openRouterApiKey: "",
      googleScriptUrl: "",
      appPassword: "",
    };
  }

  return {
    geminiApiKey: localStorage.getItem(STORAGE_KEYS.geminiApiKey) || "",
    tavilyApiKey: localStorage.getItem(STORAGE_KEYS.tavilyApiKey) || "",
    openRouterApiKey: localStorage.getItem(STORAGE_KEYS.openRouterApiKey) || "",
    googleScriptUrl: localStorage.getItem(STORAGE_KEYS.googleScriptUrl) || "",
    appPassword: localStorage.getItem(STORAGE_KEYS.appPassword) || "",
  };
}

export function saveUserApiKeys(keys: Partial<UserApiKeys>): void {
  if (typeof window === "undefined") return;

  if (keys.geminiApiKey !== undefined) {
    if (keys.geminiApiKey.trim()) {
      localStorage.setItem(STORAGE_KEYS.geminiApiKey, keys.geminiApiKey.trim());
    } else {
      localStorage.removeItem(STORAGE_KEYS.geminiApiKey);
    }
  }

  if (keys.tavilyApiKey !== undefined) {
    if (keys.tavilyApiKey.trim()) {
      localStorage.setItem(STORAGE_KEYS.tavilyApiKey, keys.tavilyApiKey.trim());
    } else {
      localStorage.removeItem(STORAGE_KEYS.tavilyApiKey);
    }
  }

  if (keys.openRouterApiKey !== undefined) {
    if (keys.openRouterApiKey.trim()) {
      localStorage.setItem(STORAGE_KEYS.openRouterApiKey, keys.openRouterApiKey.trim());
    } else {
      localStorage.removeItem(STORAGE_KEYS.openRouterApiKey);
    }
  }

  if (keys.googleScriptUrl !== undefined) {
    if (keys.googleScriptUrl.trim()) {
      localStorage.setItem(STORAGE_KEYS.googleScriptUrl, keys.googleScriptUrl.trim());
    } else {
      localStorage.removeItem(STORAGE_KEYS.googleScriptUrl);
    }
  }

  if (keys.appPassword !== undefined) {
    if (keys.appPassword.trim()) {
      localStorage.setItem(STORAGE_KEYS.appPassword, keys.appPassword.trim());
    } else {
      localStorage.removeItem(STORAGE_KEYS.appPassword);
    }
  }
}

export function isAppConfigured(): boolean {
  if (typeof window === "undefined") return false;
  const { geminiApiKey, appPassword } = getUserApiKeys();
  return Boolean(geminiApiKey.trim() || appPassword.trim());
}

export function isSheetsConfigured(): boolean {
  if (typeof window === "undefined") return false;
  const { googleScriptUrl, appPassword } = getUserApiKeys();
  return Boolean(googleScriptUrl.trim() || appPassword.trim());
}
