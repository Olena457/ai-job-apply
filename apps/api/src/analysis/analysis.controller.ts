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

import 'multer';

import pdfParse from 'pdf-parse';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post()
  @UseInterceptors(FileInterceptor('cv'))
  async analyzeJob(
    @UploadedFile() file: Express.Multer.File,
    @Body('jobDescription') jobDescription: string,
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
        'Error to parse the uploaded file. Please ensure it is a valid PDF or text file.',
      );
    }

    if (!cvText.trim()) {
      throw new BadRequestException(
        'The resume text is empty or cannot be read',
      );
    }

    const result = await this.analysisService.runAnalysis(
      jobDescription,
      cvText,
    );

    return result;
  }
}
