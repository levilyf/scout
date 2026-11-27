export type AuthUser = {
  id: string;
  email: string;
  emailVerified: boolean;
};

export type AuthSession = {
  user: AuthUser;
  expiresAt: string;
};

export interface AuthAdapter {
  signUp(input: { email: string; password: string }): Promise<AuthUser>;
  signIn(input: { email: string; password: string }): Promise<AuthSession>;
  signInWithGoogle(): Promise<AuthSession>;
  verifyIdentity(): Promise<AuthUser>;
  resendVerification(): Promise<void>;
  requestPasswordReset(email: string): Promise<void>;
  refreshSession(): Promise<AuthSession | null>;
  signOut(): Promise<void>;
  requestAccountDeletion(): Promise<void>;
}

export type AuthState =
  | { status: 'signed-out' }
  | { status: 'loading' }
  | { status: 'signed-in'; session: AuthSession }
  | { status: 'error'; message: string };
