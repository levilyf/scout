import type { AuthSession } from './contracts';

export function isSessionExpired(session: AuthSession, now = Date.now()): boolean {
  return Date.parse(session.expiresAt) <= now;
}

export function scheduleSessionExpiry(session: AuthSession, onExpired: () => void): ReturnType<typeof setTimeout> | null {
  const delay = Date.parse(session.expiresAt) - Date.now();
  if (delay <= 0) {
    onExpired();
    return null;
  }
  return setTimeout(() => {
    if (Date.parse(session.expiresAt) <= Date.now()) onExpired();
    else scheduleSessionExpiry(session, onExpired);
  }, Math.min(delay, 2_147_483_647));
}
