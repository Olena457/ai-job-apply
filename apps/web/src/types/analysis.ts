
import { UserApiKeys } from "@/lib/keysStorage";

export interface AdminTabProps {
  keys: UserApiKeys;
  updateKey: (field: keyof UserApiKeys, value: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
}

export interface JobInfo {
  companyName: string;
  jobTitle: string;
  requiredSkills: string[];
  niceToHave: string[];
  language: string;
}

export interface CompanyReport {
  summary: string;
  website: string;
  industry: string;
  yearsOnMarket: string;
  employees: string;
  values: string[];
  competitors: string[];
  reviewsSummary: string;
  greenFlags?: string[];
  redFlags: string[];
  sources: string[];
  rating?: string;
}

export interface Match {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  explanation: string;
}

export interface TailoredCv {
  fullName: string;
  contacts: string[];
  headline: string;
  summary: string;
  skills: string[];
  softSkills?: string[];
  certificates?: {
    title: string;
    link?: string;
  }[];
  languages?: string[];
  projects?: {
    title: string;
    techStack: string;
    description: string;
    date?: string;
    period?: string;
    link?: string;
  }[];
  experience: {
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }[];
  education: {
    title: string;
    details: string;
  }[];
  photoUrl?: string;
}

export interface AnalysisResponse {
  jobDescription: string;
  cvText: string;
  companyName?: string;
  job: JobInfo;
  company: CompanyReport;
  match: Match;
  coverLetter?: string | null;
  tailoredCv?: TailoredCv | null;
}

export interface ProjectWithDate {
  period?: string;
  date?: string;
}