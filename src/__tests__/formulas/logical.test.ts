import {
  and,
  or,
  not,
  ifFunc,
  isBlank,
  isError,
  isNumber,
  isText,
  ifError,
  ifNa,
  xor
} from '../../formulas/logical';
import { FormulaError } from '../../errors';

describe('Logical Functions', () => {
  describe('Basic Logical Functions', () => {
    test('AND function', () => {
      expect(and(true, true)).toBe(true);
      expect(and(true, false)).toBe(false);
      expect(and(false, false)).toBe(false);
    });

    test('OR function', () => {
      expect(or(true, true)).toBe(true);
      expect(or(true, false)).toBe(true);
      expect(or(false, false)).toBe(false);
    });

    test('NOT function', () => {
      expect(not(true)).toBe(false);
      expect(not(false)).toBe(true);
    });

    test('IF function', () => {
      expect(ifFunc(true, 'yes', 'no')).toBe('yes');
      expect(ifFunc(false, 'yes', 'no')).toBe('no');
      expect(ifFunc(true, 1, 0)).toBe(1);
    });
  });

  describe('Information Functions', () => {
    test('ISBLANK function', () => {
      expect(isBlank(null)).toBe(true);
      expect(isBlank('')).toBe(true);
      expect(isBlank('text')).toBe(false);
    });

    test('ISERROR function', () => {
      expect(isError(new Error())).toBe(true);
      expect(isError('error')).toBe(false);
    });

    test('ISNUMBER function', () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber('123')).toBe(false);
    });

    test('ISTEXT function', () => {
      expect(isText('text')).toBe(true);
      expect(isText(123)).toBe(false);
    });
  });

  describe('Advanced Logical Functions', () => {
    test('IFERROR function', () => {
      expect(ifError(new Error(), 'error')).toBe('error');
      expect(ifError('valid', 'error')).toBe('valid');
    });

    test('IFNA function', () => {
      expect(ifNa(NaN, 'NA')).toBe('NA');
      expect(ifNa('valid', 'NA')).toBe('valid');
    });

    test('XOR function', () => {
      expect(xor(true, false)).toBe(true);
      expect(xor(true, true)).toBe(false);
      expect(xor(false, false)).toBe(false);
    });
  });

  describe('Error Handling', () => {
    test('handles invalid arguments', () => {
      expect(() => and('true' as any, 'false' as any)).toThrow(FormulaError);
      expect(() => or('true' as any, 'false' as any)).toThrow(FormulaError);
      expect(() => not('true' as any)).toThrow(FormulaError);
    });
  });
});