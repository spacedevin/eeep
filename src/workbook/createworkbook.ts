import { WorkbookState } from './types';

export function createWorkbook(): WorkbookState {
  return {
    sheets: new Map(),
    properties: {},
    protection: {},
    definedNames: new Map(),
    externalReferences: new Map()
  };
}