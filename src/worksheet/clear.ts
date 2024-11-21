import { WorksheetState } from './types';
import { utils } from 'xlsx';

export function clearWorksheet(state: WorksheetState): WorksheetState {
  const newState = { ...state };
  newState.sheet = utils.aoa_to_sheet([]);
  newState.styles = new Map();
  return newState;
}