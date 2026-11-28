import type { Money, TransactionStatus, TransactionType } from './types';

export type TransactionInput = {
  id: string;
  ownerUserId: string;
  accountId: string;
  type: TransactionType;
  status: TransactionStatus;
  money: Money;
  occurredAt: string;
  idempotencyKey?: string;
};

export type TransferPair = { outgoing: TransactionInput; incoming: TransactionInput };

export function validateTransaction(input: TransactionInput): void {
  if (!input.id || !input.ownerUserId || !input.accountId) throw new Error('Transaction identity is required');
  if (input.money.amountMinor < 0) throw new Error('Transaction amount cannot be negative');
  if (input.type === 'transfer' && input.status === 'pending') throw new Error('Transfer cannot be pending');
  if (input.idempotencyKey !== undefined && !input.idempotencyKey.trim()) throw new Error('Idempotency key cannot be empty');
}

export function isConfirmed(input: Pick<TransactionInput, 'status'>): boolean {
  return input.status === 'confirmed';
}

export function validateTransferPair(pair: TransferPair): void {
  validateTransaction(pair.outgoing);
  validateTransaction(pair.incoming);
  if (pair.outgoing.type !== 'transfer' || pair.incoming.type !== 'transfer') throw new Error('Transfer legs required');
  if (pair.outgoing.ownerUserId !== pair.incoming.ownerUserId) throw new Error('Transfer owner mismatch');
  if (pair.outgoing.money.currency !== pair.incoming.money.currency || pair.outgoing.money.amountMinor !== pair.incoming.money.amountMinor) throw new Error('Transfer money mismatch');
  if (pair.outgoing.accountId === pair.incoming.accountId) throw new Error('Transfer accounts must differ');
}

export function canEditTransaction(status: TransactionStatus): boolean {
  return status !== 'ignored';
}

export function canDeleteTransaction(status: TransactionStatus): boolean {
  return status !== 'pending';
}
