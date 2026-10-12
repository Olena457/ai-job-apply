import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { GoogleSheetsService, ApplicationData } from './google-sheets.service';

@Controller('sheets')
export class GoogleSheetsController {
  constructor(private readonly sheetsService: GoogleSheetsService) {}

  @Post('add')
  async addApplication(
    @Body() body: ApplicationData,
    @Headers('x-sheets-url') customSheetsUrl?: string,
  ) {
    return this.sheetsService.saveApplication(body, customSheetsUrl);
  }

  @Get('recent')
  async getRecent(@Headers('x-sheets-url') customSheetsUrl?: string) {
    return this.sheetsService.getRecentApplications(customSheetsUrl);
  }
}
