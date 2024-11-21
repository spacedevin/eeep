import {
  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
  degrees,
  radians
} from '../../formulas/trigonometry';
import { FormulaError } from '../../errors';

describe('Trigonometry Functions', () => {
  test('SIN function', () => {
    expect(sin(0)).toBe(0);
    expect(sin(Math.PI / 2)).toBeCloseTo(1, 10);
    expect(sin(Math.PI)).toBeCloseTo(0, 10);
  });

  test('COS function', () => {
    expect(cos(0)).toBe(1);
    expect(cos(Math.PI / 2)).toBeCloseTo(0, 10);
    expect(cos(Math.PI)).toBeCloseTo(-1, 10);
  });

  test('TAN function', () => {
    expect(tan(0)).toBe(0);
    expect(tan(Math.PI / 4)).toBeCloseTo(1, 10);
    expect(() => tan(Math.PI / 2)).toThrow(FormulaError);
  });

  test('ASIN function', () => {
    expect(asin(0)).toBe(0);
    expect(asin(1)).toBeCloseTo(Math.PI / 2, 10);
    expect(() => asin(2)).toThrow(FormulaError);
  });

  test('ACOS function', () => {
    expect(acos(1)).toBe(0);
    expect(acos(0)).toBeCloseTo(Math.PI / 2, 10);
    expect(() => acos(2)).toThrow(FormulaError);
  });

  test('ATAN function', () => {
    expect(atan(0)).toBe(0);
    expect(atan(1)).toBeCloseTo(Math.PI / 4, 10);
    expect(atan(Infinity)).toBeCloseTo(Math.PI / 2, 10);
  });

  test('DEGREES function', () => {
    expect(degrees(0)).toBe(0);
    expect(degrees(Math.PI)).toBe(180);
    expect(degrees(Math.PI / 2)).toBe(90);
  });

  test('RADIANS function', () => {
    expect(radians(0)).toBe(0);
    expect(radians(180)).toBeCloseTo(Math.PI, 10);
    expect(radians(90)).toBeCloseTo(Math.PI / 2, 10);
  });

  describe('Error Handling', () => {
    test('handles invalid input', () => {
      expect(() => sin(NaN)).toThrow(FormulaError);
      expect(() => cos(NaN)).toThrow(FormulaError);
      expect(() => tan(NaN)).toThrow(FormulaError);
    });

    test('handles out of range input', () => {
      expect(() => asin(1.1)).toThrow(FormulaError);
      expect(() => acos(1.1)).toThrow(FormulaError);
      expect(() => degrees(Infinity)).toThrow(FormulaError);
    });
  });
});