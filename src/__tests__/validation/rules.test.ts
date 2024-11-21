import {
  validateList,
  validateRange,
  validateDate,
  validateTextLength,
  validateCustom
} from '../../validation/rules';
import { FormulaError } from '../../errors';

describe('Data Validation Rules', () => {
  describe('List Validation', () => {
    test('validates against array list', () => {
      const list = ['A', 'B', 'C'];
      expect(validateList('A', list)).toBe(true);
      expect(validateList('D', list)).toBe(false);
    });

    test('validates against string list', () => {
      const list = 'A,B,C';
      expect(validateList('A', list)).toBe(true);
      expect(validateList('D', list)).toBe(false);
    });
  });

  describe('Range Validation', () => {
    test('validates between range', () => {
      expect(validateRange(5, 'between', 1, 10)).toBe(true);
      expect(validateRange(15, 'between', 1, 10)).toBe(false);
    });

    test('validates comparison operators', () => {
      expect(validateRange(5, 'greaterThan', 3)).toBe(true);
      expect(validateRange(5, 'lessThan', 3)).toBe(false);
      expect(validateRange(5, 'equal', 5)).toBe(true);
      expect(validateRange(5, 'notEqual', 3)).toBe(true);
    });
  });

  describe('Date Validation', () => {
    test('validates date ranges', () => {
      const date = new Date('2023-01-15');
      const start = new Date('2023-01-01');
      const end = new Date('2023-01-31');

      expect(validateDate(date, 'between', start, end)).toBe(true);
      expect(validateDate(date, 'greaterThan', start)).toBe(true);
      expect(validateDate(date, 'lessThan', end)).toBe(true);
    });

    test('validates date equality', () => {
      const date1 = new Date('2023-01-15');
      const date2 = new Date('2023-01-15');
      expect(validateDate(date1, 'equal', date2)).toBe(true);
    });
  });

  describe('Text Length Validation', () => {
    test('validates text length', () => {
      expect(validateTextLength('test', 'between', 3, 5)).toBe(true);
      expect(validateTextLength('test', 'equal', 4)).toBe(true);
      expect(validateTextLength('test', 'greaterThan', 3)).toBe(true);
      expect(validateTextLength('test', 'lessThan', 5)).toBe(true);
    });
  });

  describe('Custom Validation', () => {
    test('validates custom formula', () => {
      expect(validateCustom('test', 'LEN(A1) > 3')).toBe(true);
      expect(validateCustom('test', '')).toBe(false);
    });
  });

  describe('Error Handling', () => {
    test('handles invalid operators', () => {
      expect(() => validateRange(5, 'invalid' as any, 3)).toThrow(FormulaError);
      expect(() => validateDate(new Date(), 'invalid' as any, new Date())).toThrow(FormulaError);
    });

    test('handles invalid values', () => {
      expect(() => validateList(undefined, [])).toThrow(FormulaError);
      expect(() => validateTextLength(undefined as any, 'equal', 3)).toThrow(FormulaError);
    });
  });
});
