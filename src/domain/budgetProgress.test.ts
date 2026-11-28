import { describe, expect, it } from 'vitest';
import { calculateBudgetSpent, getBudgetPeriodRange } from './budgetProgress';
import { money } from './money';
import type { TransactionInput } from './transactions';

const transaction = (
  id: string,
  type: TransactionInput['type'],
  status: TransactionInput['status'],
  amountMinor: number,
  occurredAt: string,
  currency = 'INR',
): TransactionInput => ({
  id,
  ownerUserId: 'user-1',
  accountId: 'account-1',
  type,
  status,
  money: money(amountMinor, currency),
  occurredAt,
});

describe('budget progress', () => {
  it('uses the first day of the current month through the next month', () => {
    const { start, end } = getBudgetPeriodRange('monthly', new Date(2026, 10, 28, 15, 30));
    expect(start.getFullYear()).toBe(2026);
    expect(start.getMonth()).toBe(10);
    expect(start.getDate()).toBe(1);
    expect(end.getMonth()).toBe(11);
    expect(end.getDate()).toBe(1);
  });

  it('uses Monday-to-Monday calendar weeks', () => {
    const { start, end } = getBudgetPeriodRange('weekly', new Date(2026, 10, 28, 15, 30));
    expect(start.getDay()).toBe(1);
    expect(end.getDay()).toBe(1);
    expect(end.getDate() - start.getDate()).toBe(7);
  });

  it('counts only confirmed expenses in the selected period and currency', () => {
    const now = new Date(2026, 10, 28, 12);
    const transactions = [
      transaction('current-expense', 'expense', 'confirmed', 12000, new Date(2026, 10, 20, 12).toISOString()),
      transaction('pending', 'expense', 'pending', 50000, new Date(2026, 10, 21, 12).toISOString()),
      transaction('ignored', 'expense', 'ignored', 60000, new Date(2026, 10, 22, 12).toISOString()),
      transaction('income', 'income', 'confirmed', 70000, new Date(2026, 10, 23, 12).toISOString()),
      transaction('transfer', 'transfer', 'confirmed', 80000, new Date(2026, 10, 24, 12).toISOString()),
      transaction('other-currency', 'expense', 'confirmed', 90000, new Date(2026, 10, 25, 12).toISOString(), 'USD'),
      transaction('previous-month', 'expense', 'confirmed', 100000, new Date(2026, 9, 31, 12).toISOString()),
    ];
    expect(calculateBudgetSpent(transactions, { currency: 'INR', period: 'monthly' }, now)).toBe(12000);
  });

  it('does not count transactions outside the current weekly window', () => {
    const now = new Date(2026, 10, 28, 12);
    const transactions = [
      transaction('inside', 'expense', 'confirmed', 1000, new Date(2026, 10, 23, 12).toISOString()),
      transaction('before-week', 'expense', 'confirmed', 2000, new Date(2026, 10, 22, 12).toISOString()),
    ];
    expect(calculateBudgetSpent(transactions, { currency: 'INR', period: 'weekly' }, now)).toBe(1000);
  });
});
