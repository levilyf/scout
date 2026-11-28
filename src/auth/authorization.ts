export type TokenClaims = { sub: string; exp: number; iss: string; aud?: string | string[] };

export function assertAuthorizedUser(claims: TokenClaims, ownerUserId: string, now = Math.floor(Date.now() / 1000)): void {
  if (claims.sub !== ownerUserId) throw new Error('Unauthorized owner');
  if (claims.exp <= now) throw new Error('Expired token');
}

export function hasAudience(claims: TokenClaims, expected: string): boolean {
  return Array.isArray(claims.aud) ? claims.aud.includes(expected) : claims.aud === expected;
}
