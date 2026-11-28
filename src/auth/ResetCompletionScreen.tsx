import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { PrimaryButton, Screen } from '../ui/primitives';

export function ResetCompletionScreen({ onBack }: { onBack?: () => void }) {
  return (
    <Screen>
      <View style={styles.content}>
        <Text style={styles.title}>Check your email</Text>
        <Text style={styles.description}>Use the reset link to choose a new password, then return to Scout.</Text>
        <PrimaryButton onPress={onBack}>Back to login</PrimaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', gap: spacing.sm },
  title: { color: colors.primaryText, ...typography.title },
  description: { color: colors.secondaryText, ...typography.body, marginBottom: spacing.md },
});
