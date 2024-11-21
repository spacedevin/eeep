import { utils } from 'xlsx';
import {
  createWorkbook,
  setWorkbookProperties,
  getWorkbookProperties,
  protectWorkbook,
  unprotectWorkbook,
  isWorkbookProtected,
  addWorksheet,
  getWorksheet,
  deleteWorksheet,
  renameWorksheet,
  defineNamedRange,
  getNamedRange,
  deleteNamedRange
} from '../workbook';

describe('Workbook Functions', () => {
  describe('Basic Operations', () => {
    test('creates new workbook', () => {
      const workbook = createWorkbook();
      expect(workbook.sheets.size).toBe(0);
      expect(workbook.properties).toEqual({});
      expect(workbook.protection).toEqual({});
    });
  });

  describe('Properties', () => {
    test('sets and gets properties', () => {
      let state = createWorkbook();
      const props = {
        title: 'Test Workbook',
        author: 'Test Author'
      };

      state = setWorkbookProperties(state, props);
      expect(getWorkbookProperties(state)).toMatchObject(props);
      expect(getWorkbookProperties(state).modified).toBeInstanceOf(Date);
    });
  });

  describe('Protection', () => {
    test('protects and unprotects workbook', () => {
      let state = createWorkbook();
      
      state = protectWorkbook(state, { password: 'test123' });
      expect(isWorkbookProtected(state)).toBe(true);
      
      state = unprotectWorkbook(state);
      expect(isWorkbookProtected(state)).toBe(false);
    });
  });

  describe('Worksheet Management', () => {
    test('adds and gets worksheet', () => {
      let state = createWorkbook();
      
      state = addWorksheet(state, 'Sheet1');
      const sheet = getWorksheet(state, 'Sheet1');
      
      expect(sheet).toBeDefined();
      expect(sheet?.name).toBe('Sheet1');
    });

    test('deletes worksheet', () => {
      let state = createWorkbook();
      
      state = addWorksheet(state, 'Sheet1');
      state = deleteWorksheet(state, 'Sheet1');
      
      expect(getWorksheet(state, 'Sheet1')).toBeUndefined();
    });

    test('renames worksheet', () => {
      let state = createWorkbook();
      
      state = addWorksheet(state, 'Sheet1');
      state = renameWorksheet(state, 'Sheet1', 'NewSheet');
      
      expect(getWorksheet(state, 'Sheet1')).toBeUndefined();
      expect(getWorksheet(state, 'NewSheet')).toBeDefined();
    });

    test('prevents duplicate worksheet names', () => {
      let state = createWorkbook();
      
      state = addWorksheet(state, 'Sheet1');
      expect(() => addWorksheet(state, 'Sheet1')).toThrow();
    });
  });

  describe('Named Ranges', () => {
    test('defines and gets named range', () => {
      let state = createWorkbook();
      
      state = defineNamedRange(state, 'TestRange', 'Sheet1!A1:B10');
      expect(getNamedRange(state, 'TestRange')).toBe('Sheet1!A1:B10');
    });

    test('deletes named range', () => {
      let state = createWorkbook();
      
      state = defineNamedRange(state, 'TestRange', 'Sheet1!A1:B10');
      state = deleteNamedRange(state, 'TestRange');
      
      expect(getNamedRange(state, 'TestRange')).toBeUndefined();
    });

    test('prevents duplicate named ranges', () => {
      let state = createWorkbook();
      
      state = defineNamedRange(state, 'TestRange', 'Sheet1!A1:B10');
      expect(() => defineNamedRange(state, 'TestRange', 'Sheet1!C1:D10')).toThrow();
    });
  });
});