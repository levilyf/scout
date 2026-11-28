import type { Money, TransactionStatus, TransactionType } from './types';

export type TransactionInput = {
  id: string;
  ownerUserId: string;
  accountId: string;
  type: TransactionType;
  status: TransactionStatus;
  money: Money;
  occurredAt: string;
};

export function validateTransaction(input: TransactionInput): void {
  if (!input.id || !input.ownerUserId || !input.accountId) throw new Error('Transaction identity is required');
  if (input.money.amountMinor < 0) throw new Error('Transaction amount cannot be negative');
  if (input.type === 'transfer' && input.status === 'pending') throw new Error('Transfer cannot be pending');
}

export function isConfirmed(input: Pick<TransactionInput, 'status'>): boolean {
  return input.status === 'confirmed';
}
