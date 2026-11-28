import type { AuthUser } from './contracts';

export function canLinkIdentity(current: AuthUser, incoming: AuthUser, verified: boolean): boolean {
  return verified && current.id === incoming.id;
}

export function redactAuthError(error: unknown): string {
  if (error instanceof Error && error.message) return 'Authentication failed. Try again.';
  return 'Authentication failed. Try again.';
}
