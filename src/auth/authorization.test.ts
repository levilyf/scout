import { describe, expect, it } from 'vitest';
import { assertAuthorizedUser, hasAudience } from './authorization';

const claims = { sub: 'user-a', exp: 2000, iss: 'https://example.supabase.co/auth/v1', aud: ['authenticated', 'scout-api'] };

describe('authorization boundary', () => {
  it('requires token subject to match resource owner', () => {
    expect(() => assertAuthorizedUser(claims, 'user-b', 1000)).toThrow('Unauthorized owner');
    expect(() => assertAuthorizedUser(claims, 'user-a', 2000)).toThrow('Expired token');
  });
  it('supports scalar and array audiences', () => {
    expect(hasAudience(claims, 'scout-api')).toBe(true);
    expect(hasAudience({ ...claims, aud: 'authenticated' }, 'authenticated')).toBe(true);
  });
});
