import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { colors, radii, spacing, typography } from '../design/tokens';
import { formatMoney } from '../domain/money';
import type { TransactionInput } from '../domain/transactions';
import { accountOpeningTotal } from '../database/accounts';
import { confirmedBalanceDelta, listTransactions } from '../database/transactions';
import { openDatabase } from '../database/client';
import { CenteredState, Screen } from '../ui/primitives';

type Range = '1D' | '1W' | '1M' | '3M' | '1Y';

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function TrendChart({ values }: { values: number[] }) {
  const { width: windowWidth } = useWindowDimensions();
  const width = Math.max(240, windowWidth - 64);
  const height = 94;
  const max = Math.max(1, ...values);
  const min = Math.min(0, ...values);
  const points = values.map((value, index) => ({
    x: 2 + (index / Math.max(1, values.length - 1)) * (width - 4),
    y: height - 8 - ((value - min) / Math.max(1, max - min)) * (height - 20),
  }));
  return <View style={{ height, width }}>
    {points.slice(1).map((point, index) => {
      const previous = points[index];
      const dx = point.x - previous.x;
      const dy = point.y - previous.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      return <View key={index} style={{ backgroundColor: '#B8B8B8', height: 1.5, left: previous.x, position: 'absolute', top: previous.y, transform: [{ rotate: `${angle}deg` }], transformOrigin: 'left center', width: length }} />;
    })}
  </View>;
}

