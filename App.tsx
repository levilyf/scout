import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { AuthScreen } from './src/auth/AuthScreen';
import { RecoveryScreen } from './src/auth/RecoveryScreen';
import { OnboardingScreen } from './src/onboarding/OnboardingScreen';
import { ManualTransactionScreen } from './src/finance/ManualTransactionScreen';
import { ActivityScreen } from './src/finance/ActivityScreen';
import { HomeScreen } from './src/finance/HomeScreen';
import { TransactionDetailScreen } from './src/finance/TransactionDetailScreen';
import { EditTransactionScreen } from './src/finance/EditTransactionScreen';
import { AccountScreen } from './src/finance/AccountScreen';
import { AccountsScreen } from './src/finance/AccountsScreen';
import { ExportScreen } from './src/finance/ExportScreen';
import { EditBudgetScreen } from './src/finance/EditBudgetScreen';
import type { StoredBudget } from './src/database/budgets';
import { deleteBudget, updateBudget } from './src/database/budgets';
import { BudgetScreen } from './src/finance/BudgetScreen';
import { BudgetsScreen } from './src/finance/BudgetsScreen';
import { createBudget } from './src/database/budgets';
import { deleteTransaction, updateTransaction } from './src/database/transactions';
import type { TransactionInput } from './src/domain/transactions';
import { insertTransaction } from './src/database/transactions';
import { createAccount, listAccounts } from './src/database/accounts';
import { asEntityId } from './src/domain/types';
import { openDatabase } from './src/database/client';
import { loadOnboarding, saveOnboarding, type OnboardingRecord } from './src/onboarding/persistence';
import { guardRoute } from './src/auth/routeGuard';
import { createSessionManager } from './src/auth/sessionManager';
import { secureSessionStore } from './src/auth/secureSession';
import type { AuthSession } from './src/auth/contracts';
import { NavigationShell } from './src/navigation/NavigationShell';
import { ProfileScreen } from './src/profile/ProfileScreen';
import { AccountSettingsScreen } from './src/profile/AccountSettingsScreen';
import { SupportScreen } from './src/profile/SupportScreen';
import { SocialFeedScreen } from './src/social/SocialFeedScreen';
import type { Tab } from './src/navigation/routes';

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [accountSettings, setAccountSettings] = useState(false);
  const [support, setSupport] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [recovery, setRecovery] = useState(false);
  const [addExpense, setAddExpense] = useState(false);
  const [addAccount, setAddAccount] = useState(false);
  const [accounts, setAccounts] = useState(false);
  const [exportData, setExportData] = useState(false);
  const [budgets, setBudgets] = useState(false);
  const [budgetList, setBudgetList] = useState(false);
  const [budgetRefreshKey, setBudgetRefreshKey] = useState(0);
  const [selectedBudget, setSelectedBudget] = useState<StoredBudget | null>(null);
  const [activity, setActivity] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionInput | null>(null);
  const [editingTransaction, setEditingTransaction] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [initialProfile, setInitialProfile] = useState<Partial<Omit<OnboardingRecord, 'accountName'>> & { accountName?: string } | undefined>();
  const [loading, setLoading] = useState(true);
  const [manager] = useState(() => createSessionManager(secureSessionStore, setSession));

  useEffect(() => {
    void manager.hydrate().then(async (nextSession) => {
      if (nextSession) {
        const profile = await loadOnboarding(await openDatabase(), nextSession.user.id);
        setInitialProfile(profile ? { ...profile, accountName: profile.accountName ?? '' } : undefined);
        setOnboarded(Boolean(profile));
      }
    }).finally(() => setLoading(false));
  }, [manager]);
  const route = guardRoute(session, loading);

  return (
    <>
      {route.screen === 'loading' ? null : route.screen !== 'protected' ? recovery ? <RecoveryScreen onBack={() => setRecovery(false)} /> : <AuthScreen mode={authMode} onForgotPassword={() => setRecovery(true)} onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} onSuccess={(nextSession) => { setOnboarded(false); void manager.set(nextSession); }} /> : !onboarded ? <OnboardingScreen initialProfile={initialProfile} onComplete={(profile) => void openDatabase().then((db) => saveOnboarding(db, { ...profile, ownerUserId: route.session.user.id, accountName: profile.accountName || null })).then(() => setOnboarded(true))} /> : accountSettings ? <AccountSettingsScreen onBack={() => setAccountSettings(false)} onExport={() => { setAccountSettings(false); setExportData(true); }} onSignOut={() => { setOnboarded(false); setInitialProfile(undefined); void manager.clear(); }} /> : support ? <SupportScreen onBack={() => setSupport(false)} /> : budgetList ? selectedBudget ? <EditBudgetScreen budget={selectedBudget} onBack={() => setSelectedBudget(null)} onDelete={() => void openDatabase().then((db) => deleteBudget(db, route.session.user.id, selectedBudget.id)).then(() => { setSelectedBudget(null); setBudgetRefreshKey((value) => value + 1); })} onSave={(updated) => void openDatabase().then((db) => updateBudget(db, route.session.user.id, updated)).then(() => { setSelectedBudget(null); setBudgetRefreshKey((value) => value + 1); })} /> : <BudgetsScreen key={budgetRefreshKey} onBack={() => setBudgetList(false)} onSelect={setSelectedBudget} ownerUserId={route.session.user.id} /> : budgets ? <BudgetScreen onSave={(input) => void openDatabase().then((db) => createBudget(db, { id: asEntityId(`budget-${Date.now()}`), ownerUserId: asEntityId(route.session.user.id), name: input.name, amountMinor: input.limitMinor, currency: input.currency, period: 'monthly' })).then(() => setBudgets(false))} /> : exportData ? <ExportScreen onBack={() => setExportData(false)} ownerUserId={route.session.user.id} /> : accounts ? <AccountsScreen onBack={() => setAccounts(false)} ownerUserId={route.session.user.id} /> : addAccount ? <AccountScreen onSave={(input) => void openDatabase().then((db) => createAccount(db, { id: asEntityId(`account-${Date.now()}`), ownerUserId: asEntityId(route.session.user.id), ...input })).then(() => setAddAccount(false))} /> : activity ? selectedTransaction && editingTransaction ? <EditTransactionScreen onBack={() => setEditingTransaction(false)} onSave={(updated) => void openDatabase().then((db) => updateTransaction(db, route.session.user.id, updated)).then(() => { setSelectedTransaction(updated); setEditingTransaction(false); })} transaction={selectedTransaction} /> : selectedTransaction ? <TransactionDetailScreen onBack={() => setSelectedTransaction(null)} onDelete={() => void openDatabase().then((db) => deleteTransaction(db, route.session.user.id, selectedTransaction.id, selectedTransaction.status)).then(() => { setSelectedTransaction(null); setActivity(true); })} onEdit={() => setEditingTransaction(true)} transaction={selectedTransaction} /> : <ActivityScreen key={refreshKey} onBack={() => setActivity(false)} onSelect={setSelectedTransaction} ownerUserId={route.session.user.id} /> : addExpense ? <ManualTransactionScreen onSubmit={(input) => void openDatabase().then(async (db) => { const owner = asEntityId(route.session.user.id); const accounts = await listAccounts(db, owner); const account = accounts[0] ?? await createAccount(db, { id: asEntityId(`manual-${owner}`), ownerUserId: owner, name: 'Manual account', currency: input.currency }); await insertTransaction(db, { id: `tx-${Date.now()}`, ownerUserId: route.session.user.id, accountId: account.id, type: input.type, status: 'confirmed', money: { amountMinor: input.amountMinor as never, currency: input.currency }, occurredAt: new Date().toISOString(), idempotencyKey: `manual-${Date.now()}` }); }).then(() => { setAddExpense(false); setRefreshKey((value) => value + 1); })} /> : <NavigationShell activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); if (tab === 'activity') setActivity(true); if (tab === 'budgets') setBudgetList(true); }} socialContent={<SocialFeedScreen />} profileContent={<ProfileScreen onOpen={(destination) => { if (destination === 'account') setAccountSettings(true); if (destination === 'support') setSupport(true); }} />} homeContent={<HomeScreen key={refreshKey} onExport={() => setExportData(true)} onAccounts={() => setAccounts(true)} onAddAccount={() => setAddAccount(true)} onAddExpense={() => setAddExpense(true)} ownerUserId={route.session.user.id} />} onBudgets={() => setBudgetList(true)} onActivity={() => setActivity(true)} onAddExpense={() => setAddExpense(true)} onSignOut={() => { setOnboarded(false); setInitialProfile(undefined); void manager.clear(); }} />}
      <StatusBar style="light" />
    </>
  );
}
