import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { formatMoney } from '../domain/money';
import { listBudgets, type StoredBudget } from '../database/budgets';
import { openDatabase } from '../database/client';
import { CenteredState, Screen } from '../ui/primitives';

export function BudgetsScreen({ ownerUserId, onBack }: { ownerUserId: string; onBack?: () => void }) {
  const [budgets, setBudgets] = useState<StoredBudget[] | null>(null);
  useEffect(() => { void openDatabase().then((db) => listBudgets(db, ownerUserId)).then(setBudgets); }, [ownerUserId]);
  if (!budgets) return <Screen><CenteredState loading title="Loading budgets" /></Screen>;
  return <Screen><Text accessibilityRole="button" onPress={onBack} style={styles.back}>‹ Back</Text><Text style={styles.title}>Budgets</Text>{budgets.length ? budgets.map((budget) => <View key={budget.id} style={styles.card}><Text style={styles.name}>{budget.name}</Text><Text style={styles.amount}>{formatMoney({ amountMinor: budget.amountMinor as never, currency: budget.currency })}</Text><Text style={styles.meta}>{budget.period} limit · confirmed expenses only</Text></View>) : <CenteredState title="No budgets yet" description="Set a budget from the Budgets tab." />}</Screen>;
}

const styles = StyleSheet.create({ back: { color: colors.secondaryText, ...typography.body, minHeight: 48 }, title: { color: colors.primaryText, ...typography.title, marginBottom: spacing.lg }, card: { backgroundColor: colors.elevated, borderColor: colors.border, borderRadius: 16, borderWidth: 1, marginBottom: spacing.sm, padding: spacing.md }, name: { color: colors.primaryText, ...typography.section }, amount: { color: colors.primaryText, ...typography.amount, marginVertical: spacing.xs }, meta: { color: colors.mutedText, ...typography.metadata } });
