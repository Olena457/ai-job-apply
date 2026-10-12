import { Annotation } from '@langchain/langgraph';
import { CompanyReport, JobInfo, Match, TailoredCv } from './schemas';

export interface ApiKeysConfig {
  geminiKey?: string;
  tavilyKey?: string;
  openRouterKey?: string;
}

export const ApplicationState = Annotation.Root({
  companyName: Annotation<string | undefined>(),
  jobDescription: Annotation<string>(),
  cvText: Annotation<string>(),
  job: Annotation<JobInfo | undefined>(),
  company: Annotation<CompanyReport | undefined>(),
  match: Annotation<Match | undefined>(),
  coverLetter: Annotation<string | null>(),
  tailoredCv: Annotation<TailoredCv | null>(),
  apiKeys: Annotation<ApiKeysConfig | undefined>(),
});

export type AppState = typeof ApplicationState.State;
