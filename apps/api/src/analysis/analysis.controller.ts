import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AnalysisService } from './analysis.service';
import type { JobInfo, CompanyReport, Match } from './schemas';
import 'multer';
import pdfParse from 'pdf-parse';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('match')
  @UseInterceptors(FileInterceptor('cv'))
  async analyzeMatch(
    @UploadedFile() file: Express.Multer.File,
    @Body('jobDescription') jobDescription: string,
    @Body('companyName') companyName?: string,
  ) {
    if (!file || !jobDescription) {
      throw new BadRequestException(
        'Both resume file and job description are required',
      );
    }

    let cvText = '';

    try {
      if (file.mimetype === 'application/pdf') {
        const pdfData = await pdfParse(file.buffer);
        cvText = pdfData.text;
      } else {
        cvText = file.buffer.toString('utf-8');
      }
    } catch {
      throw new BadRequestException(
        'Error parsing the uploaded file. Please ensure it is a valid PDF or text file.',
      );
    }

    if (!cvText.trim()) {
      throw new BadRequestException(
        'The resume text is empty or cannot be read',
      );
    }

    return this.analysisService.analyzeMatch({
      jobDescription,
      cvText,
      companyName,
    });
  }

  @Post('cover-letter')
  async generateCoverLetter(
    @Body('cvText') cvText: string,
    @Body('jobDescription') jobDescription: string,
    @Body('job') job: JobInfo,
    @Body('company') company: CompanyReport,
    @Body('match') match: Match,
  ) {
    if (!cvText || !jobDescription || !match) {
      throw new BadRequestException(
        'Missing required data for cover letter generation',
      );
    }

    return this.analysisService.generateCoverLetter({
      cvText,
      jobDescription,
      job,
      company,
      match,
    });
  }

  @Post('tailor-cv')
  async generateTailoredCv(
    @Body('cvText') cvText: string,
    @Body('jobDescription') jobDescription: string,
    @Body('job') job: JobInfo,
    @Body('match') match: Match,
  ) {
    if (!cvText || !jobDescription || !match) {
      throw new BadRequestException('Missing required data for CV tailoring');
    }

    return this.analysisService.generateTailoredCv({
      cvText,
      jobDescription,
      job,
      match,
    });
  }
}
