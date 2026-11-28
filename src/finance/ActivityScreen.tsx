import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { formatMoney } from '../domain/money';
import type { TransactionInput } from '../domain/transactions';
import { openDatabase } from '../database/client';
import { listTransactions } from '../database/transactions';
import { CenteredState, Screen } from '../ui/primitives';

export function ActivityScreen({ ownerUserId }: { ownerUserId: string }) {
  const [transactions, setTransactions] = useState<TransactionInput[] | null>(null);
  useEffect(() => { void openDatabase().then((db) => listTransactions(db, ownerUserId)).then(setTransactions); }, [ownerUserId]);
  if (!transactions) return <Screen><CenteredState loading title="Loading activity" /></Screen>;
  if (!transactions.length) return <Screen><CenteredState title="No activity yet" description="Add your first expense to start tracking." /></Screen>;
  return <Screen><Text style={styles.title}>Activity</Text><View style={styles.list}>{transactions.map((transaction) => <View key={transaction.id} style={styles.row}><View><Text style={styles.name}>{transaction.type}</Text><Text style={styles.date}>{new Date(transaction.occurredAt).toLocaleDateString()}</Text></View><Text style={styles.amount}>{formatMoney(transaction.money)}</Text></View>)}</View></Screen>;
}

const styles = StyleSheet.create({
  title: { color: colors.primaryText, ...typography.title, marginBottom: spacing.lg },
  list: { gap: spacing.xs },
  row: { alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.md },
  name: { color: colors.primaryText, ...typography.body, textTransform: 'capitalize' },
  date: { color: colors.mutedText, ...typography.metadata, marginTop: spacing.xxs },
  amount: { color: colors.primaryText, ...typography.body },
});
