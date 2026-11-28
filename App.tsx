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

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [recovery, setRecovery] = useState(false);
  const [addExpense, setAddExpense] = useState(false);
  const [addAccount, setAddAccount] = useState(false);
  const [activity, setActivity] = useState(false);
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
      {route.screen === 'loading' ? null : route.screen !== 'protected' ? recovery ? <RecoveryScreen onBack={() => setRecovery(false)} /> : <AuthScreen mode={authMode} onForgotPassword={() => setRecovery(true)} onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} onSuccess={(nextSession) => { setOnboarded(false); void manager.set(nextSession); }} /> : !onboarded ? <OnboardingScreen initialProfile={initialProfile} onComplete={(profile) => void openDatabase().then((db) => saveOnboarding(db, { ...profile, ownerUserId: route.session.user.id, accountName: profile.accountName || null })).then(() => setOnboarded(true))} /> : addAccount ? <AccountScreen onSave={(input) => void openDatabase().then((db) => createAccount(db, { id: asEntityId(`account-${Date.now()}`), ownerUserId: asEntityId(route.session.user.id), ...input })).then(() => setAddAccount(false))} /> : activity ? selectedTransaction && editingTransaction ? <EditTransactionScreen onBack={() => setEditingTransaction(false)} onSave={(updated) => void openDatabase().then((db) => updateTransaction(db, route.session.user.id, updated)).then(() => { setSelectedTransaction(updated); setEditingTransaction(false); })} transaction={selectedTransaction} /> : selectedTransaction ? <TransactionDetailScreen onBack={() => setSelectedTransaction(null)} onDelete={() => void openDatabase().then((db) => deleteTransaction(db, route.session.user.id, selectedTransaction.id, selectedTransaction.status)).then(() => { setSelectedTransaction(null); setActivity(true); })} onEdit={() => setEditingTransaction(true)} transaction={selectedTransaction} /> : <ActivityScreen onBack={() => setActivity(false)} onSelect={setSelectedTransaction} ownerUserId={route.session.user.id} /> : addExpense ? <ManualTransactionScreen onSubmit={(input) => void openDatabase().then(async (db) => { const owner = asEntityId(route.session.user.id); const accounts = await listAccounts(db, owner); const account = accounts[0] ?? await createAccount(db, { id: asEntityId(`manual-${owner}`), ownerUserId: owner, name: 'Manual account', currency: input.currency }); await insertTransaction(db, { id: `tx-${Date.now()}`, ownerUserId: route.session.user.id, accountId: account.id, type: input.type, status: 'confirmed', money: { amountMinor: input.amountMinor as never, currency: input.currency }, occurredAt: new Date().toISOString(), idempotencyKey: `manual-${Date.now()}` }); }).then(() => setAddExpense(false))} /> : <NavigationShell homeContent={<HomeScreen onAddAccount={() => setAddAccount(true)} onAddExpense={() => setAddExpense(true)} ownerUserId={route.session.user.id} />} onActivity={() => setActivity(true)} onAddExpense={() => setAddExpense(true)} onSignOut={() => { setOnboarded(false); setInitialProfile(undefined); void manager.clear(); }} />}
      <StatusBar style="light" />
    </>
  );
}
