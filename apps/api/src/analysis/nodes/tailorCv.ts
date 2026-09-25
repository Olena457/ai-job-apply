import { ChatPromptTemplate } from '@langchain/core/prompts';
import { getStructuredLlm } from '../llm';
import { AppState } from '../state';
import { TailoredCvSchema, TailoredCv } from '../schemas';

export async function tailorCvNode(s: AppState) {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      `You rewrite a CV for a specific job. Rules:
- Use ONLY facts present in the original CV. Never invent employers, dates, skills or metrics.
- Reorder and rephrase to emphasize what matches the job; use the job's keywords where they are truthful.
- Keep it concise: 3-5 bullets per role, strongest first.
- Write in the language of the job posting.`,
    ],
    [
      'human',
      'JOB: {job}\nMATCHED SKILLS: {matched}\n\nORIGINAL CV:\n{cvText}',
    ],
  ]);

  const chain = prompt.pipe(getStructuredLlm(TailoredCvSchema));
  const tailoredCv = (await chain.invoke({
    job: JSON.stringify(s.job),
    matched: s.match?.matchedSkills?.join(', ') || '',
    cvText: s.cvText,
  })) as TailoredCv;

  return { tailoredCv };
}
