import type { TransactionInput } from './transactions';

export function categoryTotal(transactions: TransactionInput[], category: string, currency: string): number {
  return transactions.filter((transaction) => transaction.status === 'confirmed' && transaction.type === 'expense' && transaction.money.currency === currency && transaction.categoryId === category).reduce((sum, transaction) => sum + transaction.money.amountMinor, 0);
}
