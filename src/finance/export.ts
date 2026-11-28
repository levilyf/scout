import type { TransactionInput } from '../domain/transactions';

export function exportTransactionsCsv(transactions: TransactionInput[]): string {
  const rows = [['id', 'owner_user_id', 'account_id', 'type', 'status', 'amount_minor', 'currency', 'occurred_at'], ...transactions.map((t) => [t.id, t.ownerUserId, t.accountId, t.type, t.status, String(t.money.amountMinor), t.money.currency, t.occurredAt])];
  return rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')).join('\n');
}
