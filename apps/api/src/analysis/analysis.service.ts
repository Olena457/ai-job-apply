import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { buildApplicationGraph } from './graph';

@Injectable()
export class AnalysisService {
  async runAnalysis(jobDescription: string, cvText: string) {
    try {
      const graph = buildApplicationGraph();

      const result = await graph.invoke({
        jobDescription,
        cvText,
      });

      return result;
    } catch (error) {
      console.error('Error occured  LangGraph:', error);
      throw new InternalServerErrorException(
        'Error occurred while processing the analysis. Please try again later.',
      );
    }
  }
}
