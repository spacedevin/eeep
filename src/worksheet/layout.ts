import { utils } from 'xlsx';
import { WorksheetState } from './types';

export function setColumnWidth(state: WorksheetState, col: string, width: number): WorksheetState {
  const newState = { ...state };
  if (!newState.sheet['!cols']) {
    newState.sheet['!cols'] = [];
  }
  const colIndex = utils.decode_col(col);
  newState.sheet['!cols'][colIndex] = { width };
  return newState;
}

export function setRowHeight(state: WorksheetState, row: number, height: number): WorksheetState {
  const newState = { ...state };
  if (!newState.sheet['!rows']) {
    newState.sheet['!rows'] = [];
  }
  newState.sheet['!rows'][row - 1] = { hpt: height };
  return newState;
}