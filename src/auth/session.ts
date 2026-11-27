import type { AuthSession } from './contracts';

export type SessionStore = {
  get(): Promise<AuthSession | null>;
  set(session: AuthSession): Promise<void>;
  clear(): Promise<void>;
};

export function createMemorySessionStore(): SessionStore {
  let current: AuthSession | null = null;
  return {
    async get() { return current; },
    async set(session) { current = session; },
    async clear() { current = null; },
  };
}
