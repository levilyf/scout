import { describe, expect, it } from 'vitest';
import { exportTransactionsCsv } from './export';

describe('transaction export', () => {
  it('exports CSV with integer amounts and escaped values', () => {
    const csv = exportTransactionsCsv([{ id: 't1', ownerUserId: 'u1', accountId: 'a1', type: 'expense', status: 'confirmed', money: { amountMinor: 149900 as never, currency: 'INR' }, occurredAt: '2027-01-01T00:00:00Z' }]);
    expect(csv).toContain('"amount_minor"');
    expect(csv).toContain('"149900"');
  });
});
