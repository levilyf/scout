import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radii, spacing, typography } from '../design/tokens';
import { formatMoney } from '../domain/money';
import { matchesTransactionSearch, type TransactionInput } from '../domain/transactions';
import { openDatabase } from '../database/client';
import { listTransactions } from '../database/transactions';
import { CenteredState, Screen } from '../ui/primitives';

type Filter = 'all' | 'expense' | 'income' | 'transfer';

function transactionGlyph(transaction: TransactionInput) {
  if (transaction.type === 'income') return '↙';
  if (transaction.type === 'transfer') return '⇄';
  const category = transaction.categoryId?.toLowerCase() ?? '';
  if (category.includes('food')) return '◒';
  if (category.includes('shop')) return '▣';
  if (category.includes('travel')) return '⌁';
  return '↗';
}

export function ActivityScreen({ ownerUserId, onBack, onSelect }: { ownerUserId: string; onBack?: () => void; onSelect?: (transaction: TransactionInput) => void }) {
  const [transactions, setTransactions] = useState<TransactionInput[] | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [descending, setDescending] = useState(true);

  useEffect(() => {
    let active = true;
    void openDatabase().then((db) => listTransactions(db, ownerUserId)).then((items) => { if (active) setTransactions(items); }).catch(() => { if (active) setTransactions([]); });
    return () => { active = false; };
  }, [ownerUserId]);

  const visible = useMemo(() => (transactions ?? [])
    .filter((transaction) => (filter === 'all' || transaction.type === filter) && matchesTransactionSearch(transaction, query))
    .sort((a, b) => descending ? b.occurredAt.localeCompare(a.occurredAt) : a.occurredAt.localeCompare(b.occurredAt)), [transactions, filter, query, descending]);

  const groups = useMemo(() => visible.reduce<Record<string, TransactionInput[]>>((result, transaction) => {
    const key = new Date(transaction.occurredAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    (result[key] ??= []).push(transaction);
    return result;
  }, {}), [visible]);

  if (!transactions) return <Screen><CenteredState loading title="Loading activity" /></Screen>;

  return <Screen style={styles.screen}>
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View><Text style={styles.title}>Activity</Text><Text style={styles.subtitle}>Your transactions, all in one place.</Text></View>
        <Pressable accessibilityRole="button" accessibilityLabel={descending ? 'Sort oldest first' : 'Sort newest first'} onPress={() => setDescending((value) => !value)} style={styles.sortButton}><Text style={styles.sortGlyph}>{descending ? '↓' : '↑'}</Text></Pressable>
      </View>
      <View style={styles.searchWrap}><Text style={styles.searchGlyph}>⌕</Text><TextInput accessibilityLabel="Search activity" placeholder="Search transactions" placeholderTextColor={colors.mutedText} onChangeText={setQuery} style={styles.search} value={query} /></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{(['all', 'expense', 'income', 'transfer'] as const).map((value) => <Pressable key={value} accessibilityRole="button" accessibilityState={{ selected: filter === value }} onPress={() => setFilter(value)} style={[styles.chip, filter === value && styles.selectedChip]}><Text style={[styles.chipText, filter === value && styles.selectedChipText]}>{value === 'all' ? 'All' : value === 'expense' ? 'Expenses' : value === 'income' ? 'Income' : 'Transfers'}</Text></Pressable>)}</ScrollView>
      {visible.length === 0 ? <CenteredState title={transactions.length ? 'No matching transactions' : 'No activity yet'} description={transactions.length ? 'Try another search or filter.' : 'Add your first transaction to start tracking.'} /> : <View style={styles.list}>{Object.entries(groups).map(([date, items]) => <View key={date}>
        <Text style={styles.group}>{date}</Text>
        {items.map((transaction) => <Pressable accessibilityRole="button" key={transaction.id} onPress={() => onSelect?.(transaction)} style={styles.row}>
          <View style={styles.transactionIcon}><Text style={styles.transactionGlyph}>{transactionGlyph(transaction)}</Text></View>
          <View style={styles.copy}><Text style={styles.name}>{transaction.categoryId ?? (transaction.type === 'income' ? 'Income' : transaction.type === 'transfer' ? 'Transfer' : 'Expense')}</Text><Text style={styles.metadata}>{new Date(transaction.occurredAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}{transaction.status === 'pending' ? '  ·  Pending review' : transaction.status === 'ignored' ? '  ·  Ignored' : ''}</Text></View>
          <Text style={[styles.amount, transaction.type === 'income' && styles.income]}>{transaction.type === 'expense' ? '−' : transaction.type === 'income' ? '+' : ''}{formatMoney(transaction.money)}</Text>
        </Pressable>)}
      </View>)}</View>}
    </ScrollView>
  </Screen>;
}

const styles = StyleSheet.create({
 screen:{paddingHorizontal:20,paddingTop:14,paddingBottom:0},
 content:{flexGrow:1,paddingBottom:20},
 header:{alignItems:'center',flexDirection:'row',justifyContent:'space-between',marginBottom:18},
 title:{color:colors.primaryText,...typography.section,fontSize:23},
 subtitle:{color:colors.mutedText,...typography.metadata,marginTop:4},
 sortButton:{alignItems:'center',backgroundColor:colors.elevated,borderColor:colors.border,borderRadius:20,borderWidth:1,height:38,justifyContent:'center',width:38},
 sortGlyph:{color:colors.primaryText,fontSize:20},
 searchWrap:{alignItems:'center',backgroundColor:colors.surface,borderColor:colors.border,borderRadius:12,borderWidth:1,flexDirection:'row',marginBottom:14,minHeight:46,paddingHorizontal:12},
 searchGlyph:{color:colors.mutedText,fontSize:22,marginRight:8},
 search:{color:colors.primaryText,...typography.body,flex:1,minHeight:44,paddingVertical:0},
 filters:{gap:8,paddingBottom:18},
 chip:{borderColor:colors.border,borderRadius:radii.pill,borderWidth:1,paddingHorizontal:14,paddingVertical:7},
 selectedChip:{backgroundColor:colors.primaryText,borderColor:colors.primaryText},
 chipText:{color:colors.secondaryText,...typography.metadata,textTransform:'capitalize'},
 selectedChipText:{color:colors.background,fontWeight:'600'},
 list:{gap:20},
 group:{color:colors.secondaryText,...typography.label,marginBottom:8},
 row:{alignItems:'center',borderBottomColor:colors.border,borderBottomWidth:StyleSheet.hairlineWidth,flexDirection:'row',minHeight:66,paddingVertical:10},
 transactionIcon:{alignItems:'center',backgroundColor:colors.elevated,borderRadius:22,height:42,justifyContent:'center',width:42},
 transactionGlyph:{color:colors.primaryText,fontSize:18},
 copy:{flex:1,marginLeft:12},
 name:{color:colors.primaryText,...typography.body,fontSize:14,textTransform:'capitalize'},
 metadata:{color:colors.mutedText,...typography.metadata,marginTop:3},
 amount:{color:colors.primaryText,...typography.body,fontSize:14,fontWeight:'500'},
 income:{color:colors.positive},
});
