import { describe, expect, it } from 'vitest';
import { createMemorySessionStore } from './session';
import { createSessionManager } from './sessionManager';

describe('account isolation', () => {
  it('clears prior account session before new identity', async () => {
    const store = createMemorySessionStore();
    const manager = createSessionManager(store, () => {});
    await manager.set({ user: { id: 'user-a', email: 'a@example.com', emailVerified: true }, expiresAt: '2099-01-01T00:00:00.000Z' });
    await manager.set({ user: { id: 'user-b', email: 'b@example.com', emailVerified: true }, expiresAt: '2099-01-01T00:00:00.000Z' });
    expect((await store.get())?.user.id).toBe('user-b');
  });

  it('clears identity on sign out', async () => {
    const store = createMemorySessionStore();
    const manager = createSessionManager(store, () => {});
    await manager.set({ user: { id: 'user-a', email: 'a@example.com', emailVerified: true }, expiresAt: '2099-01-01T00:00:00.000Z' });
    await manager.clear();
    expect(await store.get()).toBeNull();
  });
});
