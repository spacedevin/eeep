import { WorksheetState } from './types';

export function hide(state: WorksheetState): WorksheetState {
  return {
    ...state,
    hidden: true
  };
}

export function unhide(state: WorksheetState): WorksheetState {
  return {
    ...state,
    hidden: false
  };
}

export function isHidden(state: WorksheetState): boolean {
  return state.hidden;
}