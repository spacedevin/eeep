import { ExcelPackage } from '../excelpackage';

describe('ExcelPackage', () => {
  let excelPackage: ExcelPackage;

  beforeEach(() => {
    excelPackage = new ExcelPackage();
  });

  test('creates new workbook', () => {
    expect(excelPackage.worksheets).toBeDefined();
  });

  test('can add worksheet', () => {
    const ws = excelPackage.worksheets.add('Sheet1');
    expect(ws).toBeDefined();
    expect(ws.getName()).toBe('Sheet1');
  });

  test('can write and read cell values', () => {
    const ws = excelPackage.worksheets.add('Sheet1');
    ws.setCellValue('A1', 'Hello');
    expect(ws.getCellValue('A1')).toBe('Hello');
  });
});