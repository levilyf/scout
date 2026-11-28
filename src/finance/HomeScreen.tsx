import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { formatMoney, sumMoney } from '../domain/money';
import type { TransactionInput } from '../domain/transactions';
import { openDatabase } from '../database/client';
import { listTransactions } from '../database/transactions';
import { Card, CenteredState, Screen } from '../ui/primitives';

export function HomeScreen({ ownerUserId, onAddExpense }: { ownerUserId: string; onAddExpense?: () => void }) {
  const [transactions, setTransactions] = useState<TransactionInput[] | null>(null);
  useEffect(() => { void openDatabase().then((db) => listTransactions(db, ownerUserId)).then(setTransactions); }, [ownerUserId]);
  if (!transactions) return <Screen><CenteredState loading title="Loading Scout" /></Screen>;
  const confirmed = transactions.filter((transaction) => transaction.status === 'confirmed');
  const expenses = confirmed.filter((transaction) => transaction.type === 'expense');
  const total = sumMoney(expenses.map((transaction) => transaction.money), 'INR');
  return <Screen><View style={styles.header}><Text style={styles.wordmark}>SCOUT</Text><Text style={styles.metadata}>PRIVATE</Text></View><Text style={styles.greeting}>Your money, clearly.</Text><Card style={styles.summary}><Text style={styles.label}>CONFIRMED SPENDING</Text><Text style={styles.amount}>{formatMoney(total)}</Text><Text style={styles.metadata}>Pending records excluded</Text></Card><Pressable accessibilityRole="button" onPress={onAddExpense} style={styles.action}><Text style={styles.actionText}>＋ Add expense</Text></Pressable><Text style={styles.section}>Recent activity</Text>{confirmed.slice(0, 3).map((transaction) => <View key={transaction.id} style={styles.row}><Text style={styles.name}>{transaction.type}</Text><Text style={styles.metadata}>{formatMoney(transaction.money)}</Text></View>)}</Screen>;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xxl },
  wordmark: { color: colors.primaryText, ...typography.wordmark },
  greeting: { color: colors.primaryText, ...typography.title, marginBottom: spacing.lg },
  summary: { marginBottom: spacing.md },
  label: { color: colors.secondaryText, ...typography.label },
  amount: { color: colors.primaryText, ...typography.amount, marginVertical: spacing.sm },
  metadata: { color: colors.mutedText, ...typography.metadata },
  action: { alignItems: 'center', backgroundColor: colors.primaryText, borderRadius: 12, justifyContent: 'center', minHeight: 48, marginBottom: spacing.xl },
  actionText: { color: colors.background, ...typography.button },
  section: { color: colors.primaryText, ...typography.section, marginBottom: spacing.sm },
  row: { borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.md },
  name: { color: colors.primaryText, ...typography.body, textTransform: 'capitalize' },
});
