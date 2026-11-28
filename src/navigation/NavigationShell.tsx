import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';
import { colors, spacing, typography } from '../design/tokens';
import type { Tab } from './routes';
import { Screen } from '../ui/primitives';

const items: { key: Tab; label: string; glyph: string }[] = [
  { key: 'home', label: 'Home', glyph: '⌂' },
  { key: 'activity', label: 'Activity', glyph: '▤' },
  { key: 'social', label: 'Social', glyph: '♧' },
  { key: 'budgets', label: 'Budgets', glyph: '▣' },
  { key: 'profile', label: 'Profile', glyph: '●' },
];

export function NavigationShell({ activeTab = 'home', onTabChange, homeContent, socialContent, profileContent, budgetsContent, activityContent }: {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
  homeContent?: ReactNode;
  socialContent?: ReactNode;
  profileContent?: ReactNode;
  budgetsContent?: ReactNode;
  activityContent?: ReactNode;
}) {
  const content = activeTab === 'home' ? homeContent : activeTab === 'social' ? socialContent : activeTab === 'profile' ? profileContent : activeTab === 'budgets' ? budgetsContent : activityContent;
  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>{content}</View>
      <View accessibilityRole="tablist" style={styles.tabBar}>
        {items.map((item) => {
          const selected = item.key === activeTab;
          return <Pressable key={item.key} accessibilityRole="tab" accessibilityState={{ selected }} accessibilityLabel={item.label} onPress={() => onTabChange?.(item.key)} style={styles.tab}>
            <Text style={[styles.glyph, selected && styles.selected]}>{item.glyph}</Text>
            <Text style={[styles.label, selected && styles.selected]}>{item.label}</Text>
          </Pressable>;
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0 },
  content: { flex: 1 },
  tabBar: { alignItems: 'center', backgroundColor: colors.background, borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth, flexDirection: 'row', justifyContent: 'space-around', minHeight: 62, paddingBottom: 4, paddingTop: 5 },
  tab: { alignItems: 'center', flex: 1, gap: 2, justifyContent: 'center', minHeight: 52 },
  glyph: { color: colors.mutedText, fontSize: 20, lineHeight: 24 },
  label: { color: colors.mutedText, ...typography.metadata, fontSize: 10 },
  selected: { color: colors.primaryText },
});
