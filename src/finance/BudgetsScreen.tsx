import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { formatMoney } from '../domain/money';
import { calculateBudgetSpent } from '../domain/budgetProgress';
import type { TransactionInput } from '../domain/transactions';
import { listBudgets, type StoredBudget } from '../database/budgets';
import { listTransactions } from '../database/transactions';
import { openDatabase } from '../database/client';
import { CenteredState, Screen } from '../ui/primitives';

export function BudgetsScreen({ ownerUserId, onBack, onSelect }: { ownerUserId: string; onBack?: () => void; onSelect?: (budget: StoredBudget) => void }) {
  const [budgets, setBudgets] = useState<StoredBudget[] | null>(null);
  const [transactions, setTransactions] = useState<TransactionInput[] | null>(null);

  useEffect(() => {
    let active = true;
    void openDatabase().then(async (db) => {
      const [nextBudgets, nextTransactions] = await Promise.all([
        listBudgets(db, ownerUserId),
        listTransactions(db, ownerUserId),
      ]);
      if (active) {
        setBudgets(nextBudgets);
        setTransactions(nextTransactions);
      }
    }).catch(() => {
      if (active) {
        setBudgets([]);
        setTransactions([]);
      }
    });
    return () => { active = false; };
  }, [ownerUserId]);

  if (!budgets || !transactions) return <Screen><CenteredState loading title="Loading budgets" /></Screen>;
  return <Screen>
    <Pressable accessibilityRole="button" onPress={onBack} style={styles.back}><Text style={styles.backText}>‹ Back</Text></Pressable>
    <Text style={styles.title}>Budgets</Text>
    {budgets.length ? budgets.map((budget) => {
      const spent = calculateBudgetSpent(transactions, budget);
      const remaining = budget.amountMinor - spent;
      const progress = Math.min(1, Math.max(0, spent / Math.max(1, budget.amountMinor)));
      return <Pressable accessibilityRole="button" key={budget.id} onPress={() => onSelect?.(budget)} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{budget.name}</Text>
          <Text style={styles.period}>{budget.period === 'monthly' ? 'THIS MONTH' : 'THIS WEEK'}</Text>
        </View>
        <Text style={styles.amount}>{formatMoney({ amountMinor: budget.amountMinor as never, currency: budget.currency })}</Text>
        <View style={styles.track}><View style={[styles.fill, { width: `${progress * 100}%` }]} /></View>
        <Text style={styles.meta}>{formatMoney({ amountMinor: remaining as never, currency: budget.currency })} remaining</Text>
        <Text style={styles.spent}>{formatMoney({ amountMinor: spent as never, currency: budget.currency })} spent in this period</Text>
      </Pressable>;
    }) : <CenteredState title="No budgets yet" description="Create a budget to start tracking your spending." />}
  </Screen>;
}

const styles = StyleSheet.create({
  back: { justifyContent: 'center', minHeight: 48 },
  backText: { color: colors.secondaryText, ...typography.body },
  title: { color: colors.primaryText, ...typography.title, marginBottom: spacing.lg },
  card: { backgroundColor: colors.elevated, borderColor: colors.border, borderRadius: 16, borderWidth: 1, marginBottom: spacing.sm, padding: spacing.md },
  cardHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  name: { color: colors.primaryText, ...typography.section },
  period: { color: colors.mutedText, ...typography.metadata },
  amount: { color: colors.primaryText, ...typography.amount, marginVertical: spacing.xs },
  track: { backgroundColor: colors.border, borderRadius: 999, height: 6, overflow: 'hidden' },
  fill: { backgroundColor: colors.primaryText, height: '100%' },
  meta: { color: colors.primaryText, ...typography.body, marginTop: spacing.sm },
  spent: { color: colors.mutedText, ...typography.metadata, marginTop: spacing.xxs },
});
