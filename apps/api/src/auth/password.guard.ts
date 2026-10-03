import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class PasswordGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const path: string = request.path ?? '';

    if (path.startsWith('/auth')) {
      return true;
    }

    const expected = this.config.get<string>('APP_PASSWORD') || '';
    const received = request.headers['x-app-password'] as string | undefined;

    if (!expected) {
      throw new UnauthorizedException('Server password not configured');
    }

    if (received && received === expected) {
      return true;
    }
    throw new UnauthorizedException('Invalid password');
  }
}
