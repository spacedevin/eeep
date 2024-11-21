import { WorkbookState, WorkbookProperties, WorkbookProtection } from '../../spec/workbook';

export function createWorkbook(): WorkbookState {
  return {
    sheets: new Map(),
    properties: {},
    protection: {},
    definedNames: new Map(),
    externalReferences: new Map()
  };
}

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

export function protectWorkbook(state: WorkbookState, protection: WorkbookProtection): WorkbookState {
  return {
    ...state,
    protection: {
      ...state.protection,
      ...protection,
      structure: protection.structure ?? false,
      windows: protection.windows ?? 'visible'
    }
  };
}

export function isWorkbookProtected(state: WorkbookState): boolean {
  return !!state.protection.password || !!state.protection.structure;
}