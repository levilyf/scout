import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_VERSION = 6;

const migrations: Record<number, string[]> = {
  1: [
    `CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY NOT NULL, owner_user_id TEXT NOT NULL, name TEXT NOT NULL, currency TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS transactions (id TEXT PRIMARY KEY NOT NULL, owner_user_id TEXT NOT NULL, account_id TEXT NOT NULL REFERENCES accounts(id), amount_minor INTEGER NOT NULL, currency TEXT NOT NULL, type TEXT NOT NULL CHECK (type IN ('expense', 'income', 'transfer')), status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'ignored')), occurred_at TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
    `CREATE INDEX IF NOT EXISTS transactions_owner_idx ON transactions(owner_user_id, occurred_at)`,
  ],
  2: [
    `ALTER TABLE accounts ADD COLUMN opening_balance_minor INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE accounts ADD COLUMN archived_at TEXT`,
  ],
  3: [
    `CREATE TABLE IF NOT EXISTS categories (id TEXT PRIMARY KEY NOT NULL, owner_user_id TEXT, name TEXT NOT NULL, kind TEXT NOT NULL CHECK (kind IN ('expense', 'income')), archived_at TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
    `CREATE INDEX IF NOT EXISTS categories_owner_idx ON categories(owner_user_id, kind, archived_at)`,
  ],
  4: [
    `CREATE TABLE IF NOT EXISTS profiles (owner_user_id TEXT PRIMARY KEY NOT NULL, display_name TEXT NOT NULL, username TEXT NOT NULL, currency TEXT NOT NULL, privacy_acknowledged INTEGER NOT NULL CHECK (privacy_acknowledged IN (0, 1)), account_name TEXT, completed_at TEXT NOT NULL)`,
    `CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_idx ON profiles(username)`,
  ],
  5: [
    `CREATE TABLE IF NOT EXISTS budgets (id TEXT PRIMARY KEY NOT NULL, owner_user_id TEXT NOT NULL, name TEXT NOT NULL, amount_minor INTEGER NOT NULL, currency TEXT NOT NULL, period TEXT NOT NULL CHECK (period IN ('monthly', 'weekly')), created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
    `CREATE INDEX IF NOT EXISTS budgets_owner_idx ON budgets(owner_user_id, created_at)`,
  ],
  6: [
    `ALTER TABLE transactions ADD COLUMN category_id TEXT`,
    `CREATE INDEX IF NOT EXISTS transactions_category_idx ON transactions(owner_user_id, category_id, status)`,
  ],
};

export async function migrateDatabase(db: SQLiteDatabase): Promise<void> {
  await db.execAsync('PRAGMA foreign_keys = ON;');
  const version = (await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version'))?.user_version ?? 0;
  for (let next = version + 1; next <= DATABASE_VERSION; next += 1) {
    await db.withTransactionAsync(async () => {
      for (const statement of migrations[next]) await db.execAsync(statement);
      await db.execAsync(`PRAGMA user_version = ${next}`);
    });
  }
}
