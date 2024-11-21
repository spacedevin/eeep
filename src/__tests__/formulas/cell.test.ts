import { cell, errorType, info } from '../../formulas/cell';
import { FormulaError } from '../../errors';

describe('Cell Information Functions', () => {
  describe('CELL function', () => {
    test('gets cell address', () => {
      expect(cell('address', 'A1')).toBe('A1');
      expect(cell('address', 'B10')).toBe('B10');
    });

    test('gets cell column', () => {
      expect(cell('col', 'A1')).toBe(1);
      expect(cell('col', 'B1')).toBe(2);
      expect(cell('col', 'AA1')).toBe(27);
    });

    test('gets cell row', () => {
      expect(cell('row', 'A1')).toBe(1);
      expect(cell('row', 'A10')).toBe(10);
    });

    test('throws error for invalid reference', () => {
      expect(() => cell('address', 'invalid')).toThrow(FormulaError);
      expect(() => cell('address')).toThrow(FormulaError);
    });

    test('throws error for invalid info type', () => {
      expect(() => cell('invalid', 'A1')).toThrow(FormulaError);
    });
  });

  describe('ERROR.TYPE function', () => {
    test('identifies error types', () => {
      const nullError = new Error();
      nullError.name = '#NULL!';
      expect(errorType(nullError)).toBe(1);

      const divError = new Error();
      divError.name = '#DIV/0!';
      expect(errorType(divError)).toBe(2);

      const valueError = new Error();
      valueError.name = '#VALUE!';
      expect(errorType(valueError)).toBe(3);
    });

    test('returns undefined for non-errors', () => {
      expect(errorType('not an error')).toBeUndefined();
      expect(errorType(123)).toBeUndefined();
      expect(errorType(null)).toBeUndefined();
    });
  });

  describe('INFO function', () => {
    test('gets system information', () => {
      expect(info('directory')).toBeDefined();
      expect(info('osversion')).toBeDefined();
      expect(info('system')).toBeDefined();
    });

    test('gets application information', () => {
      expect(info('release')).toBe('1.0.0');
      expect(info('recalc')).toBe('Automatic');
    });

    test('throws error for invalid info type', () => {
      expect(() => info('invalid')).toThrow(FormulaError);
    });
  });
});