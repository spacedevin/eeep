import { WorkbookState } from './types';

export function defineNamedRange(state: WorkbookState, name: string, reference: string): WorkbookState {
  if (state.definedNames.has(name)) {
    throw new Error(`Named range '${name}' already exists`);
  }

  return {
    ...state,
    definedNames: new Map(state.definedNames).set(name, reference)
  };
}

export function getNamedRange(state: WorkbookState, name: string): string | undefined {
  return state.definedNames.get(name);
}

export function deleteNamedRange(state: WorkbookState, name: string): WorkbookState {
  const newNames = new Map(state.definedNames);
  const deleted = newNames.delete(name);

  if (!deleted) {
    throw new Error(`Named range '${name}' not found`);
  }

  return {
    ...state,
    definedNames: newNames
  };
}