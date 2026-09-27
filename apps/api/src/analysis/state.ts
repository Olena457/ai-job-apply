import { Annotation } from '@langchain/langgraph';
import { CompanyReport, JobInfo, Match, TailoredCv } from './schemas';

export const ApplicationState = Annotation.Root({
  jobDescription: Annotation<string>(),
  cvText: Annotation<string>(),
  job: Annotation<JobInfo>(),
  company: Annotation<CompanyReport>(),
  match: Annotation<Match>(),
  coverLetter: Annotation<string | null>(),
  tailoredCv: Annotation<TailoredCv | null>(),
});

export type AppState = typeof ApplicationState.State;
