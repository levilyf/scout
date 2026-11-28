import { describe, expect, it } from 'vitest';
import { money } from './money';
import { isConfirmed, validateTransaction } from './transactions';

describe('transaction domain', () => {
  const base = { id: 't1', ownerUserId: 'u1', accountId: 'a1', type: 'expense' as const, status: 'confirmed' as const, money: money(100, 'INR'), occurredAt: '2027-01-01T00:00:00.000Z' };
  it('rejects negative amounts and missing identity', () => {
    expect(() => validateTransaction({ ...base, money: money(-1, 'INR') })).toThrow('Transaction amount cannot be negative');
    expect(() => validateTransaction({ ...base, accountId: '' })).toThrow('Transaction identity is required');
  });
  it('excludes pending and ignored records from confirmed state', () => {
    expect(isConfirmed({ status: 'pending' })).toBe(false);
    expect(isConfirmed({ status: 'ignored' })).toBe(false);
    expect(isConfirmed({ status: 'confirmed' })).toBe(true);
  });
});
