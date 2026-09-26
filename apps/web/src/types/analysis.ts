export interface AnalysisResponse {
  job: {
    companyName: string;
    jobTitle: string;
    requiredSkills: string[];
    niceToHave: string[];
    language: string;
  };
  company: {
    summary: string;
    yearsOnMarket: string;
    employees: string;
    values: string[];
    reviewsSummary: string;
    redFlags: string[];
    sources: string[];
  };
  match: {
    score: number;
    matchedSkills: string[];
    missingSkills: string[];
    explanation: string;
  };
  coverLetter: string;
  tailoredCv: TailoredCv;
}

export interface TailoredCv {
  fullName: string;
  contacts: string[];
  headline: string;
  summary: string;
  skills: string[];
  experience: {
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }[];
  education: { title: string; details: string }[];
}
