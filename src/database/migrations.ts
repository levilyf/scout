import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_VERSION = 1;

const migrations: Record<number, string[]> = {
  1: [
    `CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY NOT NULL, owner_user_id TEXT NOT NULL, name TEXT NOT NULL, currency TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS transactions (id TEXT PRIMARY KEY NOT NULL, owner_user_id TEXT NOT NULL, account_id TEXT NOT NULL REFERENCES accounts(id), amount_minor INTEGER NOT NULL, currency TEXT NOT NULL, type TEXT NOT NULL CHECK (type IN ('expense', 'income', 'transfer')), status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'ignored')), occurred_at TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
    `CREATE INDEX IF NOT EXISTS transactions_owner_idx ON transactions(owner_user_id, occurred_at)`,
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
