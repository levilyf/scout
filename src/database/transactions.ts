import type { SQLiteDatabase } from 'expo-sqlite';
import { validateTransaction, type TransactionInput } from '../domain/transactions';

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
