import { CellStyle } from '../src/interfaces/cellstyle';
import { PageSetup } from '../src/interfaces/pagesetup';

export interface CellState {
  value?: any;
  formula?: string;
  style?: CellStyle;
  comment?: string;
  hyperlink?: string;
  validation?: any;
}

export interface RangeState {
  cells: CellState[][];
  merges?: Array<{
    start: { row: number; col: number };
    end: { row: number; col: number };
  }>;
  style?: CellStyle;
  validation?: any;
}

export interface WorksheetState {
  name: string;
  cells: Map<string, CellState>;
  ranges: Map<string, RangeState>;
  protection: {
    isProtected: boolean;
    password?: string;
    allowEditRanges?: Array<{
      name: string;
      range: string;
      password?: string;
    }>;
  };
  pageSetup: PageSetup & {
    margins?: {
      top: number;
      right: number;
      bottom: number;
      left: number;
      header: number;
      footer: number;
    };
    printArea?: string;
    printTitles?: {
      rows?: string;
      columns?: string;
    };
    pageBreaks?: {
      horizontal: number[];
      vertical: number[];
    };
  };
  view: {
    type: 'normal' | 'pageBreakPreview' | 'pageLayout';
    showGridLines: boolean;
    showRowColHeaders: boolean;
    showRuler: boolean;
    zoom: number;
  };
}