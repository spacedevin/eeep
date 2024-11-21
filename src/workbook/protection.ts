import { WorkbookState, WorkbookProtection } from './types';

export function protectWorkbook(state: WorkbookState, options: WorkbookProtection): WorkbookState {
  return {
    ...state,
    protection: {
      ...state.protection,
      ...options
    }
  };
}

export function unprotectWorkbook(state: WorkbookState): WorkbookState {
  return {
    ...state,
    protection: {}
  };
}

export function isWorkbookProtected(state: WorkbookState): boolean {
  return !!state.protection.password || !!state.protection.structure;
}