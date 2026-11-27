export const colors = {
  background: '#000000',
  surface: '#0A0A0A',
  elevated: '#141414',
  primaryText: '#FFFFFF',
  secondaryText: '#929292',
  mutedText: '#6F6F6F',
  border: '#292929',
  positive: '#7FAF8A',
  danger: '#C87878',
  googleBlue: '#4285F4',
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const typography = {
  wordmark: { fontSize: 20, lineHeight: 24, fontWeight: '600' as const, letterSpacing: 1.2 },
  title: { fontSize: 32, lineHeight: 38, fontWeight: '600' as const },
  section: { fontSize: 20, lineHeight: 24, fontWeight: '600' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '500' as const, letterSpacing: 0.4 },
  metadata: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
  amount: { fontSize: 36, lineHeight: 42, fontWeight: '600' as const },
  button: { fontSize: 16, lineHeight: 20, fontWeight: '600' as const },
} as const;

export const sizes = {
  icon: 24,
  iconSmall: 18,
  touchTarget: 48,
  fieldHeight: 56,
  avatar: 48,
} as const;

export const elevation = {
  none: 0,
  subtle: 2,
} as const;

export const motion = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;

export const theme = {
  colors,
  spacing,
  radii,
  typography,
  sizes,
  elevation,
  motion,
} as const;

export type Theme = typeof theme;
