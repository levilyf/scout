import { describe, expect, it } from 'vitest';
import { redactAuthError } from './accountLinking';

describe('auth token safety', () => {
  it('does not expose token-like provider errors', () => {
    const output = redactAuthError(new Error('access_token=abc refresh_token=def service_role=ghi'));
    expect(output).not.toContain('abc');
    expect(output).not.toContain('def');
    expect(output).not.toContain('ghi');
  });
});
