import { describe, expect, it } from 'vitest';
import { validateCurrency, validateDisplayName, validateUsername } from './validation';

describe('onboarding validation', () => {
  it('requires display name', () => expect(validateDisplayName(' ')).toBe('Display name is required'));
  it('restricts username syntax and length', () => {
    expect(validateUsername('ab')).not.toBeNull();
    expect(validateUsername('scout_user')).toBeNull();
    expect(validateUsername('bad-name')).not.toBeNull();
  });
  it('accepts ISO-style currency codes', () => {
    expect(validateCurrency('INR')).toBeNull();
    expect(validateCurrency('inr')).toBeNull();
  });
});
