import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { formatMoney } from '../domain/money';
import { listBudgets, type StoredBudget } from '../database/budgets';
import { confirmedExpenseTotal } from '../database/transactions';
import { openDatabase } from '../database/client';
import { CenteredState, Screen } from '../ui/primitives';

export function BudgetsScreen({ ownerUserId, onBack, onSelect }: { ownerUserId: string; onBack?: () => void; onSelect?: (budget: StoredBudget) => void }) {
  const [budgets, setBudgets] = useState<StoredBudget[] | null>(null);
  const [spent, setSpent] = useState(0);
  useEffect(() => { void openDatabase().then(async (db) => { const next = await listBudgets(db, ownerUserId); setBudgets(next); if (next[0]) setSpent(await confirmedExpenseTotal(db, ownerUserId, next[0].currency)); }); }, [ownerUserId]);
  if (!budgets) return <Screen><CenteredState loading title="Loading budgets" /></Screen>;
  return <Screen><Text accessibilityRole="button" onPress={onBack} style={styles.back}>‹ Back</Text><Text style={styles.title}>Budgets</Text>{budgets.length ? budgets.map((budget) => { const remaining = budget.amountMinor - spent; const progress = Math.min(1, spent / Math.max(1, budget.amountMinor)); return <View key={budget.id} onTouchEnd={() => onSelect?.(budget)} style={styles.card}><Text style={styles.name}>{budget.name}</Text><Text style={styles.amount}>{formatMoney({ amountMinor: budget.amountMinor as never, currency: budget.currency })}</Text><View style={styles.track}><View style={[styles.fill, { width: `${progress * 100}%` }]} /></View><Text style={styles.meta}>{formatMoney({ amountMinor: remaining as never, currency: budget.currency })} remaining · confirmed expenses only</Text></View>; }) : <CenteredState title="No budgets yet" description="Set a budget from the Budgets tab." />}</Screen>;
}

const styles = StyleSheet.create({ back: { color: colors.secondaryText, ...typography.body, minHeight: 48 }, title: { color: colors.primaryText, ...typography.title, marginBottom: spacing.lg }, card: { backgroundColor: colors.elevated, borderColor: colors.border, borderRadius: 16, borderWidth: 1, marginBottom: spacing.sm, padding: spacing.md }, name: { color: colors.primaryText, ...typography.section }, amount: { color: colors.primaryText, ...typography.amount, marginVertical: spacing.xs }, track: { backgroundColor: colors.border, borderRadius: 999, height: 6, overflow: 'hidden' }, fill: { backgroundColor: colors.primaryText, height: '100%' }, meta: { color: colors.mutedText, ...typography.metadata, marginTop: spacing.sm } });
