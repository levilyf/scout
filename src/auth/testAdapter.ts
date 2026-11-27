import type { AuthAdapter, AuthSession, AuthUser } from './contracts';

const testUser: AuthUser = { id: 'test-user', email: 'test@example.com', emailVerified: true };

export const testAuthAdapter: AuthAdapter = {
  async signUp({ email }) {
    return { ...testUser, email };
  },
  async signIn({ email }) {
    return { user: { ...testUser, email }, expiresAt: new Date(Date.now() + 3600000).toISOString() };
  },
  async signInWithGoogle() {
    return sessionFor(testUser);
  },
  async verifyIdentity() {
    return testUser;
  },
  async resendVerification() {},
  async requestPasswordReset() {},
  async refreshSession() {
    return sessionFor(testUser);
  },
  async signOut() {},
  async requestAccountDeletion() {},
};

function sessionFor(user: AuthUser): AuthSession {
  return { user, expiresAt: new Date(Date.now() + 3600000).toISOString() };
}
