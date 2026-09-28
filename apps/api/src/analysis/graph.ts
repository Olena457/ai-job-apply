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
    .addNode('calculateMatch', matchNode)
    .addNode('generateCoverLetter', coverLetterNode)
    .addNode('generateTailoredCv', tailorCvNode)

    .addEdge(START, 'extract')
    .addEdge('extract', 'research')
    .addEdge('research', 'calculateMatch')

    .addEdge('calculateMatch', 'generateCoverLetter')
    .addEdge('calculateMatch', 'generateTailoredCv')

    .addEdge('generateCoverLetter', END)
    .addEdge('generateTailoredCv', END)

    .compile();
}
