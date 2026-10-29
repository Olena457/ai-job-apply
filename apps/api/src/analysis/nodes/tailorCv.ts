import { ChatPromptTemplate } from '@langchain/core/prompts';
import { getStructuredLlm } from '../llm';
import { AppState } from '../state';
import { TailoredCvSchema, TailoredCv } from '../schemas';

export async function tailorCvNode(s: AppState) {
  if (s.match && s.match.score < 38) {
    return { tailoredCv: null };
  }

  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      `You are an expert CV tailoring assistant. Rewrite and optimize the CV for a specific job following these STRICT rules:
- PRESERVE ALL DATA: Never delete technical skills, categories, soft skills, languages, certificates, or education from the original CV.
- PROJECTS ARE MANDATORY: You MUST KEEP all "Projects" (Individual and Team) from the original CV along with their descriptions, links, tech stacks, and periods. Do not omit any project.
- WORK EXPERIENCE: Keep all roles, adapting their bullet points (3-5 bullets per role) to emphasize metrics and skills matching the job. Never invent employers, dates, or metrics.
- KEYWORDS: Reorder and rephrase to naturally integrate job keywords where truthful.
- Write in the language of the job posting.`,
    ],
    [
      'human',
      'JOB: {job}\nMATCHED SKILLS: {matched}\n\nORIGINAL CV:\n{cvText}',
    ],
  ]);

  const chain = prompt.pipe(getStructuredLlm(TailoredCvSchema, s.apiKeys));
  const tailoredCv = (await chain.invoke({
    job: JSON.stringify(s.job),
    matched: s.match?.matchedSkills?.join(', ') || '',
    cvText: s.cvText,
  })) as TailoredCv;

  return { tailoredCv };
}
