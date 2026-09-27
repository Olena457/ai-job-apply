import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class ApplicationData {
  companyName!: string;
  jobTitle?: string;
  jobUrl!: string;
  matchScore!: number;
  date?: string;
}

export type SheetsResponse = { status: string; message?: string };

@Injectable()
export class GoogleSheetsService {
  private readonly logger = new Logger(GoogleSheetsService.name);
  private readonly scriptUrl: string;

  constructor(private configService: ConfigService) {
    this.scriptUrl = this.configService.get<string>('GOOGLE_SCRIPT_URL') || '';
  }

  async saveApplication(data: ApplicationData): Promise<SheetsResponse> {
    try {
      const response = await fetch(this.scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          date: new Date().toLocaleDateString('uk-UA'),
        }),
      });

      return (await response.json()) as SheetsResponse;
    } catch (error) {
      this.logger.error('Failed to save to Google Sheets', error);
      throw new Error('Could not save data');
    }
  }

  async getRecentApplications(): Promise<any[]> {
    try {
      const response = await fetch(this.scriptUrl, {
        method: 'GET',
      });

      return (await response.json()) as any[];
    } catch (error) {
      this.logger.error('Failed to fetch from Google Sheets', error);
      throw new Error('Could not fetch data');
    }
  }
}
