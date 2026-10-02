
import type { AnalysisResponse } from "../types/analysis";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function analyzeApplication(
  jobDescription: string,
  cv: File,
  companyName: string, 
): Promise<AnalysisResponse> {
  const body = new FormData();
  body.append("jobDescription", jobDescription);
  body.append("cv", cv);

  if (companyName) {
    body.append("companyName", companyName);
  }

  const res = await fetch(`${API_URL}/analysis`, { method: "POST", body });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? `Request failed (${res.status})`);
  }
  return res.json();
}