import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radii, sizes, spacing, typography } from '../design/tokens';
import { tabLabels, tabs, type Tab } from './routes';
import { Screen } from '../ui/primitives';

export function NavigationShell({ activeTab = 'home', onTabChange }: { activeTab?: Tab; onTabChange?: (tab: Tab) => void }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.wordmark}>SCOUT</Text>
        <Text style={styles.title}>{tabLabels[activeTab]}</Text>
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
              onPress={() => onTabChange?.(tab)}
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
});
