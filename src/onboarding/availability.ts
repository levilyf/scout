export interface UsernameAvailability {
  check(username: string): Promise<boolean>;
}

export const testUsernameAvailability: UsernameAvailability = {
  async check(username) {
    return username.toLowerCase() !== 'scout';
  },
};
