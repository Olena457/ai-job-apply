import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PasswordGuard } from './password.guard';

describe('PasswordGuard', () => {
  let guard: PasswordGuard;
  let configService: Partial<ConfigService>;

  beforeEach(() => {
    configService = {
      get: jest.fn().mockImplementation((key: string) => {
        if (key === 'APP_PASSWORD') return 'admin-secret-123';
        return undefined;
      }),
    };
    guard = new PasswordGuard(configService as ConfigService);
  });

  function createMockContext(headers: Record<string, string> = {}, path = '/analysis/match'): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          path,
          headers,
        }),
      }),
    } as unknown as ExecutionContext;
  }

  it('should allow public /auth endpoints', () => {
    const context = createMockContext({}, '/auth/validate');
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow requests with valid admin password', () => {
    const context = createMockContext({
      'x-app-password': 'admin-secret-123',
    });
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should allow requests with custom Gemini API key (BYOK mode)', () => {
    const context = createMockContext({
      'x-gemini-api-key': 'AIzaSyDemoValidLengthKey12345',
    });
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should reject requests with wrong password and no gemini key', () => {
    const context = createMockContext({
      'x-app-password': 'wrong-password',
    });
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should reject requests with missing credentials', () => {
    const context = createMockContext({});
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });
});
