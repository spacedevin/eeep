import { parseExcelFile, validateExcelFile, getExcelSheetNames, getExcelSheetRange } from '../../../external/filesources/excel';
import { createFileSource, addFileSource } from '../../../external';
import { TransformationError } from '../../../external/errors';
import { read, utils } from 'xlsx';

describe('Excel File Parser', () => {
  const createTestWorkbook = () => {
    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet([
      ['Name', 'Age', 'City'],
      ['John', 30, 'New York'],
      ['Jane', 25, 'London']
    ]);
    utils.book_append_sheet(wb, ws, 'Sheet1');
    return wb;
  };

  test('parses Excel file with headers', () => {
    let state = createFileSource('xlsx');
    state = addFileSource(state, 'test', 'data.xlsx', 'xlsx', {
      hasHeader: true
    });

    const workbook = createTestWorkbook();
    const content = Buffer.from('dummy'); // Mock buffer

    // Mock xlsx.read
    (read as jest.Mock).mockReturnValue(workbook);

    const result = parseExcelFile(state, 'test', content);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(['John', 30, 'New York']);
  });

  test('parses Excel file without headers', () => {
    let state = createFileSource('xlsx');
    state = addFileSource(state, 'test', 'data.xlsx', 'xlsx', {
      hasHeader: false
    });

    const workbook = createTestWorkbook();
    const content = Buffer.from('dummy');

    (read as jest.Mock).mockReturnValue(workbook);

    const result = parseExcelFile(state, 'test', content);
    expect(result).toHaveLength(3);
  });

  test('validates Excel workbook', () => {
    const workbook = createTestWorkbook();
    expect(validateExcelFile(workbook)).toBe(true);

    const invalidWorkbook = { SheetNames: [] };
    expect(validateExcelFile(invalidWorkbook as any)).toBe(false);
  });

  test('gets sheet names', () => {
    const workbook = createTestWorkbook();
    const sheets = getExcelSheetNames(workbook);
    expect(sheets).toEqual(['Sheet1']);
  });

  test('gets sheet range', () => {
    const workbook = createTestWorkbook();
    const range = getExcelSheetRange(workbook, 'Sheet1');
    expect(range).toBeDefined();
  });

  test('handles invalid source', () => {
    const state = createFileSource('xlsx');
    const content = Buffer.from('dummy');
    expect(() => parseExcelFile(state, 'invalid', content))
      .toThrow(TransformationError);
  });
});
