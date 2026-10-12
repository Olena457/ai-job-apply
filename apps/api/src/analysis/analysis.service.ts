import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  buildMatchGraph,
  buildCoverLetterGraph,
  buildTailoredCvGraph,
} from './graph';
import { CompanyReport, JobInfo, Match } from './schemas';
import { ApiKeysConfig } from './state';

export interface MatchParams {
  jobDescription: string;
  cvText: string;
  companyName?: string;
  apiKeys?: ApiKeysConfig;
}

export interface CoverLetterParams {
  jobDescription: string;
  cvText: string;
  companyName?: string;
  job?: JobInfo;
  company?: CompanyReport;
  match?: Match;
  apiKeys?: ApiKeysConfig;
}

export interface TailoredCvParams {
  jobDescription: string;
  cvText: string;
  companyName?: string;
  job?: JobInfo;
  match?: Match;
  apiKeys?: ApiKeysConfig;
}

@Injectable()
export class AnalysisService {
  async analyzeMatch(params: MatchParams) {
    try {
      const graph = buildMatchGraph();
      const result = await graph.invoke({
        jobDescription: params.jobDescription,
        cvText: params.cvText,
        companyName: params.companyName,
        apiKeys: params.apiKeys,
      });

      return result;
    } catch (error) {
      console.error('Error occurred in Match Graph:', error);
      throw new InternalServerErrorException(
        'Failed to analyze job match. Please try again.',
      );
    }
  }

  async generateCoverLetter(params: CoverLetterParams) {
    try {
      const graph = buildCoverLetterGraph();
      const result = await graph.invoke({
        jobDescription: params.jobDescription,
        cvText: params.cvText,
        companyName: params.companyName,
        job: params.job,
        company: params.company,
        match: params.match,
        apiKeys: params.apiKeys,
      });

      return result;
    } catch (error) {
      console.error('Error occurred in Cover Letter Graph:', error);
      throw new InternalServerErrorException(
        'Failed to generate cover letter. Please try again.',
      );
    }
  }

  async generateTailoredCv(params: TailoredCvParams) {
    try {
      const graph = buildTailoredCvGraph();
      const result = await graph.invoke({
        jobDescription: params.jobDescription,
        cvText: params.cvText,
        companyName: params.companyName,
        job: params.job,
        match: params.match,
        apiKeys: params.apiKeys,
      });

      return result;
    } catch (error) {
      console.error('Error occurred in Tailored CV Graph:', error);
      throw new InternalServerErrorException(
        'Failed to generate tailored CV. Please try again.',
      );
    }
  }
}
