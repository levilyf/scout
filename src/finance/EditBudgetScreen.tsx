import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { parseDisplayAmount } from '../domain/money';
import type { StoredBudget } from '../database/budgets';
import { Field, PrimaryButton, Screen } from '../ui/primitives';

export function EditBudgetScreen({ budget, onBack, onSave }: { budget: StoredBudget; onBack?: () => void; onSave?: (budget: StoredBudget) => void }) {
  const [name, setName] = useState(budget.name);
  const [amount, setAmount] = useState((budget.amountMinor / 100).toFixed(2));
  const [error, setError] = useState<string | null>(null);
  function save() { try { onSave?.({ ...budget, name: name.trim(), amountMinor: parseDisplayAmount(amount) }); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Enter valid budget details'); } }
  return <Screen><Text accessibilityRole="button" onPress={onBack} style={styles.back}>‹ Back</Text><View style={styles.content}><Text style={styles.title}>Edit budget</Text><Field label="Budget name" onChangeText={setName} value={name} /><Field label="Limit (INR)" keyboardType="decimal-pad" onChangeText={setAmount} value={amount} />{error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}<PrimaryButton onPress={save}>Save changes</PrimaryButton></View></Screen>;
}
const styles = StyleSheet.create({ back: { color: colors.secondaryText, ...typography.body, minHeight: 48 }, content: { flex: 1, justifyContent: 'center', gap: spacing.sm }, title: { color: colors.primaryText, ...typography.title }, error: { color: colors.danger, ...typography.metadata } });
