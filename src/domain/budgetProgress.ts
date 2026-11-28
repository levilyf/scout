import type { StoredBudget } from '../database/budgets';
import type { TransactionInput } from './transactions';

export type BudgetPeriodRange = { start: Date; end: Date };

/** Calendar-based budget window in the device's local timezone. Weeks start on Monday. */
export function getBudgetPeriodRange(period: StoredBudget['period'], now = new Date()): BudgetPeriodRange {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  if (period === 'monthly') {
    start.setDate(1);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    return { start, end };
  }

  const daysSinceMonday = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - daysSinceMonday);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return { start, end };
}

/** Sum only confirmed expenses matching the budget currency and current budget window. */
export function calculateBudgetSpent(
  transactions: readonly TransactionInput[],
  budget: Pick<StoredBudget, 'currency' | 'period'>,
  now = new Date(),
): number {
  const { start, end } = getBudgetPeriodRange(budget.period, now);
  const startTime = start.getTime();
  const endTime = end.getTime();

  return transactions.reduce((total, transaction) => {
    if (
      transaction.status !== 'confirmed' ||
      transaction.type !== 'expense' ||
      transaction.money.currency !== budget.currency
    ) return total;

    const occurredAt = new Date(transaction.occurredAt).getTime();
    if (!Number.isFinite(occurredAt) || occurredAt < startTime || occurredAt >= endTime) return total;

    const next = total + transaction.money.amountMinor;
    if (!Number.isSafeInteger(next)) throw new Error('Budget total exceeds safe integer range');
    return next;
  }, 0);
}
