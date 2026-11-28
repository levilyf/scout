import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { formatMoney } from '../domain/money';
import type { TransactionInput } from '../domain/transactions';
import { categoryTotal } from '../domain/categories';
import { openDatabase } from '../database/client';
import { listTransactions } from '../database/transactions';
import { CenteredState, Screen } from '../ui/primitives';

export function CategoryDetailScreen({ ownerUserId, categoryId, onBack }: { ownerUserId: string; categoryId: string; onBack?: () => void }) {
  const [transactions, setTransactions] = useState<TransactionInput[] | null>(null);
  useEffect(() => { void openDatabase().then((db) => listTransactions(db, ownerUserId)).then(setTransactions); }, [ownerUserId]);
  if (!transactions) return <Screen><CenteredState loading title="Loading category" /></Screen>;
  const total = categoryTotal(transactions, categoryId, 'INR');
  const items = transactions.filter((t) => t.categoryId === categoryId && t.status === 'confirmed');
  return <Screen><Text accessibilityRole="button" onPress={onBack} style={styles.back}>‹ Back</Text><Text style={styles.title}>{categoryId}</Text><Text style={styles.amount}>{formatMoney({ amountMinor: total as never, currency: 'INR' })}</Text>{items.map((item) => <View key={item.id} style={styles.row}><Text style={styles.name}>{new Date(item.occurredAt).toLocaleDateString()}</Text><Text style={styles.meta}>{formatMoney(item.money)}</Text></View>)}</Screen>;
}
const styles = StyleSheet.create({ back: { color: colors.secondaryText, ...typography.body, minHeight: 48 }, title: { color: colors.primaryText, ...typography.title, marginBottom: spacing.md, textTransform: 'capitalize' }, amount: { color: colors.primaryText, ...typography.amount, marginBottom: spacing.lg }, row: { borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.md }, name: { color: colors.primaryText, ...typography.body }, meta: { color: colors.secondaryText, ...typography.body } });
