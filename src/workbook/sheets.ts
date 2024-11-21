import { WorkbookState } from './types';
import { WorksheetState } from '../worksheet/types';
import { createWorksheet } from '../worksheet/createworksheet';
import { utils } from 'xlsx';

export function addWorksheet(state: WorkbookState, name: string): WorkbookState {
  if (state.sheets.has(name)) {
    throw new Error(`Worksheet '${name}' already exists`);
  }

  const sheet = utils.aoa_to_sheet([]);
  const worksheetState = createWorksheet(name, sheet);

  return {
    ...state,
    sheets: new Map(state.sheets).set(name, worksheetState)
  };
}

export function getWorksheet(state: WorkbookState, name: string): WorksheetState | undefined {
  return state.sheets.get(name);
}

export function deleteWorksheet(state: WorkbookState, name: string): WorkbookState {
  const newSheets = new Map(state.sheets);
  const deleted = newSheets.delete(name);

  if (!deleted) {
    throw new Error(`Worksheet '${name}' not found`);
  }

  return {
    ...state,
    sheets: newSheets
  };
}

export function renameWorksheet(state: WorkbookState, oldName: string, newName: string): WorkbookState {
  if (!state.sheets.has(oldName)) {
    throw new Error(`Worksheet '${oldName}' not found`);
  }

  if (state.sheets.has(newName)) {
    throw new Error(`Worksheet '${newName}' already exists`);
  }

  const worksheet = state.sheets.get(oldName)!;
  const newWorksheet = {
    ...worksheet,
    name: newName
  };

  const newSheets = new Map(state.sheets);
  newSheets.delete(oldName);
  newSheets.set(newName, newWorksheet);

  return {
    ...state,
    sheets: newSheets
  };
}