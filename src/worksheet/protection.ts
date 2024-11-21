import { WorksheetState, WorksheetProtection } from './types';

export function protect(state: WorksheetState, options: WorksheetProtection = {}): WorksheetState {
  const newState = { ...state };
  newState.sheet['!protect'] = options;
  return newState;
}

export function unprotect(state: WorksheetState): WorksheetState {
  const newState = { ...state };
  delete newState.sheet['!protect'];
  return newState;
}

export function isProtected(state: WorksheetState): boolean {
  return !!state.sheet['!protect'];
}