export function HomeScreen({ ownerUserId, onAddExpense, onAddAccount, onAccounts, onExport, onReviewPending, onSetBudget, onViewActivity }: {
  ownerUserId: string;
  onAddExpense?: () => void;
  onAddAccount?: () => void;
  onAccounts?: () => void;
  onExport?: () => void;
  onReviewPending?: () => void;
  onSetBudget?: () => void;
  onViewActivity?: () => void;
}) {
  const [transactions, setTransactions] = useState<TransactionInput[] | null>(null);
  const [balanceMinor, setBalanceMinor] = useState(0);
  const [range, setRange] = useState<Range>('1M');
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    let active = true;
    void openDatabase().then(async (db) => {
      const [next, opening, delta] = await Promise.all([
        listTransactions(db, ownerUserId),
        accountOpeningTotal(db, ownerUserId as never, 'INR'),
        confirmedBalanceDelta(db, ownerUserId, 'INR'),
      ]);
      if (active) {
        setTransactions(next);
        setBalanceMinor(opening + delta);
      }
    }).catch(() => { if (active) setTransactions([]); });
    return () => { active = false; };
  }, [ownerUserId]);

  const confirmed = useMemo(() => (transactions ?? []).filter((item) => item.status === 'confirmed'), [transactions]);
  const pending = useMemo(() => (transactions ?? []).filter((item) => item.status === 'pending'), [transactions]);
  const chartValues = useMemo(() => {
    const now = new Date();
    const count = range === '1D' ? 8 : range === '1W' ? 7 : range === '1M' ? 8 : range === '3M' ? 12 : 12;
    const start = new Date(now);
    if (range === '1D') start.setHours(now.getHours() - 21, 0, 0, 0);
    else if (range === '1W') start.setDate(now.getDate() - 6);
    else if (range === '1M') start.setDate(now.getDate() - 27);
    else if (range === '3M') start.setDate(now.getDate() - 77);
    else start.setMonth(now.getMonth() - 11, 1);
    const step = range === '1D' ? 3 * 60 * 60 * 1000 : range === '1W' ? 24 * 60 * 60 * 1000 : range === '1M' ? 4 * 24 * 60 * 60 * 1000 : range === '3M' ? 7 * 24 * 60 * 60 * 1000 : null;
    return Array.from({ length: count }, (_, index) => {
      const bucketStart = range === '1Y' ? new Date(start.getFullYear(), start.getMonth() + index, 1) : new Date(start.getTime() + index * (step ?? 0));
      const bucketEnd = range === '1Y' ? new Date(start.getFullYear(), start.getMonth() + index + 1, 1) : new Date(bucketStart.getTime() + (step ?? 0));
      return confirmed.filter((item) => {
        if (item.type !== 'expense' || item.money.currency !== 'INR') return false;
        const occurredAt = new Date(item.occurredAt).getTime();
        return occurredAt >= bucketStart.getTime() && occurredAt < bucketEnd.getTime();
      }).reduce((sum, item) => sum + item.money.amountMinor, 0);
    });
  }, [confirmed, range]);
  const monthlySpend = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 2 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (1 - index), 1);
      const key = monthKey(date);
      return confirmed.filter((item) => item.type === 'expense' && item.money.currency === 'INR' && monthKey(new Date(item.occurredAt)) === key).reduce((sum, item) => sum + item.money.amountMinor, 0);
    });
  }, [confirmed]);
  const recent = confirmed.slice(0, 3);
  const spentThisMonth = monthlySpend[1] ?? 0;
  const spentLastMonth = monthlySpend[0] ?? 0;
  const trend = spentLastMonth > 0 ? Math.round(((spentThisMonth - spentLastMonth) / spentLastMonth) * 100) : null;

  if (!transactions) return <Screen><CenteredState loading title="Loading Scout" /></Screen>;

  return <Screen style={styles.screen}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>scout.</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Export your data" onPress={onExport} style={styles.bell}><Text style={styles.bellGlyph}>♧</Text></Pressable>
      </View>

      <View style={styles.balanceBlock}>
        <View style={styles.balanceLabelRow}>
          <Text style={styles.balanceLabel}>YOUR BALANCE</Text>
          <Pressable accessibilityRole="button" accessibilityLabel={showBalance ? 'Hide balance' : 'Show balance'} onPress={() => setShowBalance((value) => !value)}><Text style={styles.eye}>{showBalance ? '◉' : '◎'}</Text></Pressable>
        </View>
        <Text style={styles.balance}>{showBalance ? formatMoney({ amountMinor: balanceMinor as never, currency: 'INR' }) : '₹ ••••••'}</Text>
        <Text style={[styles.trend, trend !== null && trend <= 0 ? styles.positive : styles.muted]}>{trend === null ? 'Confirmed balance' : `${trend > 0 ? '↑' : '↓'} ${Math.abs(trend)}% spending vs last month`}</Text>
      </View>

      <View style={styles.chartCard}>
        <TrendChart values={chartValues} />
        <View style={styles.rangeRow}>{(['1D', '1W', '1M', '3M', '1Y'] as const).map((value) => <Pressable key={value} onPress={() => setRange(value)} style={[styles.range, range === value && styles.activeRange]}><Text style={[styles.rangeText, range === value && styles.activeRangeText]}>{value}</Text></Pressable>)}</View>
      </View>

      {pending.length > 0 ? <Pressable accessibilityRole="button" onPress={onReviewPending} style={styles.reviewCard}>
        <View style={styles.reviewIcon}><Text style={styles.reviewGlyph}>▣</Text></View>
        <View style={styles.reviewCopy}><Text style={styles.reviewTitle}>Review {pending.length} transaction{pending.length === 1 ? '' : 's'}</Text><Text style={styles.reviewDescription}>These expenses need your approval.</Text></View>
        <Text style={styles.arrow}>›</Text>
      </Pressable> : null}

      <Text style={styles.section}>Quick actions</Text>
      <View style={styles.actions}>
        <QuickAction glyph="＋" label="Add expense" onPress={onAddExpense} />
        <QuickAction glyph="▤" label="Set budget" onPress={onSetBudget} />
        <QuickAction glyph="◉" label="Accounts" onPress={onAccounts} />
        <QuickAction glyph="···" label="More" onPress={onExport} />
      </View>

      <View style={styles.sectionRow}><Text style={styles.section}>Recent activity</Text><Pressable onPress={onViewActivity}><Text style={styles.viewAll}>View all ›</Text></Pressable></View>
      {recent.length ? recent.map((transaction) => <Pressable key={transaction.id} onPress={onViewActivity} style={styles.transaction}>
        <View style={styles.transactionIcon}><Text style={styles.transactionGlyph}>{transaction.type === 'income' ? '↙' : transaction.type === 'transfer' ? '⇄' : '↗'}</Text></View>
        <View style={styles.transactionCopy}><Text style={styles.transactionName}>{transaction.categoryId ?? transaction.type}</Text><Text style={styles.transactionDate}>{new Date(transaction.occurredAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</Text></View>
        <Text style={[styles.transactionAmount, transaction.type === 'income' && styles.positive]}>{transaction.type === 'expense' ? '−' : transaction.type === 'income' ? '+' : ''}{formatMoney(transaction.money)}</Text>
      </Pressable>) : <Text style={styles.empty}>Your confirmed activity will appear here.</Text>}
      <View style={styles.footerActions}>
        <Pressable onPress={onAddAccount}><Text style={styles.footerLink}>＋ Add account</Text></Pressable>
        <Pressable onPress={onExport}><Text style={styles.footerLink}>Export data</Text></Pressable>
      </View>
    </ScrollView>
  </Screen>;
}

function QuickAction({ glyph, label, onPress }: { glyph: string; label: string; onPress?: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={styles.quickAction}>
    <View style={styles.quickIcon}><Text style={styles.quickGlyph}>{glyph}</Text></View>
    <Text style={styles.quickLabel}>{label}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 0 },
  content: { paddingBottom: 20 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 26 },
  wordmark: { color: colors.primaryText, fontSize: 22, fontWeight: '700', letterSpacing: -0.8 },
  bell: { alignItems: 'center', height: 38, justifyContent: 'center', width: 38 },
  bellGlyph: { color: colors.primaryText, fontSize: 21 },
  balanceBlock: { marginBottom: 12 },
  balanceLabelRow: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  balanceLabel: { color: colors.secondaryText, ...typography.label, letterSpacing: 0.7 },
  eye: { color: colors.secondaryText, fontSize: 15 },
  balance: { color: colors.primaryText, fontSize: 35, fontWeight: '600', letterSpacing: -1.2, lineHeight: 43, marginTop: 3 },
  trend: { ...typography.metadata, marginTop: 4 },
  positive: { color: colors.positive },
  muted: { color: colors.mutedText },
  chartCard: { marginBottom: 10, paddingTop: 8 },
  rangeRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 2, paddingHorizontal: 2 },
  range: { alignItems: 'center', borderRadius: radii.pill, minWidth: 42, paddingHorizontal: 10, paddingVertical: 5 },
  activeRange: { backgroundColor: colors.elevated },
  rangeText: { color: colors.mutedText, ...typography.metadata },
  activeRangeText: { color: colors.primaryText },
  reviewCard: { alignItems: 'center', backgroundColor: colors.elevated, borderColor: colors.border, borderRadius: 15, borderWidth: 1, flexDirection: 'row', marginBottom: 20, minHeight: 76, padding: 12 },
  reviewIcon: { alignItems: 'center', backgroundColor: '#292929', borderRadius: 12, height: 42, justifyContent: 'center', width: 42 },
  reviewGlyph: { color: colors.primaryText, fontSize: 19 },
  reviewCopy: { flex: 1, marginLeft: 12 },
  reviewTitle: { color: colors.primaryText, ...typography.body, fontSize: 14, fontWeight: '600' },
  reviewDescription: { color: colors.secondaryText, ...typography.metadata, marginTop: 2 },
  arrow: { color: colors.secondaryText, fontSize: 25, paddingHorizontal: 4 },
  section: { color: colors.primaryText, ...typography.section, fontSize: 17, marginBottom: 12, marginTop: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  quickAction: { alignItems: 'center', flex: 1 },
  quickIcon: { alignItems: 'center', backgroundColor: colors.elevated, borderRadius: 14, height: 48, justifyContent: 'center', width: 48 },
  quickGlyph: { color: colors.primaryText, fontSize: 22 },
  quickLabel: { color: colors.secondaryText, fontSize: 10, marginTop: 6, textAlign: 'center' },
  sectionRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  viewAll: { color: colors.secondaryText, ...typography.metadata },
  transaction: { alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', minHeight: 60 },
  transactionIcon: { alignItems: 'center', backgroundColor: colors.elevated, borderRadius: 22, height: 42, justifyContent: 'center', width: 42 },
  transactionGlyph: { color: colors.primaryText, fontSize: 18 },
  transactionCopy: { flex: 1, marginLeft: 11 },
  transactionName: { color: colors.primaryText, ...typography.body, fontSize: 14, textTransform: 'capitalize' },
  transactionDate: { color: colors.mutedText, ...typography.metadata, marginTop: 2 },
  transactionAmount: { color: colors.primaryText, ...typography.body, fontSize: 14 },
  empty: { color: colors.mutedText, ...typography.metadata, paddingVertical: 18 },
  footerActions: { flexDirection: 'row', gap: 20, marginTop: 16 },
  footerLink: { color: colors.mutedText, ...typography.metadata },
});
