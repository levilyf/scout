import type { AuthSession } from './contracts';
import type { SessionStore } from './session';

export function createSessionManager(store: SessionStore, onChange: (session: AuthSession | null) => void) {
  let accountId: string | null = null;

  return {
    async hydrate() {
      const session = await store.get();
      accountId = session?.user.id ?? null;
      onChange(session);
      return session;
    },
    async set(session: AuthSession) {
      if (accountId && accountId !== session.user.id) await store.clear();
      accountId = session.user.id;
      await store.set(session);
      onChange(session);
    },
    async clear() {
      accountId = null;
      await store.clear();
      onChange(null);
    },
  };
}
