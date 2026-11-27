export type OnboardingProfile = {
  displayName: string;
  username: string;
  currency: string;
  privacyAcknowledged: boolean;
};

export type OnboardingStep = 'profile' | 'username' | 'region' | 'privacy' | 'complete';

export const onboardingSteps: OnboardingStep[] = ['profile', 'username', 'region', 'privacy', 'complete'];
