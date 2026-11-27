import { describe, expect, it } from 'vitest';
import { guardRoute } from './routeGuard';
import { normalizeEmail } from './validation';

describe('auth security boundaries', () => {
  it('does not allow missing sessions into protected state', () => {
    expect(guardRoute(null, false).screen).not.toBe('protected');
  });

  it('does not allow expired sessions into protected state', () => {
    const session = { user: { id: 'user-a', email: 'a@example.com', emailVerified: true }, expiresAt: '2020-01-01T00:00:00.000Z' };
    expect(guardRoute(session, false).screen).toBe('session-expired');
  });

  it('normalizes identity lookup input without exposing credentials', () => {
    expect(normalizeEmail(' User@Example.com ')).toBe('user@example.com');
  });
});
