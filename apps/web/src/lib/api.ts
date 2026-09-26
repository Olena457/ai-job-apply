import type { AnalysisResponse } from "../types/analysis";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function analyzeApplication(
  jobDescription: string,
  cv: File,
): Promise<AnalysisResponse> {
  const body = new FormData();
  body.append("jobDescription", jobDescription);
  body.append("cv", cv);

  const res = await fetch(`${API_URL}/analysis`, { method: "POST", body });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? `Request failed (${res.status})`);
  }
  return res.json();
}
