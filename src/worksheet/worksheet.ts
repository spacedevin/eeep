import { WorksheetState, CellState } from '../../spec/Worksheet';
import { CellStyle } from '../interfaces/cellstyle';
import { PageSetup } from '../interfaces/pagesetup';

export function createWorksheet(name: string): WorksheetState {
  return {
    name,
    cells: new Map(),
    ranges: new Map(),
    protection: {
      isProtected: false
    },
    pageSetup: {
      margins: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
        header: 0.5,
        footer: 0.5
      }
    },
    view: {
      type: 'normal',
      showGridLines: true,
      showRowColHeaders: true,
      showRuler: true,
      zoom: 100
    }
  };
}

export function setCellValue(state: WorksheetState, cell: string, value: any): WorksheetState {
  const cells = new Map(state.cells);
  const cellState = cells.get(cell) || {};
  cells.set(cell, { ...cellState, value });
  return { ...state, cells };
}

export function getCellValue(state: WorksheetState, cell: string): any {
  return state.cells.get(cell)?.value;
}

export function setCellStyle(state: WorksheetState, cell: string, style: CellStyle): WorksheetState {
  const cells = new Map(state.cells);
  const cellState = cells.get(cell) || {};
  cells.set(cell, { ...cellState, style });
  return { ...state, cells };
}

export function setPageSetup(state: WorksheetState, setup: Partial<PageSetup>): WorksheetState {
  return {
    ...state,
    pageSetup: {
      ...state.pageSetup,
      ...setup
    }
  };
}

export function protect(state: WorksheetState): WorksheetState {
  return {
    ...state,
    protection: {
      ...state.protection,
      isProtected: true
    }
  };
}

export function unprotect(state: WorksheetState): WorksheetState {
  return {
    ...state,
    protection: {
      ...state.protection,
      isProtected: false
    }
  };
}

export function isProtected(state: WorksheetState): boolean {
  return state.protection.isProtected;
}

export function hide(state: WorksheetState): WorksheetState {
  return {
    ...state,
    view: {
      ...state.view,
      type: 'normal',
      showGridLines: false,
      showRowColHeaders: false,
      showRuler: false
    }
  };
}

export function unhide(state: WorksheetState): WorksheetState {
  return {
    ...state,
    view: {
      ...state.view,
      type: 'normal',
      showGridLines: true,
      showRowColHeaders: true,
      showRuler: true
    }
  };
}

export function isHidden(state: WorksheetState): boolean {
  return !state.view.showGridLines && !state.view.showRowColHeaders && !state.view.showRuler;
}

export function mergeCells(state: WorksheetState, range: string): WorksheetState {
  const [start, end] = range.split(':');
  const ranges = new Map(state.ranges);
  
  const startMatch = start.match(/[A-Z]+/);
  const endMatch = end.match(/[A-Z]+/);
  
  if (!startMatch || !endMatch) {
    throw new Error('Invalid range format');
  }
  
  ranges.set(range, {
    cells: [],
    merges: [{
      start: {
        row: parseInt(start.match(/\d+/)?.[0] || '1'),
        col: startMatch[0].charCodeAt(0) - 65
      },
      end: {
        row: parseInt(end.match(/\d+/)?.[0] || '1'),
        col: endMatch[0].charCodeAt(0) - 65
      }
    }]
  });
  return { ...state, ranges };
}

export function copyWorksheet(state: WorksheetState): WorksheetState {
  return {
    ...state,
    name: `${state.name} (Copy)`,
    cells: new Map(state.cells),
    ranges: new Map(state.ranges)
  };
}

export function clearWorksheet(state: WorksheetState): WorksheetState {
  return {
    ...state,
    cells: new Map(),
    ranges: new Map()
  };
}