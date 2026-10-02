import { StateGraph, START, END } from '@langchain/langgraph';
import { ApplicationState } from './state';
import { extractNode } from './nodes/extract';
import { researchNode } from './nodes/research';
import { matchNode } from './nodes/match';
import { coverLetterNode } from './nodes/coverLetter';
import { tailorCvNode } from './nodes/tailorCv';

export function buildMatchGraph() {
  return new StateGraph(ApplicationState)
    .addNode('extract', extractNode)
    .addNode('research', researchNode)
    .addNode('calculateMatch', matchNode)

    .addEdge(START, 'extract')
    .addEdge('extract', 'research')
    .addEdge('research', 'calculateMatch')
    .addEdge('calculateMatch', END)

    .compile();
}

export function buildCoverLetterGraph() {
  return new StateGraph(ApplicationState)
    .addNode('generateCoverLetter', coverLetterNode)

    .addEdge(START, 'generateCoverLetter')
    .addEdge('generateCoverLetter', END)

    .compile();
}

export function buildTailoredCvGraph() {
  return new StateGraph(ApplicationState)
    .addNode('generateTailoredCv', tailorCvNode)

    .addEdge(START, 'generateTailoredCv')
    .addEdge('generateTailoredCv', END)

    .compile();
}
