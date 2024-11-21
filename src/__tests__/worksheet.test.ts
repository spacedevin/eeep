import { utils } from 'xlsx';
import {
  createWorksheet,
  setCellValue,
  getCellValue,
  setCellStyle,
  getCellStyle,
  setColumnWidth,
  setRowHeight,
  setPageSetup,
  getPageSetup,
  setPageMargins,
  getPageMargins,
  protect,
  unprotect,
  isProtected,
  hide,
  unhide,
  isHidden,
  mergeCells,
  copyWorksheet,
  clearWorksheet
} from '../worksheet';
import { CellStyle } from '../interfaces/cellstyle';
import { PageSetup } from '../interfaces/pagesetup';

describe('Worksheet Functions', () => {
  const createEmptyWorksheet = () => createWorksheet('Sheet1', utils.aoa_to_sheet([]));
  
  describe('Cell Operations', () => {
    test('sets and gets cell value', () => {
      let state = createEmptyWorksheet();
      state = setCellValue(state, 'A1', 'Test');
      expect(getCellValue(state, 'A1')).toBe('Test');
    });

    test('sets and gets cell style', () => {
      let state = createEmptyWorksheet();
      const style: CellStyle = {
        font: { bold: true, size: 12 },
        alignment: { horizontal: 'center' }
      };
      state = setCellStyle(state, 'A1', style);
      expect(getCellStyle(state, 'A1')).toEqual(style);
    });

    test('merges cells', () => {
      let state = createEmptyWorksheet();
      state = mergeCells(state, 'A1:B2');
      state = setCellValue(state, 'A1', 'Merged');
      expect(getCellValue(state, 'A1')).toBe('Merged');
    });
  });

  describe('Layout Operations', () => {
    test('sets column width', () => {
      let state = createEmptyWorksheet();
      state = setColumnWidth(state, 'A', 15);
      expect(state.sheet['!cols']?.[0]?.width).toBe(15);
    });

    test('sets row height', () => {
      let state = createEmptyWorksheet();
      state = setRowHeight(state, 1, 20);
      expect(state.sheet['!rows']?.[0]?.hpt).toBe(20);
    });
  });

  describe('Page Setup', () => {
    test('sets and gets page setup', () => {
      let state = createEmptyWorksheet();
      const setup: PageSetup = {
        orientation: 'landscape',
        scale: 90
      };
      state = setPageSetup(state, setup);
      expect(getPageSetup(state)).toEqual(setup);
    });

    test('sets and gets page margins', () => {
      let state = createEmptyWorksheet();
      const margins = {
        top: 2,
        bottom: 2
      };
      state = setPageMargins(state, margins);
      expect(getPageMargins(state)).toMatchObject(margins);
    });
  });

  describe('Protection', () => {
    test('protects and unprotects worksheet', () => {
      let state = createEmptyWorksheet();
      expect(isProtected(state)).toBe(false);
      state = protect(state, { password: 'test123' });
      expect(isProtected(state)).toBe(true);
      state = unprotect(state);
      expect(isProtected(state)).toBe(false);
    });
  });

  describe('Visibility', () => {
    test('hides and unhides worksheet', () => {
      let state = createEmptyWorksheet();
      expect(isHidden(state)).toBe(false);
      state = hide(state);
      expect(isHidden(state)).toBe(true);
      state = unhide(state);
      expect(isHidden(state)).toBe(false);
    });
  });

  describe('Copy', () => {
    test('copies worksheet with all properties', () => {
      let state = createEmptyWorksheet();
      state = setCellValue(state, 'A1', 'Test');
      state = setCellStyle(state, 'A1', { font: { bold: true } });
      state = setColumnWidth(state, 'A', 15);
      
      const copy = copyWorksheet(state);
      expect(getCellValue(copy, 'A1')).toBe('Test');
      expect(getCellStyle(copy, 'A1')).toEqual({ font: { bold: true } });
      expect(copy.sheet['!cols']?.[0]?.width).toBe(15);
    });
  });

  describe('Clear', () => {
    test('clears worksheet', () => {
      let state = createEmptyWorksheet();
      state = setCellValue(state, 'A1', 'Test');
      state = setCellStyle(state, 'A1', { font: { bold: true } });
      
      state = clearWorksheet(state);
      expect(getCellValue(state, 'A1')).toBeUndefined();
      expect(getCellStyle(state, 'A1')).toBeUndefined();
    });
  });
});