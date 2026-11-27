import { describe, expect, it } from 'vitest';
import type { AuthSession } from './contracts';
import { createMemorySessionStore } from './session';
import { createSessionManager } from './sessionManager';

const session = (id: string) => ({ user: { id, email: `${id}@example.com`, emailVerified: true }, expiresAt: '2099-01-01T00:00:00.000Z' });

describe('session manager', () => {
  it('hydrates persisted session', async () => {
    const store = createMemorySessionStore();
    await store.set(session('a'));
    let current: AuthSession | null = null;
    await createSessionManager(store, (value) => { current = value; }).hydrate();
    expect(current).not.toBeNull();
    expect(current!.user.id).toBe('a');
  });

  it('clears old account before switching identity', async () => {
    const store = createMemorySessionStore();
    const manager = createSessionManager(store, () => {});
    await manager.set(session('a'));
    await manager.set(session('b'));
    expect((await store.get())?.user.id).toBe('b');
  });
});
