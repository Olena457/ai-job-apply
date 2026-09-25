import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { llm } from '../llm';
import { AppState } from '../state';

export async function coverLetterNode(s: AppState) {
  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      `You write cover letters. Rules:
- Write in the language of the job posting.
- 250-320 words, natural human tone, no cliches like "I am writing to express my interest".
- Use 2-3 concrete achievements from the CV that best match the required skills.
- If company values are known, connect to them naturally.
- Never invent experience. Do not mention skills the candidate lacks.
- No placeholders, output only the letter text.`,
    ],
    [
      'human',
      `Job: {job}\nMatched skills: {matched}\nCompany info: {company}\n\nCV:\n{cvText}`,
    ],
  ]);

  const chain = prompt.pipe(llm).pipe(new StringOutputParser());
  const letter = await chain.invoke({
    job: JSON.stringify(s.job),
    matched: s.match?.matchedSkills?.join(', ') || '',
    company: JSON.stringify({
      summary: s.company?.summary || '',
      values: s.company?.values || [],
    }),
    cvText: s.cvText,
  });

  return { coverLetter: letter.trim() };
}
