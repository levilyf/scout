import type { TransactionInput } from './transactions';

export function confirmedExpenseTotal(transactions: TransactionInput[], currency: string): number {
  return transactions.filter((t) => t.status === 'confirmed' && t.type === 'expense' && t.money.currency === currency).reduce((sum, t) => sum + t.money.amountMinor, 0);
}

export function confirmedBalanceDelta(transactions: TransactionInput[], currency: string): number {
  return transactions.filter((t) => t.status === 'confirmed' && t.money.currency === currency).reduce((sum, t) => sum + (t.type === 'income' ? t.money.amountMinor : t.type === 'expense' ? -t.money.amountMinor : 0), 0);
}
