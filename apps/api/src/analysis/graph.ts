import { StateGraph, START, END } from '@langchain/langgraph';
import { ApplicationState } from './state';
import { extractNode } from './nodes/extract';
import { researchNode } from './nodes/research';
import { matchNode } from './nodes/match';
import { coverLetterNode } from './nodes/coverLetter';
import { tailorCvNode } from './nodes/tailorCv';

export function buildApplicationGraph() {
  return new StateGraph(ApplicationState)
    .addNode('extract', extractNode)
    .addNode('research', researchNode)
    .addNode('match', matchNode)
    .addNode('coverLetter', coverLetterNode)
    .addNode('tailorCv', tailorCvNode)

    .addEdge(START, 'extract')
    .addEdge('extract', 'research')
    .addEdge('research', 'match')

    .addEdge('match', 'coverLetter')
    .addEdge('match', 'tailorCv')

    .addEdge('coverLetter', END)
    .addEdge('tailorCv', END)

    .compile();
}
