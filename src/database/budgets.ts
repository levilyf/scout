import type { SQLiteDatabase } from 'expo-sqlite';
import { asEntityId, type EntityId } from '../domain/types';

export type StoredBudget = { id: EntityId; ownerUserId: EntityId; name: string; amountMinor: number; currency: string; period: 'monthly' | 'weekly' };

export async function createBudget(db: SQLiteDatabase, input: StoredBudget): Promise<void> {
  if (!input.name.trim()) throw new Error('Budget name cannot be empty');
  await db.runAsync('INSERT INTO budgets (id, owner_user_id, name, amount_minor, currency, period, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', input.id, input.ownerUserId, input.name.trim(), input.amountMinor, input.currency, input.period, new Date().toISOString(), new Date().toISOString());
}

export async function listBudgets(db: SQLiteDatabase, ownerUserId: string): Promise<StoredBudget[]> {
  const rows = await db.getAllAsync<{ id: string; owner_user_id: string; name: string; amount_minor: number; currency: string; period: 'monthly' | 'weekly' }>('SELECT id, owner_user_id, name, amount_minor, currency, period FROM budgets WHERE owner_user_id = ? ORDER BY created_at DESC', ownerUserId);
  return rows.map((row) => ({ id: asEntityId(row.id), ownerUserId: asEntityId(row.owner_user_id), name: row.name, amountMinor: row.amount_minor, currency: row.currency, period: row.period }));
}
