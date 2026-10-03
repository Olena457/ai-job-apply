
export function getAuthHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const pwd = localStorage.getItem("appPassword") ?? "";
  return pwd ? { "x-app-password": pwd } : {};
}
