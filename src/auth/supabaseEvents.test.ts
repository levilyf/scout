import { describe, expect, it } from 'vitest';
import { createMemorySessionStore } from './session';
import { subscribeToSupabaseAuth } from './supabaseEvents';

describe('Supabase auth events', () => {
  it('clears local session when provider signs out', async () => {
    let callback: (event: string, session: null) => void = () => {};
    const client = { auth: { onAuthStateChange(handler: typeof callback) { callback = handler; return { data: { subscription: { unsubscribe() {} } } }; } } } as never;
    let current = 'present';
    subscribeToSupabaseAuth(client, createMemorySessionStore(), (session) => { current = session ? 'present' : 'empty'; });
    callback('SIGNED_OUT', null);
    await Promise.resolve();
    expect(current).toBe('empty');
  });
});
