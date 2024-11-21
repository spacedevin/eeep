import { WorkSheet } from 'xlsx';
import { WorksheetState } from './types';

export function createWorksheet(name: string, sheet: WorkSheet): WorksheetState {
  return {
    name,
    sheet,
    hidden: false,
    pageSetup: {},
    pageMargins: {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1,
      header: 0.5,
      footer: 0.5
    },
    styles: new Map()
  };
}