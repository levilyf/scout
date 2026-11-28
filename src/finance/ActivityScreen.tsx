import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radii, spacing, typography } from '../design/tokens';
import { formatMoney } from '../domain/money';
import type { TransactionInput } from '../domain/transactions';
import { openDatabase } from '../database/client';
import { listTransactions } from '../database/transactions';
import { CenteredState, Screen } from '../ui/primitives';

export function ActivityScreen({ ownerUserId, onBack, onSelect }: { ownerUserId: string; onBack?: () => void; onSelect?: (transaction: TransactionInput) => void }) {
  const [transactions, setTransactions] = useState<TransactionInput[] | null>(null);
  const [filter, setFilter] = useState<'all' | 'expense' | 'income' | 'transfer'>('all');
  const [query, setQuery] = useState('');
  useEffect(() => { void openDatabase().then((db) => listTransactions(db, ownerUserId)).then(setTransactions); }, [ownerUserId]);
  if (!transactions) return <Screen><CenteredState loading title="Loading activity" /></Screen>;
  if (!transactions.length) return <Screen><CenteredState title="No activity yet" description="Add your first expense to start tracking." /></Screen>;
  const visible = transactions.filter((transaction) => (filter === 'all' || transaction.type === filter) && (!query.trim() || transaction.type.includes(query.trim().toLowerCase())));
  const groups = visible.reduce<Record<string, TransactionInput[]>>((result, transaction) => { const key = new Date(transaction.occurredAt).toLocaleDateString(); (result[key] ??= []).push(transaction); return result; }, {});
  return <Screen><Pressable accessibilityRole="button" onPress={onBack} style={styles.back}><Text style={styles.date}>‹ Back</Text></Pressable><Text style={styles.title}>Activity</Text><TextInput accessibilityLabel="Search activity" placeholder="Search transactions" placeholderTextColor={colors.mutedText} onChangeText={setQuery} style={styles.search} value={query} /><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{(['all', 'expense', 'income', 'transfer'] as const).map((value) => <Pressable key={value} onPress={() => setFilter(value)} style={[styles.chip, filter === value && styles.selectedChip]}><Text style={styles.chipText}>{value === 'all' ? 'All' : value}</Text></Pressable>)}</ScrollView><View style={styles.list}>{Object.entries(groups).map(([date, items]) => <View key={date}><Text style={styles.group}>{date}</Text>{items.map((transaction) => <Pressable accessibilityRole="button" key={transaction.id} onPress={() => onSelect?.(transaction)} style={styles.row}><View><Text style={styles.name}>{transaction.type}</Text><Text style={styles.date}>{new Date(transaction.occurredAt).toLocaleTimeString()}</Text></View><Text style={[styles.amount, transaction.type === 'income' && styles.income]}>{formatMoney(transaction.money)}</Text></Pressable>)}</View>)}</View></Screen>;
}

const styles = StyleSheet.create({
  back: { minHeight: 48, justifyContent: 'center' },
  title: { color: colors.primaryText, ...typography.title, marginBottom: spacing.lg },
  search: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 12, borderWidth: 1, color: colors.primaryText, ...typography.body, marginBottom: spacing.sm, minHeight: 48, paddingHorizontal: spacing.md },
  filters: { gap: spacing.xs, paddingBottom: spacing.md },
  chip: { borderColor: colors.border, borderRadius: radii.pill, borderWidth: 1, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  selectedChip: { backgroundColor: colors.elevated },
  chipText: { color: colors.secondaryText, ...typography.metadata, textTransform: 'capitalize' },
  list: { gap: spacing.lg },
  group: { color: colors.secondaryText, ...typography.label, marginBottom: spacing.xs },
  row: { alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.md },
  name: { color: colors.primaryText, ...typography.body, textTransform: 'capitalize' },
  date: { color: colors.mutedText, ...typography.metadata, marginTop: spacing.xxs },
  amount: { color: colors.primaryText, ...typography.body },
  income: { color: colors.positive },
});
