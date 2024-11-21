import { WorkSheet } from 'xlsx';
import { PageSetup, PageMargins } from '../interfaces/pagesetup';
import { CellStyle } from '../interfaces/cellstyle';
import { PageBreakState } from '../../spec/PageBreaks';

export interface WorksheetState {
  name: string;
  sheet: WorkSheet;
  hidden: boolean;
  pageSetup: PageSetup;
  pageMargins: PageMargins;
  styles: Map<string, CellStyle>;
  pageBreaks?: PageBreakState;
}

export interface WorksheetProtection {
  password?: string;
  sheet?: boolean;
  objects?: boolean;
  scenarios?: boolean;
  formatCells?: boolean;
  formatColumns?: boolean;
  formatRows?: boolean;
  insertColumns?: boolean;
  insertRows?: boolean;
  insertHyperlinks?: boolean;
  deleteColumns?: boolean;
  deleteRows?: boolean;
  sort?: boolean;
  autoFilter?: boolean;
  pivotTables?: boolean;
}