import { ChatPromptTemplate } from '@langchain/core/prompts';
import { getStructuredLlm } from '../llm';
import { AppState } from '../state';
import { JobSchema, JobInfo } from '../schemas';

export async function extractNode(s: AppState) {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      'You extract structured data from job postings. Be precise, do not invent anything.',
    ],
    ['human', 'Job posting:\n{jobDescription}'],
  ]);

  const chain = prompt.pipe(getStructuredLlm(JobSchema));
  const job = (await chain.invoke({
    jobDescription: s.jobDescription,
  })) as JobInfo;

  return { job };
}
