import {
  isBlank,
  isErr,
  isError,
  isEven,
  isFormula,
  isLogical,
  isNa,
  isNonText,
  isNumber,
  isOdd,
  isRef,
  isText,
  n,
  na,
  sheet,
  sheets,
  type
} from '../../formulas/info';
import { FormulaError } from '../../errors';

describe('Information Functions', () => {
  describe('Type Checking Functions', () => {
    test('ISBLANK function', () => {
      expect(isBlank(null)).toBe(true);
      expect(isBlank('')).toBe(true);
      expect(isBlank('text')).toBe(false);
    });

    test('ISERR function', () => {
      expect(isErr(new Error())).toBe(true);
      expect(isErr(NaN)).toBe(true);
      expect(isErr('error')).toBe(false);
    });

    test('ISERROR function', () => {
      expect(isError(new Error())).toBe(true);
      expect(isError(NaN)).toBe(true);
      expect(isError('error')).toBe(false);
    });

    test('ISEVEN function', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(3)).toBe(false);
      expect(() => isEven(NaN)).toThrow(FormulaError);
    });

    test('ISFORMULA function', () => {
      expect(isFormula('=A1+B1')).toBe(true);
      expect(isFormula('A1')).toBe(false);
    });

    test('ISLOGICAL function', () => {
      expect(isLogical(true)).toBe(true);
      expect(isLogical(false)).toBe(true);
      expect(isLogical('true')).toBe(false);
    });

    test('ISNA function', () => {
      expect(isNa(na())).toBe(true);
      expect(isNa(null)).toBe(false);
    });

    test('ISNONTEXT function', () => {
      expect(isNonText(123)).toBe(true);
      expect(isNonText('text')).toBe(false);
    });

    test('ISNUMBER function', () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber('123')).toBe(false);
    });

    test('ISODD function', () => {
      expect(isOdd(3)).toBe(true);
      expect(isOdd(2)).toBe(false);
      expect(() => isOdd(NaN)).toThrow(FormulaError);
    });

    test('ISREF function', () => {
      expect(isRef('A1')).toBe(true);
      expect(isRef('AA11')).toBe(true);
      expect(isRef('not a ref')).toBe(false);
    });

    test('ISTEXT function', () => {
      expect(isText('text')).toBe(true);
      expect(isText(123)).toBe(false);
    });
  });

  describe('Value Functions', () => {
    test('N function', () => {
      expect(n(123)).toBe(123);
      expect(n(true)).toBe(1);
      expect(n(false)).toBe(0);
      expect(n('123')).toBe(0);
    });

    test('NA function', () => {
      expect(isNa(na())).toBe(true);
    });

    test('TYPE function', () => {
      expect(type(123)).toBe(1); // number
      expect(type('text')).toBe(2); // text
      expect(type(true)).toBe(4); // logical
      expect(type(new Error())).toBe(16); // error
    });
  });

  describe('Sheet Functions', () => {
    test('SHEET function', () => {
      expect(sheet()).toBe(1);
      expect(sheet('Sheet1')).toBe(1);
    });

    test('SHEETS function', () => {
      expect(sheets()).toBe(1);
      expect(sheets('Book1')).toBe(1);
    });
  });

  describe('Error Handling', () => {
    test('handles invalid input', () => {
      expect(() => isEven('not a number' as any)).toThrow(FormulaError);
      expect(() => isOdd('not a number' as any)).toThrow(FormulaError);
      expect(() => type(undefined)).toThrow(FormulaError);
    });
  });
});