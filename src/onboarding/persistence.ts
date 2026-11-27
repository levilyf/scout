import type { SQLiteDatabase } from 'expo-sqlite';

export type OnboardingRecord = {
  ownerUserId: string;
  displayName: string;
  username: string;
  currency: string;
  privacyAcknowledged: boolean;
  accountName: string | null;
};

export async function saveOnboarding(db: SQLiteDatabase, record: OnboardingRecord): Promise<void> {
  await db.runAsync(
    `INSERT INTO profiles (owner_user_id, display_name, username, currency, privacy_acknowledged, account_name, completed_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(owner_user_id) DO UPDATE SET display_name = excluded.display_name, username = excluded.username, currency = excluded.currency, privacy_acknowledged = excluded.privacy_acknowledged, account_name = excluded.account_name, completed_at = excluded.completed_at`,
    record.ownerUserId, record.displayName, record.username, record.currency, record.privacyAcknowledged ? 1 : 0, record.accountName, new Date().toISOString(),
  );
}
