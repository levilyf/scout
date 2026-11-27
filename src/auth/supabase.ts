import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { AuthAdapter, AuthSession, AuthUser } from './contracts';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function createSupabaseAuthAdapter(client: SupabaseClient): AuthAdapter {
  return {
    async signUp({ email, password }) {
      const { data, error } = await client.auth.signUp({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error('Sign-up returned no user');
      return user(data.user);
    },
    async signIn({ email, password }) {
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.user || !data.session) throw new Error('Sign-in returned no session');
      return session(data.user, data.session.expires_at);
    },
    async signInWithGoogle() {
      const { data, error } = await client.auth.signInWithOAuth({ provider: 'google', options: { skipBrowserRedirect: true } });
      if (error) throw error;
      throw new Error(`Google OAuth requires native redirect handling: ${data.url ?? 'missing URL'}`);
    },
    async verifyIdentity() {
      const { data, error } = await client.auth.getUser();
      if (error) throw error;
      return user(data.user);
    },
    async resendVerification() {
      const { data } = await client.auth.getSession();
      if (!data.session?.user.email) throw new Error('No active email session');
      const { error } = await client.auth.resend({ type: 'signup', email: data.session.user.email });
      if (error) throw error;
    },
    async requestPasswordReset(email) {
      const { error } = await client.auth.resetPasswordForEmail(email);
      if (error) throw error;
    },
    async refreshSession() {
      const { data, error } = await client.auth.refreshSession();
      if (error) throw error;
      return data.session && data.user ? session(data.user, data.session.expires_at) : null;
    },
    async signOut() {
      const { error } = await client.auth.signOut();
      if (error) throw error;
    },
    async requestAccountDeletion() {
      throw new Error('Account deletion requires authorized Cloudflare deletion workflow');
    },
  };
}

export const supabaseClient = url && key ? createClient(url, key) : null;
export const supabaseAuthAdapter = supabaseClient ? createSupabaseAuthAdapter(supabaseClient) : null;

function user(value: { id: string; email?: string | null; email_confirmed_at?: string | null }): AuthUser {
  if (!value.email) throw new Error('Auth user has no email');
  return { id: value.id, email: value.email, emailVerified: Boolean(value.email_confirmed_at) };
}

function session(value: { id: string; email?: string | null; email_confirmed_at?: string | null }, expiresAt?: number): AuthSession {
  return { user: user(value), expiresAt: new Date((expiresAt ?? Math.floor(Date.now() / 1000) + 3600) * 1000).toISOString() };
}
