import { WorkBook, utils } from 'xlsx';
import { Worksheet } from './worksheet';

export class WorksheetCollection {
  private workbook: WorkBook;
  private worksheets: Map<string, Worksheet>;

  constructor(workbook: WorkBook) {
    this.workbook = workbook;
    this.worksheets = new Map();
    
    // Load existing worksheets if any
    if (this.workbook.SheetNames) {
      this.workbook.SheetNames.forEach(name => {
        const sheet = this.workbook.Sheets[name];
        if (sheet) {
          this.worksheets.set(name, new Worksheet(name, sheet));
        }
      });
    }
  }

  add(name: string): Worksheet {
    if (this.worksheets.has(name)) {
      throw new Error(`Worksheet '${name}' already exists`);
    }

    const ws = utils.aoa_to_sheet([]);
    this.workbook.SheetNames.push(name);
    this.workbook.Sheets[name] = ws;

    const worksheet = new Worksheet(name, ws);
    this.worksheets.set(name, worksheet);
    return worksheet;
  }

  get(name: string): Worksheet | undefined {
    return this.worksheets.get(name);
  }

  delete(name: string): boolean {
    const index = this.workbook.SheetNames.indexOf(name);
    if (index > -1) {
      this.workbook.SheetNames.splice(index, 1);
      delete this.workbook.Sheets[name];
      return this.worksheets.delete(name);
    }
    return false;
  }

  copy(sourceName: string, targetName: string): Worksheet {
    const sourceSheet = this.get(sourceName);
    if (!sourceSheet) {
      throw new Error(`Worksheet '${sourceName}' not found`);
    }
    
    if (this.worksheets.has(targetName)) {
      throw new Error(`Worksheet '${targetName}' already exists`);
    }

    const copiedSheet = sourceSheet.copy();
    this.workbook.SheetNames.push(targetName);
    this.workbook.Sheets[targetName] = this.workbook.Sheets[sourceName];
    
    const worksheet = new Worksheet(targetName, this.workbook.Sheets[targetName]);
    this.worksheets.set(targetName, worksheet);
    return worksheet;
  }

  move(fromIndex: number, toIndex: number): void {
    if (fromIndex < 0 || fromIndex >= this.workbook.SheetNames.length ||
        toIndex < 0 || toIndex >= this.workbook.SheetNames.length) {
      throw new Error('Invalid index');
    }

    const sheetName = this.workbook.SheetNames[fromIndex];
    this.workbook.SheetNames.splice(fromIndex, 1);
    this.workbook.SheetNames.splice(toIndex, 0, sheetName);
  }
}