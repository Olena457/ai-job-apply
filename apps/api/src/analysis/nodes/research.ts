import { tavily } from '@tavily/core';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { getStructuredLlm } from '../llm';
import { AppState } from '../state';
import { CompanySchema, CompanyReport } from '../schemas';
import { config } from '../config';

const tavilyClient = tavily({ apiKey: config.TAVILY_API_KEY });

const UNKNOWN_COMPANY: CompanyReport = {
  summary: 'No public information found.',
  website: 'unknown',
  industry: 'unknown',
  yearsOnMarket: 'unknown',
  employees: 'unknown',
  values: [],
  competitors: [],
  reviewsSummary: 'unknown',
  redFlags: [],
  sources: [],
};

export async function researchNode(s: AppState) {
  const name = (s.companyName || s.job?.companyName)?.trim();

  if (!name) {
    console.log('[Tavily Research] No company name provided in state.');
    return { company: UNKNOWN_COMPANY };
  }

  console.log(`[Tavily Research] Searching info for company: "${name}"...`);

  const isUrl = name.startsWith('http') || name.includes('/');
  const queryName = isUrl ? `company at ${name}` : `${name} company`;

  const queries = [
    `${queryName} general information overview`,
    `${queryName} about founded number of employees`,
    `${queryName} values culture competitors`,
    `${queryName} employee reviews Glassdoor DOU red flags`,
  ];

  const raw = await Promise.all(
    queries.map((q) =>
      tavilyClient
        .search(q, { maxResults: 4, searchDepth: 'advanced' })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : String(err);
          console.error(`[Tavily API Error] Query "${q}" failed:`, message);
          return null;
        }),
    ),
  );

  const context = raw
    .flatMap((r) => (r && Array.isArray(r.results) ? r.results : []))
    .map((r) => `SOURCE: ${r.url}\n${r.content}`)
    .join('\n\n');

  if (!context) {
    console.log('[Tavily Research] Empty context returned from Tavily search.');
    return { company: UNKNOWN_COMPANY };
  }

  try {
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        'You are a careful company researcher. Use ONLY the provided search context. If a text field is not found in the context, write "unknown". For lists/arrays, return an empty array if no information is found. Never invent facts.',
      ],
      ['human', 'Company: {name}\n\nSearch context:\n{context}'],
    ]);

    const chain = prompt.pipe(getStructuredLlm(CompanySchema));
    const company = (await chain.invoke({ name, context })) as CompanyReport;

    return { company };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Tavily Research] Error parsing LLM response:', message);
    return { company: UNKNOWN_COMPANY };
  }
}
