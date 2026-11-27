export type Currency = 'INR' | (string & {});
export type MinorUnits = number & { readonly __brand: 'MinorUnits' };
export type EntityId = string & { readonly __brand: 'EntityId' };

export type TransactionType = 'expense' | 'income' | 'transfer';
export type TransactionStatus = 'pending' | 'confirmed' | 'ignored';

export type Money = {
  amountMinor: MinorUnits;
  currency: Currency;
};

export type Account = {
  id: EntityId;
  ownerUserId: EntityId;
  name: string;
  currency: Currency;
  createdAt: string;
  updatedAt: string;
};

export type Transaction = {
  id: EntityId;
  ownerUserId: EntityId;
  accountId: EntityId;
  type: TransactionType;
  status: TransactionStatus;
  money: Money;
  occurredAt: string;
  createdAt: string;
  updatedAt: string;
};

export function asEntityId(value: string): EntityId {
  if (!value.trim()) throw new Error('Entity ID cannot be empty');
  return value as EntityId;
}

export function asMinorUnits(value: number): MinorUnits {
  if (!Number.isSafeInteger(value)) throw new Error('Minor units must be a safe integer');
  return value as MinorUnits;
}
