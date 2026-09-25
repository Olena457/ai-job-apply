import { z } from 'zod';

export const JobSchema = z.object({
  companyName: z
    .string()
    .describe('Company name, empty string if not mentioned'),
  jobTitle: z.string(),
  requiredSkills: z.array(z.string()),
  niceToHave: z.array(z.string()),
  language: z
    .string()
    .describe('Language of the posting, e.g. English, Ukrainian'),
});

export const CompanySchema = z.object({
  summary: z.string(),
  yearsOnMarket: z.string().describe('Approximate or "unknown"'),
  employees: z.string().describe('Approximate or "unknown"'),
  values: z.array(z.string()),
  reviewsSummary: z.string(),
  redFlags: z.array(z.string()),
  sources: z.array(z.string()),
});

export const MatchSchema = z.object({
  score: z.number().describe('Integer 0-100'),
  matchedSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),
  explanation: z.string(),
});

export const TailoredCvSchema = z.object({
  fullName: z.string(),
  contacts: z.array(z.string()),
  headline: z.string(),
  summary: z.string(),
  skills: z.array(z.string()),
  experience: z.array(
    z.object({
      role: z.string(),
      company: z.string(),
      period: z.string(),
      bullets: z.array(z.string()),
    }),
  ),
  education: z.array(z.object({ title: z.string(), details: z.string() })),
});

export type JobInfo = z.infer<typeof JobSchema>;
export type CompanyReport = z.infer<typeof CompanySchema>;
export type Match = z.infer<typeof MatchSchema>;
export type TailoredCv = z.infer<typeof TailoredCvSchema>;
