import type {
  AnalysisResponse,
  JobInfo,
  CompanyReport,
  Match,
  TailoredCv,
} from "../types/analysis";
import { getAuthHeader } from "../lib/authHeader";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function analyzeMatch(
  jobDescription: string,
  cv: File,
  companyName?: string,
): Promise<AnalysisResponse> {
  const body = new FormData();
  body.append("jobDescription", jobDescription);
  body.append("cv", cv);

  if (companyName) {
    body.append("companyName", companyName);
  }

  const res = await fetch(`${API_URL}/analysis/match`, {
    method: "POST",
    body,
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? `Request failed (${res.status})`);
  }
  return res.json();
}

export async function generateCoverLetter(
  cvText: string,
  jobDescription: string,
  job: JobInfo,
  company: CompanyReport,
  match: Match,
): Promise<{ coverLetter: string | null }> {
  const res = await fetch(`${API_URL}/analysis/cover-letter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({
      cvText,
      jobDescription,
      job,
      company,
      match,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? `Request failed (${res.status})`);
  }
  return res.json();
}

export async function generateTailoredCv(
  cvText: string,
  jobDescription: string,
  job: JobInfo,
  match: Match,
): Promise<{ tailoredCv: TailoredCv | null }> {
  const res = await fetch(`${API_URL}/analysis/tailor-cv`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({
      cvText,
      jobDescription,
      job,
      match,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? `Request failed (${res.status})`);
  }
  return res.json();
}

export interface SheetsApplicationData {
  companyName: string;
  jobTitle?: string;
  jobUrl: string;
  matchScore: number;
}

export async function saveToGoogleSheets(data: SheetsApplicationData) {
  const res = await fetch(`${API_URL}/sheets/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message ?? `Request failed (${res.status})`);
  }
  return res.json();
}
