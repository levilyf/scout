import type { SupabaseClient } from '@supabase/supabase-js';
import type { AuthSession } from './contracts';
import { createSessionManager } from './sessionManager';
import type { SessionStore } from './session';

export function subscribeToSupabaseAuth(
  client: SupabaseClient,
  store: SessionStore,
  onChange: (session: AuthSession | null) => void,
) {
  const manager = createSessionManager(store, onChange);
  const { data } = client.auth.onAuthStateChange((_event, session) => {
    if (!session?.user || !session.expires_at) return void manager.clear();
    void manager.set({
      user: { id: session.user.id, email: session.user.email ?? '', emailVerified: Boolean(session.user.email_confirmed_at) },
      expiresAt: new Date(session.expires_at * 1000).toISOString(),
    });
  });
  return () => data.subscription.unsubscribe();
}
