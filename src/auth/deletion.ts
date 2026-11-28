export type DeletionState = 'requested' | 'reauth-required' | 'queued' | 'completed' | 'failed';

export function requestDeletion(reauthenticated: boolean): DeletionState {
  return reauthenticated ? 'queued' : 'reauth-required';
}

export function canUseProtectedData(state: DeletionState): boolean {
  return state !== 'completed' && state !== 'queued';
}
