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
  redFlags: string[];
  sources: string[];
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
  projects?: {
    title: string;
    techStack: string;
    description: string;
  }[];
  experience: {
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }[];
  education: { title: string; details: string }[];
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