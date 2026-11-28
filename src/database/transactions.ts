import type { SQLiteDatabase } from 'expo-sqlite';
import { canDeleteTransaction, canEditTransaction, validateTransaction, type TransactionInput } from '../domain/transactions';

export async function insertTransaction(db: SQLiteDatabase, input: TransactionInput, now = new Date().toISOString()): Promise<void> {
  validateTransaction(input);
  await db.runAsync(
    `INSERT OR IGNORE INTO transactions (id, owner_user_id, account_id, amount_minor, currency, type, status, occurred_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    input.id, input.ownerUserId, input.accountId, input.money.amountMinor, input.money.currency, input.type, input.status, input.occurredAt, now, now,
  );
}

export async function listTransactions(db: SQLiteDatabase, ownerUserId: string): Promise<TransactionInput[]> {
  const rows = await db.getAllAsync<{ id: string; owner_user_id: string; account_id: string; amount_minor: number; currency: string; type: TransactionInput['type']; status: TransactionInput['status']; occurred_at: string }>(
    'SELECT id, owner_user_id, account_id, amount_minor, currency, type, status, occurred_at FROM transactions WHERE owner_user_id = ? ORDER BY occurred_at DESC',
    ownerUserId,
  );
  return rows.map((row) => ({ id: row.id, ownerUserId: row.owner_user_id, accountId: row.account_id, type: row.type, status: row.status, money: { amountMinor: row.amount_minor as TransactionInput['money']['amountMinor'], currency: row.currency }, occurredAt: row.occurred_at }));
}

export async function updateTransaction(db: SQLiteDatabase, ownerUserId: string, input: TransactionInput, now = new Date().toISOString()): Promise<void> {
  validateTransaction(input);
  if (!canEditTransaction(input.status)) throw new Error('Ignored transaction cannot be edited');
  await db.runAsync(
    `UPDATE transactions SET account_id = ?, amount_minor = ?, currency = ?, type = ?, status = ?, occurred_at = ?, updated_at = ? WHERE id = ? AND owner_user_id = ?`,
    input.accountId, input.money.amountMinor, input.money.currency, input.type, input.status, input.occurredAt, now, input.id, ownerUserId,
  );
}

export async function deleteTransaction(db: SQLiteDatabase, ownerUserId: string, id: string, status: TransactionInput['status']): Promise<void> {
  if (!canDeleteTransaction(status)) throw new Error('Pending transaction cannot be deleted');
  await db.runAsync('DELETE FROM transactions WHERE id = ? AND owner_user_id = ?', id, ownerUserId);
}
