import { WorksheetCollection } from './worksheetcollection';
import { WorkBook, utils, write, read } from 'xlsx';

export class ExcelPackage {
  private workbook: WorkBook;
  private _worksheets: WorksheetCollection;

  constructor(template?: Buffer) {
    if (template) {
      this.workbook = read(template);
    } else {
      this.workbook = utils.book_new();
    }
    this._worksheets = new WorksheetCollection(this.workbook);
  }

  get worksheets(): WorksheetCollection {
    return this._worksheets;
  }

  saveAs(filename: string): Buffer {
    const buffer = write(this.workbook, { type: 'buffer', bookType: 'xlsx' });
    return buffer;
  }
}