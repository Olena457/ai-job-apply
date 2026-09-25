import { ChatPromptTemplate } from '@langchain/core/prompts';
import { getStructuredLlm } from '../llm';
import { AppState } from '../state';
import { MatchSchema, Match } from '../schemas';

export async function matchNode(s: AppState) {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      'You are a strict technical recruiter. Compare the CV with the job posting. Score 0-100 honestly: required skills weigh most, nice-to-have less. Only count skills evidenced in the CV.',
    ],
    ['human', 'JOB POSTING:\n{jobDescription}\n\nCV:\n{cvText}'],
  ]);

  const chain = prompt.pipe(getStructuredLlm(MatchSchema));
  const result = (await chain.invoke({
    jobDescription: s.jobDescription,
    cvText: s.cvText,
  })) as Match;

  return {
    match: {
      ...result,
      score: Math.round(Math.min(100, Math.max(0, result.score))),
    },
  };
}
