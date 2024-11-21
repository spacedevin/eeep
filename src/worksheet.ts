import { WorkSheet, utils } from 'xlsx';
import { PageSetup, PageMargins } from './interfaces/pagesetup';
import { CellStyle } from './interfaces/cellstyle';

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

export class Worksheet {
  private name: string;
  private sheet: WorkSheet;
  private hidden: boolean = false;
  private pageSetup: PageSetup = {};
  private pageMargins: PageMargins = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    header: 0.5,
    footer: 0.5
  };
  private styles: Map<string, CellStyle> = new Map();

  constructor(name: string, sheet: WorkSheet) {
    this.name = name;
    this.sheet = sheet;
  }

  getName(): string {
    return this.name;
  }

  setCellValue(cell: string, value: any): void {
    utils.sheet_add_aoa(this.sheet, [[value]], { origin: cell });
  }

  getCellValue(cell: string): any {
    const cellRef = this.sheet[cell];
    return cellRef ? cellRef.v : undefined;
  }

  setCellStyle(cell: string, style: CellStyle): void {
    if (!this.sheet['!styles']) {
      this.sheet['!styles'] = {};
    }
    this.styles.set(cell, style);
    this.sheet['!styles'][cell] = style;
  }

  getCellStyle(cell: string): CellStyle | undefined {
    return this.styles.get(cell);
  }

  setPageSetup(setup: PageSetup): void {
    this.pageSetup = { ...this.pageSetup, ...setup };
    this.sheet['!pageSetup'] = this.pageSetup;
  }

  getPageSetup(): PageSetup {
    return { ...this.pageSetup };
  }

  setPageMargins(margins: Partial<PageMargins>): void {
    this.pageMargins = { ...this.pageMargins, ...margins };
    this.sheet['!margins'] = this.pageMargins;
  }

  getPageMargins(): PageMargins {
    return { ...this.pageMargins };
  }

  setColumnWidth(col: string, width: number): void {
    if (!this.sheet['!cols']) {
      this.sheet['!cols'] = [];
    }
    const colIndex = utils.decode_col(col);
    this.sheet['!cols'][colIndex] = { width };
  }

  setRowHeight(row: number, height: number): void {
    if (!this.sheet['!rows']) {
      this.sheet['!rows'] = [];
    }
    this.sheet['!rows'][row - 1] = { hpt: height };
  }

  clear(): void {
    this.sheet = utils.aoa_to_sheet([]);
    this.styles.clear();
  }

  hide(): void {
    this.hidden = true;
  }

  unhide(): void {
    this.hidden = false;
  }

  isHidden(): boolean {
    return this.hidden;
  }

  mergeCells(range: string): void {
    if (!this.sheet['!merges']) {
      this.sheet['!merges'] = [];
    }
    const [start, end] = range.split(':');
    const startCol = utils.decode_col(start.replace(/[0-9]/g, ''));
    const startRow = parseInt(start.replace(/[A-Z]/g, '')) - 1;
    const endCol = utils.decode_col(end.replace(/[0-9]/g, ''));
    const endRow = parseInt(end.replace(/[A-Z]/g, '')) - 1;
    
    this.sheet['!merges'].push({
      s: { r: startRow, c: startCol },
      e: { r: endRow, c: endCol }
    });
  }

  protect(options: WorksheetProtection = {}): void {
    this.sheet['!protect'] = options;
  }

  unprotect(): void {
    delete this.sheet['!protect'];
  }

  isProtected(): boolean {
    return !!this.sheet['!protect'];
  }

  copy(): Worksheet {
    const newSheet = JSON.parse(JSON.stringify(this.sheet));
    const copiedWorksheet = new Worksheet(this.name + ' (Copy)', newSheet);
    
    // Copy styles
    if (this.sheet['!styles']) {
      copiedWorksheet.sheet['!styles'] = JSON.parse(JSON.stringify(this.sheet['!styles']));
      this.styles.forEach((style, cell) => {
        copiedWorksheet.styles.set(cell, JSON.parse(JSON.stringify(style)));
      });
    }
    
    // Copy page setup and margins
    if (this.sheet['!pageSetup']) {
      copiedWorksheet.pageSetup = { ...this.pageSetup };
      copiedWorksheet.sheet['!pageSetup'] = { ...this.sheet['!pageSetup'] };
    }
    
    if (this.sheet['!margins']) {
      copiedWorksheet.pageMargins = { ...this.pageMargins };
      copiedWorksheet.sheet['!margins'] = { ...this.sheet['!margins'] };
    }
    
    return copiedWorksheet;
  }
}