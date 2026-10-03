import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly config: ConfigService) {}

  @Post('validate')
  validate(@Body('password') password: string) {
    const expected = this.config.get<string>('APP_PASSWORD') || '';
    if (!expected) {
      throw new BadRequestException('Server password not configured');
    }
    const authorized = password === expected;
    return { authorized };
  }
}
