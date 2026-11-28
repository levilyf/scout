import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';
import { colors, radii, sizes, spacing, typography } from '../design/tokens';
import { tabLabels, tabs, type Tab } from './routes';
import { Screen } from '../ui/primitives';

export function NavigationShell({ activeTab = 'home', onTabChange, onSignOut, onAddExpense, onActivity, homeContent }: { activeTab?: Tab; onTabChange?: (tab: Tab) => void; onSignOut?: () => void; onAddExpense?: () => void; onActivity?: () => void; homeContent?: ReactNode }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.wordmark}>SCOUT</Text>
        {activeTab === 'home' && homeContent ? homeContent : <Text style={styles.title}>{tabLabels[activeTab]}</Text>}
        {activeTab === 'home' ? <Pressable accessibilityRole="button" onPress={onAddExpense} style={styles.quickAction}><Text style={styles.quickActionText}>＋ Add expense</Text></Pressable> : null}
        <Pressable accessibilityRole="button" onPress={onSignOut} style={styles.signOut}>
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </View>
      <View accessibilityRole="tablist" style={styles.tabBar}>
        {tabs.map((tab) => {
          const active = tab === activeTab;
          return (
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={tabLabels[tab]}
              key={tab}
              onPress={() => { onTabChange?.(tab); if (tab === 'activity') onActivity?.(); }}
              style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
            >
              <Text style={[styles.tabLabel, active && styles.activeLabel]}>{tabLabels[tab]}</Text>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingBottom: 0 },
  content: { flex: 1, gap: spacing.lg, paddingTop: spacing.md },
  wordmark: { color: colors.primaryText, ...typography.wordmark },
  title: { color: colors.primaryText, ...typography.title },
  tabBar: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: spacing.md,
    minHeight: sizes.touchTarget,
    padding: spacing.xxs,
  },
  tab: { alignItems: 'center', flex: 1, justifyContent: 'center', minHeight: sizes.touchTarget },
  tabLabel: { color: colors.mutedText, ...typography.metadata },
  activeLabel: { color: colors.primaryText },
  pressed: { opacity: 0.72 },
  quickAction: { alignSelf: 'flex-start', backgroundColor: colors.primaryText, borderRadius: radii.md, minHeight: sizes.touchTarget, justifyContent: 'center', paddingHorizontal: spacing.md },
  quickActionText: { color: colors.background, ...typography.button },
  signOut: { alignSelf: 'flex-start', minHeight: sizes.touchTarget, justifyContent: 'center' },
  signOutText: { color: colors.secondaryText, ...typography.body },
});
