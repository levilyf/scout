import type { SQLiteDatabase } from 'expo-sqlite';
import { asEntityId, asMinorUnits, type Account, type Currency, type EntityId } from '../domain/types';

export type NewAccount = {
  id: EntityId;
  ownerUserId: EntityId;
  name: string;
  currency: Currency;
  openingBalanceMinor?: number;
};

export async function createAccount(db: SQLiteDatabase, input: NewAccount, now = new Date().toISOString()): Promise<Account> {
  const name = input.name.trim();
  if (!name) throw new Error('Account name cannot be empty');
  const openingBalanceMinor = asMinorUnits(input.openingBalanceMinor ?? 0);
  await db.runAsync(
    'INSERT INTO accounts (id, owner_user_id, name, currency, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    input.id,
    input.ownerUserId,
    name,
    input.currency,
    now,
    now,
  );
  return { id: input.id, ownerUserId: input.ownerUserId, name, currency: input.currency, createdAt: now, updatedAt: now };
}

export async function accountOpeningTotal(db: SQLiteDatabase, ownerUserId: EntityId, currency: Currency): Promise<number> {
  const row = await db.getFirstAsync<{ total: number | null }>('SELECT COALESCE(SUM(opening_balance_minor), 0) AS total FROM accounts WHERE owner_user_id = ? AND currency = ? AND archived_at IS NULL', ownerUserId, currency);
  return row?.total ?? 0;
}

export async function listAccounts(db: SQLiteDatabase, ownerUserId: EntityId): Promise<Account[]> {
  const rows = await db.getAllAsync<{ id: string; owner_user_id: string; name: string; currency: string; created_at: string; updated_at: string }>(
    'SELECT id, owner_user_id, name, currency, created_at, updated_at FROM accounts WHERE owner_user_id = ? ORDER BY created_at',
    ownerUserId,
  );
  return rows.map((row) => ({
    id: asEntityId(row.id),
    ownerUserId: asEntityId(row.owner_user_id),
    name: row.name,
    currency: row.currency,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}
