import { ExcelPackage } from '../excelpackage';
import { WorksheetCollection } from '../worksheetcollection';

describe('WorksheetCollection', () => {
  let excelPackage: ExcelPackage;
  let collection: WorksheetCollection;

  beforeEach(() => {
    excelPackage = new ExcelPackage();
    collection = excelPackage.worksheets;
  });

  describe('Basic Operations', () => {
    test('adds new worksheet', () => {
      const ws = collection.add('Sheet1');
      expect(ws.getName()).toBe('Sheet1');
      expect(collection.get('Sheet1')).toBeDefined();
    });

    test('throws error when adding duplicate worksheet', () => {
      collection.add('Sheet1');
      expect(() => collection.add('Sheet1')).toThrow();
    });

    test('gets existing worksheet', () => {
      const ws = collection.add('Sheet1');
      expect(collection.get('Sheet1')).toBe(ws);
    });

    test('returns undefined for non-existent worksheet', () => {
      expect(collection.get('NonExistent')).toBeUndefined();
    });

    test('deletes worksheet', () => {
      collection.add('Sheet1');
      expect(collection.delete('Sheet1')).toBe(true);
      expect(collection.get('Sheet1')).toBeUndefined();
    });

    test('returns false when deleting non-existent worksheet', () => {
      expect(collection.delete('NonExistent')).toBe(false);
    });
  });

  describe('Copy Operations', () => {
    test('copies worksheet', () => {
      const source = collection.add('Source');
      source.setCellValue('A1', 'Test');
      
      const copy = collection.copy('Source', 'Copy');
      expect(copy.getName()).toBe('Copy');
      expect(collection.get('Copy')).toBeDefined();
    });

    test('throws error when copying non-existent worksheet', () => {
      expect(() => collection.copy('NonExistent', 'Copy')).toThrow();
    });

    test('throws error when copying to existing name', () => {
      collection.add('Source');
      collection.add('Target');
      expect(() => collection.copy('Source', 'Target')).toThrow();
    });
  });

  describe('Move Operations', () => {
    test('moves worksheet', () => {
      collection.add('Sheet1');
      collection.add('Sheet2');
      collection.add('Sheet3');
      
      collection.move(0, 2);
      expect(excelPackage.worksheets.get('Sheet1')).toBeDefined();
    });

    test('throws error for invalid move indices', () => {
      collection.add('Sheet1');
      expect(() => collection.move(0, 1)).toThrow();
      expect(() => collection.move(-1, 0)).toThrow();
    });
  });
});