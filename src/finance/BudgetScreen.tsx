import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { parseDisplayAmount } from '../domain/money';
import { Field, PrimaryButton, Screen } from '../ui/primitives';

export function BudgetScreen({ onSave }: { onSave?: (budget: { name: string; limitMinor: number; currency: string }) => void }) {
  const [name, setName] = useState('');
  const [limit, setLimit] = useState('');
  const [error, setError] = useState<string | null>(null);
  function save() { try { if (!name.trim()) throw new Error('Budget name is required'); onSave?.({ name: name.trim(), limitMinor: parseDisplayAmount(limit), currency: 'INR' }); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Enter valid budget details'); } }
  return <Screen><View style={styles.content}><Text style={styles.title}>Set budget</Text><Text style={styles.description}>Track confirmed expenses against a monthly limit.</Text><Field label="Budget name" placeholder="Monthly spending" onChangeText={setName} value={name} /><Field label="Limit (INR)" keyboardType="decimal-pad" onChangeText={setLimit} value={limit} />{error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}<PrimaryButton onPress={save}>Save budget</PrimaryButton></View></Screen>;
}
const styles = StyleSheet.create({ content: { flex: 1, justifyContent: 'center', gap: spacing.sm }, title: { color: colors.primaryText, ...typography.title }, description: { color: colors.secondaryText, ...typography.body, marginBottom: spacing.md }, error: { color: colors.danger, ...typography.metadata } });
