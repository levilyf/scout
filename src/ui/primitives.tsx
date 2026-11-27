import type { PropsWithChildren, ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  type ViewStyle,
  View,
} from 'react-native';
import { colors, radii, sizes, spacing, typography } from '../design/tokens';

export function Screen({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

export function Label({ children }: PropsWithChildren) {
  return <Text style={styles.label}>{children}</Text>;
}

export function PrimaryButton({
  children,
  onPress,
  disabled = false,
}: PropsWithChildren<{ onPress?: () => void; disabled?: boolean }>) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed, disabled && styles.disabled]}
    >
      <Text style={styles.primaryButtonText}>{children}</Text>
    </Pressable>
  );
}

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={styles.fieldGroup}>
      <Label>{label}</Label>
      <TextInput
        {...props}
        accessibilityLabel={props.accessibilityLabel ?? label}
        placeholderTextColor={colors.mutedText}
        style={styles.field}
      />
    </View>
  );
}

export function Card({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Divider() {
  return <View accessibilityRole="none" style={styles.divider} />;
}

export function IconButton({
  label,
  children,
  onPress,
}: PropsWithChildren<{ label: string; onPress?: () => void }>) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

export function CenteredState({
  title,
  description,
  action,
  loading = false,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  loading?: boolean;
}) {
  return (
    <View style={styles.centeredState}>
      {loading ? <ActivityIndicator color={colors.primaryText} /> : null}
      <Text style={styles.stateTitle}>{title}</Text>
      {description ? <Text style={styles.stateDescription}>{description}</Text> : null}
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  label: { color: colors.secondaryText, ...typography.label, marginBottom: spacing.xs },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primaryText,
    borderRadius: radii.md,
    justifyContent: 'center',
    minHeight: sizes.touchTarget,
    paddingHorizontal: spacing.md,
  },
  primaryButtonText: { color: colors.background, ...typography.button },
  pressed: { opacity: 0.72 },
  disabled: { opacity: 0.4 },
  fieldGroup: { marginBottom: spacing.md },
  field: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.primaryText,
    ...typography.body,
    minHeight: sizes.fieldHeight,
    paddingHorizontal: spacing.md,
  },
  card: {
    backgroundColor: colors.elevated,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.md,
  },
  divider: { backgroundColor: colors.border, height: 1, width: '100%' },
  iconButton: {
    alignItems: 'center',
    backgroundColor: colors.elevated,
    borderRadius: radii.sm,
    height: sizes.touchTarget,
    justifyContent: 'center',
    width: sizes.touchTarget,
  },
  centeredState: { alignItems: 'center', flex: 1, gap: spacing.sm, justifyContent: 'center' },
  stateTitle: { color: colors.primaryText, ...typography.section, textAlign: 'center' },
  stateDescription: { color: colors.secondaryText, ...typography.body, textAlign: 'center' },
});
