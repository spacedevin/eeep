import {
  average,
  median,
  mode,
  stdev,
  variance,
  avedev,
  confidence,
  correl,
  covar,
  forecast,
  geomean,
  harmean,
  kurt,
  skew
} from '../../formulas/statistical';
import { FormulaError } from '../../errors';

describe('Statistical Functions', () => {
  describe('Basic Statistics', () => {
    test('AVERAGE function', () => {
      expect(average(1, 2, 3, 4, 5)).toBe(3);
      expect(average(1)).toBe(1);
      expect(() => average()).toThrow(FormulaError);
    });

    test('MEDIAN function', () => {
      expect(median(1, 2, 3, 4, 5)).toBe(3);
      expect(median(1, 2, 3, 4)).toBe(2.5);
      expect(() => median()).toThrow(FormulaError);
    });

    test('MODE function', () => {
      expect(mode(1, 2, 2, 3, 4)).toBe(2);
      expect(() => mode(1)).toThrow(FormulaError);
    });

    test('STDEV function', () => {
      expect(stdev(1, 2, 3, 4, 5)).toBeCloseTo(1.5811, 4);
      expect(() => stdev(1)).toThrow(FormulaError);
    });

    test('VAR function', () => {
      expect(variance(1, 2, 3, 4, 5)).toBeCloseTo(2.5, 4);
      expect(() => variance(1)).toThrow(FormulaError);
    });
  });

  describe('Advanced Statistics', () => {
    test('AVEDEV function', () => {
      expect(avedev(2, 4, 8, 16)).toBeCloseTo(4.5, 4);
      expect(() => avedev(1)).toThrow(FormulaError);
    });

    test('CONFIDENCE function', () => {
      expect(confidence(0.05, 2.5, 50)).toBeCloseTo(0.6928, 4);
      expect(() => confidence(0, 1, 1)).toThrow(FormulaError);
    });

    test('CORREL function', () => {
      const array1 = [1, 2, 3, 4, 5];
      const array2 = [2, 4, 6, 8, 10];
      expect(correl(array1, array2)).toBe(1);
      expect(() => correl([1], [1, 2])).toThrow(FormulaError);
    });

    test('COVAR function', () => {
      const array1 = [1, 2, 3, 4, 5];
      const array2 = [2, 4, 6, 8, 10];
      expect(covar(array1, array2)).toBe(5);
      expect(() => covar([1], [1, 2])).toThrow(FormulaError);
    });

    test('FORECAST function', () => {
      const knownY = [6, 7, 9, 15, 21];
      const knownX = [20, 28, 31, 38, 40];
      expect(forecast(30, knownY, knownX)).toBeCloseTo(8.6232, 4);
    });

    test('GEOMEAN function', () => {
      expect(geomean(2, 4, 8)).toBeCloseTo(4, 4);
      expect(() => geomean(0, 1, 2)).toThrow(FormulaError);
    });

    test('HARMEAN function', () => {
      expect(harmean(2, 4, 8)).toBeCloseTo(3.4286, 4);
      expect(() => harmean(0, 1, 2)).toThrow(FormulaError);
    });

    test('KURT function', () => {
      expect(kurt(3, 4, 5, 2, 3, 4, 5, 6, 4, 7)).toBeCloseTo(-0.1518, 4);
      expect(() => kurt(1, 2, 3)).toThrow(FormulaError);
    });

    test('SKEW function', () => {
      expect(skew(3, 4, 5, 2, 3, 4, 5, 6, 4, 7)).toBeCloseTo(0.3595, 4);
      expect(() => skew(1, 2)).toThrow(FormulaError);
    });
  });
});