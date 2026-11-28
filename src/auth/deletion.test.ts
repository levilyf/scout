import { describe, expect, it } from 'vitest';
import { canUseProtectedData, requestDeletion } from './deletion';

describe('account deletion lifecycle', () => {
  it('requires reauthentication', () => {
    expect(requestDeletion(false)).toBe('reauth-required');
    expect(requestDeletion(true)).toBe('queued');
  });

  it('blocks protected data once deletion is queued or complete', () => {
    expect(canUseProtectedData('queued')).toBe(false);
    expect(canUseProtectedData('completed')).toBe(false);
    expect(canUseProtectedData('requested')).toBe(true);
  });
});
