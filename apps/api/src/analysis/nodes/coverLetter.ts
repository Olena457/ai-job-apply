import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { getLlm } from '../llm';
import { AppState } from '../state';

export async function coverLetterNode(s: AppState) {
  if (s.match && s.match.score < 38) {
    return { coverLetter: null };
  }

  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      `You are an expert tech career advisor. Write a concise, compelling, and highly tailored cover letter.

STRICT STRUCTURE REQUIREMENTS:
1. Salutation: Start with a professional greeting addressing the hiring team or company (e.g., "Dear [Company Name] Hiring Team," or "Dear Hiring Manager,").
2. Introduction & Genuine Interest: Express strong, genuine enthusiasm for the specific role and company. Mention why you are excited about their product, mission, or engineering culture.
3. Key Advantages & Value Proposition: Highlight 2-3 concrete achievements from the candidate's CV that directly match the required skills in the job description. Show why the candidate is a strong fit.
4. Call to Action: Reiterate interest, confidence in bringing value, and express readiness for an interview.
5. Sign-off: End with a professional closing (e.g., "Best regards,") followed by the candidate's name if available, or "Candidate".

RULES:
- Write in the language of the job posting.
- Keep length between 150-250 words.
- Maintain a natural, confident, and professional human tone. Avoid generic AI cliches like "I am writing to express my interest".
- If company values or summary are provided, connect to them naturally.
- Never invent experience. Do not mention skills the candidate lacks.
- Do not use placeholders like [Your Name] in the main body unless it is the final signature; output only the full formatted letter.`,
    ],
    [
      'human',
      `Job: {job}\nMatched skills: {matched}\nCompany info: {company}\n\nCV:\n{cvText}`,
    ],
  ]);

  const chain = prompt.pipe(getLlm(s.apiKeys)).pipe(new StringOutputParser());
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
