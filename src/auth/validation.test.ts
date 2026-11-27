import { describe, expect, it } from 'vitest';
import { normalizeEmail, validateEmail, validatePassword } from './validation';

describe('auth validation', () => {
  it('normalizes email for adapter calls', () => expect(normalizeEmail('  User@Example.COM ')).toBe('user@example.com'));
  it('validates email', () => {
    expect(validateEmail('')).toBe('Email is required');
    expect(validateEmail('not-an-email')).toBe('Enter a valid email');
    expect(validateEmail('user@example.com')).toBeNull();
  });
  it('requires an eight-character password', () => {
    expect(validatePassword('short')).toBe('Password must be at least 8 characters');
    expect(validatePassword('long-enough')).toBeNull();
  });
});
