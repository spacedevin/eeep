import {
  sum,
  average,
  count,
  counta,
  max,
  min,
  product,
  sumif,
  sumifs,
  averageif,
  averageifs,
  countif,
  countifs,
  subtotal
} from '../../formulas/aggregate';
import { FormulaError } from '../../errors';

describe('Aggregate Functions', () => {
  describe('Basic Aggregation', () => {
    test('SUM function', () => {
      expect(sum(1, 2, 3, 4, 5)).toBe(15);
      expect(sum(-1, 1)).toBe(0);
      expect(sum()).toBe(0);
    });

    test('AVERAGE function', () => {
      expect(average(1, 2, 3, 4, 5)).toBe(3);
      expect(average(1)).toBe(1);
      expect(() => average()).toThrow(FormulaError);
    });

    test('COUNT function', () => {
      expect(count(1, 2, 'text', true, undefined)).toBe(2);
      expect(count()).toBe(0);
    });

    test('COUNTA function', () => {
      expect(counta(1, 2, 'text', true, undefined)).toBe(4);
      expect(counta()).toBe(0);
    });

    test('MAX function', () => {
      expect(max(1, 2, 3, 4, 5)).toBe(5);
      expect(max(-1, -2, -3)).toBe(-1);
      expect(() => max()).toThrow(FormulaError);
    });

    test('MIN function', () => {
      expect(min(1, 2, 3, 4, 5)).toBe(1);
      expect(min(-1, -2, -3)).toBe(-3);
      expect(() => min()).toThrow(FormulaError);
    });

    test('PRODUCT function', () => {
      expect(product(2, 3, 4)).toBe(24);
      expect(product(-2, 3)).toBe(-6);
      expect(product()).toBe(0);
    });
  });

  describe('Conditional Aggregation', () => {
    const range = [1, 2, 3, 4, 5];
    const criteria = '>3';

    test('SUMIF function', () => {
      expect(sumif(range, criteria)).toBe(9); // 4 + 5
      expect(sumif(range, '=2')).toBe(2);
    });

    test('SUMIFS function', () => {
      const range1 = [1, 2, 3, 4, 5];
      const criteria1 = '>2';
      const range2 = [1, 2, 3, 4, 5];
      const criteria2 = '<5';
      expect(sumifs(range1, range1, criteria1, range2, criteria2)).toBe(7); // 3 + 4
    });

    test('AVERAGEIF function', () => {
      expect(averageif(range, criteria)).toBe(4.5); // (4 + 5) / 2
      expect(averageif(range, '=2')).toBe(2);
    });

    test('AVERAGEIFS function', () => {
      const range1 = [1, 2, 3, 4, 5];
      const criteria1 = '>2';
      const range2 = [1, 2, 3, 4, 5];
      const criteria2 = '<5';
      expect(averageifs(range1, range1, criteria1, range2, criteria2)).toBe(3.5); // (3 + 4) / 2
    });

    test('COUNTIF function', () => {
      expect(countif(range, criteria)).toBe(2); // 4, 5
      expect(countif(range, '=2')).toBe(1);
    });

    test('COUNTIFS function', () => {
      const range1 = [1, 2, 3, 4, 5];
      const criteria1 = '>2';
      const range2 = [1, 2, 3, 4, 5];
      const criteria2 = '<5';
      expect(countifs(range1, criteria1, range2, criteria2)).toBe(2); // 3, 4
    });
  });

  describe('Subtotal Function', () => {
    const values = [1, 2, 3, 4, 5];

    test('SUBTOTAL with different function numbers', () => {
      expect(subtotal(1, ...values)).toBe(average(...values)); // Average
      expect(subtotal(4, ...values)).toBe(max(...values)); // Max
      expect(subtotal(9, ...values)).toBe(sum(...values)); // Sum
    });

    test('throws error for invalid function number', () => {
      expect(() => subtotal(0, ...values)).toThrow(FormulaError);
      expect(() => subtotal(12, ...values)).toThrow(FormulaError);
    });
  });

  describe('Error Handling', () => {
    test('handles invalid arguments', () => {
      expect(() => average('invalid' as any)).toThrow(FormulaError);
      expect(() => max('invalid' as any)).toThrow(FormulaError);
      expect(() => min('invalid' as any)).toThrow(FormulaError);
    });

    test('handles empty arrays', () => {
      expect(() => average([])).toThrow(FormulaError);
      expect(() => sumif([], '>')).toThrow(FormulaError);
      expect(() => averageif([], '>')).toThrow(FormulaError);
    });

    test('handles invalid criteria', () => {
      const range = [1, 2, 3];
      expect(() => sumif(range, 'invalid>')).toThrow(FormulaError);
      expect(() => countif(range, {})).toThrow(FormulaError);
    });
  });
});