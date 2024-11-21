import {
  convert,
  delta,
  erf,
  erfc,
  gestep
} from '../../../formulas/engineering/convert';
import { FormulaError } from '../../../errors';

describe('Engineering Functions', () => {
  describe('CONVERT function', () => {
    test('converts between units', () => {
      expect(convert(1, 'm', 'ft')).toBeCloseTo(3.2808, 4);
      expect(convert(100, 'C', 'F')).toBeCloseTo(212, 4);
      expect(convert(1, 'kg', 'lbs')).toBeCloseTo(2.2046, 4);
      expect(() => convert(1, 'm', 'kg')).toThrow(FormulaError);
    });
  });

  describe('DELTA function', () => {
    test('tests for equality', () => {
      expect(delta(5, 5)).toBe(1);
      expect(delta(5, 4)).toBe(0);
      expect(delta(5)).toBe(0);
    });
  });

  describe('ERF function', () => {
    test('calculates error function', () => {
      expect(erf(1)).toBeCloseTo(0.8427, 4);
      expect(erf(0)).toBe(0);
      expect(erf(-1)).toBeCloseTo(-0.8427, 4);
    });
  });

  describe('ERFC function', () => {
    test('calculates complementary error function', () => {
      expect(erfc(1)).toBeCloseTo(0.1573, 4);
      expect(erfc(0)).toBe(1);
      expect(erfc(-1)).toBeCloseTo(1.8427, 4);
    });
  });

  describe('GESTEP function', () => {
    test('tests step function', () => {
      expect(gestep(5, 4)).toBe(1);
      expect(gestep(4, 5)).toBe(0);
      expect(gestep(5)).toBe(1);
    });
  });
});