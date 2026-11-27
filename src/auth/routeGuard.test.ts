import { describe, expect, it } from 'vitest';
import { guardRoute } from './routeGuard';

const session = { user: { id: 'u1', email: 'u@example.com', emailVerified: true }, expiresAt: '2026-12-01T00:00:00.000Z' };

describe('route guard', () => {
  it('keeps signed-out users outside protected routes', () => expect(guardRoute(null, false).screen).toBe('auth'));
  it('shows loading before session resolution', () => expect(guardRoute(null, true).screen).toBe('loading'));
  it('expires sessions at expiry boundary', () => expect(guardRoute(session, false, Date.parse(session.expiresAt)).screen).toBe('session-expired'));
  it('allows valid sessions', () => expect(guardRoute(session, false, Date.parse(session.expiresAt) - 1).screen).toBe('protected'));
});
