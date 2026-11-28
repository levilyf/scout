import { describe, expect, it } from 'vitest';
import { canLinkIdentity, redactAuthError } from './accountLinking';

const user = { id: 'u1', email: 'user@example.com', emailVerified: true };

describe('auth account linking', () => {
  it('requires verified identity and same Scout user ID', () => {
    expect(canLinkIdentity(user, { ...user, email: 'other@example.com' }, true)).toBe(true);
    expect(canLinkIdentity(user, { ...user, id: 'u2' }, true)).toBe(false);
    expect(canLinkIdentity(user, user, false)).toBe(false);
  });

  it('redacts provider error detail', () => {
    expect(redactAuthError(new Error('token=secret'))).toBe('Authentication failed. Try again.');
  });
});
