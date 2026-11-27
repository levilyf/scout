import * as SecureStore from 'expo-secure-store';
import type { AuthSession } from './contracts';
import type { SessionStore } from './session';

const SESSION_KEY = 'scout.auth.session';

export const secureSessionStore: SessionStore = {
  async get() {
    const value = await SecureStore.getItemAsync(SESSION_KEY);
    if (!value) return null;
    try {
      return JSON.parse(value) as AuthSession;
    } catch {
      await SecureStore.deleteItemAsync(SESSION_KEY);
      return null;
    }
  },
  async set(session) {
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session), {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  },
  async clear() {
    await SecureStore.deleteItemAsync(SESSION_KEY);
  },
};
