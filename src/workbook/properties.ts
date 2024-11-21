import { WorkbookState, WorkbookProperties } from './types';

export function setWorkbookProperties(state: WorkbookState, properties: WorkbookProperties): WorkbookState {
  return {
    ...state,
    properties: {
      ...state.properties,
      ...properties,
      modified: new Date()
    }
  };
}

export function getWorkbookProperties(state: WorkbookState): WorkbookProperties {
  return { ...state.properties };
}