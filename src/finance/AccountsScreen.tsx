import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import type { Account } from '../domain/types';
import { openDatabase } from '../database/client';
import { listAccounts } from '../database/accounts';
import { CenteredState, Screen } from '../ui/primitives';

export function AccountsScreen({ ownerUserId, onBack }: { ownerUserId: string; onBack?: () => void }) {
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  useEffect(() => { void openDatabase().then((db) => listAccounts(db, ownerUserId as Account['ownerUserId'])).then(setAccounts); }, [ownerUserId]);
  if (!accounts) return <Screen><CenteredState loading title="Loading accounts" /></Screen>;
  return <Screen><Text accessibilityRole="button" onPress={onBack} style={styles.back}>‹ Back</Text><Text style={styles.title}>Accounts</Text>{accounts.length ? accounts.map((account) => <View key={account.id} style={styles.row}><View><Text style={styles.name}>{account.name}</Text><Text style={styles.meta}>{account.currency} · Manual account</Text></View><Text style={styles.amount}>Opening balance</Text></View>) : <CenteredState title="No accounts yet" description="Add a manual account from Home." />}</Screen>;
}

const styles = StyleSheet.create({ back: { color: colors.secondaryText, ...typography.body, minHeight: 48 }, title: { color: colors.primaryText, ...typography.title, marginBottom: spacing.lg }, row: { borderBottomColor: colors.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.md }, name: { color: colors.primaryText, ...typography.body }, meta: { color: colors.mutedText, ...typography.metadata, marginTop: spacing.xxs }, amount: { color: colors.secondaryText, ...typography.metadata } });
