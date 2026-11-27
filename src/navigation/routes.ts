export const tabs = ['home', 'activity', 'social', 'budgets', 'profile'] as const;

export type Tab = (typeof tabs)[number];

export const tabLabels: Record<Tab, string> = {
  home: 'Home',
  activity: 'Activity',
  social: 'Social',
  budgets: 'Budgets',
  profile: 'Profile',
};

export type RootRoute =
  | { name: 'welcome' }
  | { name: 'login' }
  | { name: 'signup' }
  | { name: 'onboarding' }
  | { name: 'tab'; tab: Tab };
