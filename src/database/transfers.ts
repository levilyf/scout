import type { SQLiteDatabase } from 'expo-sqlite';
import { validateTransferPair, type TransferPair } from '../domain/transactions';

export async function insertTransferPair(db: SQLiteDatabase, pair: TransferPair, now = new Date().toISOString()): Promise<void> {
  validateTransferPair(pair);
  await db.withTransactionAsync(async () => {
    for (const leg of [pair.outgoing, pair.incoming]) {
      await db.runAsync(
        `INSERT OR IGNORE INTO transactions (id, owner_user_id, account_id, amount_minor, currency, type, status, occurred_at, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        leg.id, leg.ownerUserId, leg.accountId, leg.money.amountMinor, leg.money.currency, leg.type, leg.status, leg.occurredAt, now, now,
      );
    }
  });
}
