import { Controller, Post, Get, Body } from '@nestjs/common';
import { GoogleSheetsService, ApplicationData } from './google-sheets.service';

@Controller('sheets')
export class GoogleSheetsController {
  constructor(private readonly sheetsService: GoogleSheetsService) {}

  @Post('add')
  async addApplication(@Body() body: ApplicationData) {
    return this.sheetsService.saveApplication(body);
  }

  @Get('recent')
  async getRecent() {
    return this.sheetsService.getRecentApplications();
  }
}
