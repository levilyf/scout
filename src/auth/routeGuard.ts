import type { AuthSession } from './contracts';

export type GuardState =
  | { screen: 'auth' }
  | { screen: 'loading' }
  | { screen: 'protected'; session: AuthSession }
  | { screen: 'session-expired' };

export function guardRoute(session: AuthSession | null, loading: boolean, now = Date.now()): GuardState {
  if (loading) return { screen: 'loading' };
  if (!session) return { screen: 'auth' };
  if (Date.parse(session.expiresAt) <= now) return { screen: 'session-expired' };
  return { screen: 'protected', session };
}

export function clearAccountState<T>(_accountId: string, state: T): T | null {
  return state === undefined ? null : null;
}
