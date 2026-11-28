import { describe, expect, it } from 'vitest';
import { money } from './money';
import { canDeleteTransaction, canEditTransaction, isConfirmed, matchesTransactionSearch, validateTransaction, validateTransferPair } from './transactions';

describe('transaction domain', () => {
  const base = { id: 't1', ownerUserId: 'u1', accountId: 'a1', type: 'expense' as const, status: 'confirmed' as const, money: money(100, 'INR'), occurredAt: '2027-01-01T00:00:00.000Z' };
  it('rejects negative amounts and missing identity', () => {
    expect(() => validateTransaction({ ...base, money: money(-1, 'INR') })).toThrow('Transaction amount cannot be negative');
    expect(() => validateTransaction({ ...base, accountId: '' })).toThrow('Transaction identity is required');
  });
  it('rejects empty idempotency keys', () => expect(() => validateTransaction({ ...base, idempotencyKey: ' ' })).toThrow('Idempotency key cannot be empty'));

  it('validates transfer pair ownership, money, and distinct accounts', () => {
    const leg = { ...base, type: 'transfer' as const };
    validateTransferPair({ outgoing: { ...leg, accountId: 'a1' }, incoming: { ...leg, id: 't2', accountId: 'a2' } });
    expect(() => validateTransferPair({ outgoing: leg, incoming: { ...leg, id: 't2', ownerUserId: 'u2', accountId: 'a2' } })).toThrow('Transfer owner mismatch');
  });

  it('allows editing except ignored records and deleting only resolved records', () => {
    expect(canEditTransaction('confirmed')).toBe(true);
    expect(canEditTransaction('ignored')).toBe(false);
    expect(canDeleteTransaction('pending')).toBe(false);
    expect(canDeleteTransaction('confirmed')).toBe(true);
  });

  it('excludes pending and ignored records from confirmed state', () => {
    expect(isConfirmed({ status: 'pending' })).toBe(false);
    expect(isConfirmed({ status: 'ignored' })).toBe(false);
    expect(isConfirmed({ status: 'confirmed' })).toBe(true);
  });
  
  it('searches stored transaction fields including amount, category, account, and date', () => {
    const searchable = { ...base, categoryId: 'food', occurredAt: '2026-11-28T10:30:00.000Z' };
    expect(matchesTransactionSearch(searchable, 'expense')).toBe(true);
    expect(matchesTransactionSearch(searchable, '1.00')).toBe(true);
    expect(matchesTransactionSearch(searchable, 'food')).toBe(true);
    expect(matchesTransactionSearch(searchable, 'a1')).toBe(true);
    expect(matchesTransactionSearch(searchable, 'does-not-match')).toBe(false);
    expect(matchesTransactionSearch(searchable, '   ')).toBe(true);
  });
});
