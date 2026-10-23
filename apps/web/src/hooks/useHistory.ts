"use client";

import { useState, useCallback } from "react";
import { getUserApiKeys } from "@/lib/keysStorage";
import { ApplicationRecord } from "@/types/history";

export function useHistory() {
  const [history, setHistory] = useState<ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFromLocalStorage = useCallback(() => {
    const localData = localStorage.getItem("app_history");
    if (localData) {
      try {
        setHistory(JSON.parse(localData));
      } catch {
        setError(
          "Could not fetch history from Google Sheets or local storage.",
        );
      }
    } else {
      setError("No saved history found.");
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    const { googleScriptUrl } = getUserApiKeys();

    if (!googleScriptUrl) {
      setError("Google Sheets URL is not configured in Settings.");
      loadFromLocalStorage();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(googleScriptUrl);
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      const parsedData = Array.isArray(data) ? data : [];
      setHistory(parsedData);
      localStorage.setItem("app_history", JSON.stringify(parsedData));
    } catch {
      loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  }, [loadFromLocalStorage]);

  return { history, loading, error, fetchHistory };
}
