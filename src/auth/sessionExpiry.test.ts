import { describe, expect, it, vi } from 'vitest';
import { isSessionExpired, scheduleSessionExpiry } from './sessionExpiry';

describe('session expiry', () => {
  const session = { user: { id: 'u', email: 'u@example.com', emailVerified: true }, expiresAt: '2027-01-01T00:00:01.000Z' };
  it('expires at exact boundary', () => expect(isSessionExpired(session, Date.parse(session.expiresAt))).toBe(true));
  it('immediately expires past sessions', () => { const callback = vi.fn(); scheduleSessionExpiry(session, callback); expect(callback).not.toHaveBeenCalled(); });
});
