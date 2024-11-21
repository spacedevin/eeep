import { utils } from 'xlsx';
import { WorksheetState } from './types';
import { CellStyle } from '../interfaces/cellstyle';

export function setCellValue(state: WorksheetState, cell: string, value: any): WorksheetState {
  const newState = { ...state };
  utils.sheet_add_aoa(newState.sheet, [[value]], { origin: cell });
  return newState;
}

export function getCellValue(state: WorksheetState, cell: string): any {
  const cellRef = state.sheet[cell];
  return cellRef ? cellRef.v : undefined;
}

export function setCellStyle(state: WorksheetState, cell: string, style: CellStyle): WorksheetState {
  const newState = { ...state };
  if (!newState.sheet['!styles']) {
    newState.sheet['!styles'] = {};
  }
  newState.styles = new Map(state.styles);
  newState.styles.set(cell, style);
  newState.sheet['!styles'][cell] = style;
  return newState;
}

export function getCellStyle(state: WorksheetState, cell: string): CellStyle | undefined {
  return state.styles.get(cell);
}

export function mergeCells(state: WorksheetState, range: string): WorksheetState {
  const newState = { ...state };
  if (!newState.sheet['!merges']) {
    newState.sheet['!merges'] = [];
  }
  const [start, end] = range.split(':');
  const startCol = utils.decode_col(start.replace(/[0-9]/g, ''));
  const startRow = parseInt(start.replace(/[A-Z]/g, '')) - 1;
  const endCol = utils.decode_col(end.replace(/[0-9]/g, ''));
  const endRow = parseInt(end.replace(/[A-Z]/g, '')) - 1;
  
  newState.sheet['!merges'].push({
    s: { r: startRow, c: startCol },
    e: { r: endRow, c: endCol }
  });
  return newState;
}