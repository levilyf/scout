import { describe, expect, it } from 'vitest';
import { money } from './money';
import { confirmedBalanceDelta, confirmedExpenseTotal } from './aggregates';

const tx = (type: 'expense' | 'income' | 'transfer', status: 'confirmed' | 'pending' | 'ignored', amountMinor: number) => ({ id: `${type}-${status}-${amountMinor}`, ownerUserId: 'u', accountId: 'a', type, status, money: money(amountMinor, 'INR'), occurredAt: '' });

describe('finance aggregates', () => {
  it('excludes pending and ignored expenses', () => expect(confirmedExpenseTotal([tx('expense', 'confirmed', 100), tx('expense', 'pending', 200), tx('expense', 'ignored', 300)], 'INR')).toBe(100));
  it('excludes transfers from balance delta', () => expect(confirmedBalanceDelta([tx('income', 'confirmed', 1000), tx('expense', 'confirmed', 250), tx('transfer', 'confirmed', 500)], 'INR')).toBe(750));
});
