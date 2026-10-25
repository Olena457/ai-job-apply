
"use client";

import { useState, useCallback } from "react";
import { getUserApiKeys } from "@/lib/keysStorage";
import { ApplicationRecord } from "@/types/history";

interface GoogleSheetRecord {
  companyName?: string;
  jobTitle?: string;
  jobUrl?: string;
  matchScore?: string | number;
  date?: string;
}

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

    console.log("Fetching history with URL:", googleScriptUrl);

    if (!googleScriptUrl) {
      setError("Google Sheets URL is not configured in Settings (⚙️).");
      loadFromLocalStorage();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(googleScriptUrl, {
        method: "GET",
        redirect: "follow",
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const rawData: unknown = await res.json();
      console.log("Raw Google Sheets response:", rawData);

      if (Array.isArray(rawData)) {
        const parsedData: ApplicationRecord[] = (
          rawData as GoogleSheetRecord[]
        ).map((item) => {
          let score = 0;
          if (typeof item.matchScore === "number") {
            score = item.matchScore;
          } else if (typeof item.matchScore === "string") {
            score = parseInt(item.matchScore.replace("%", ""), 10) || 0;
          }

          return {
            companyName: item.companyName || "Unknown Company",
            jobTitle: item.jobTitle || "",
            jobUrl: item.jobUrl || "",
            matchScore: score,
            date: item.date || "",
          };
        });

        setHistory(parsedData);
        localStorage.setItem("app_history", JSON.stringify(parsedData));
      } else {
        throw new Error("Invalid response format from Google Sheets");
      }
    } catch (err) {
      console.error("Failed to fetch Google Sheets history:", err);
      loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  }, [loadFromLocalStorage]);

  return { history, loading, error, fetchHistory };
}