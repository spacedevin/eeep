import {
  normDist,
  normInv,
  normSDist,
  normSInv,
  standardize
} from '../../../formulas/distribution/base';
import { FormulaError } from '../../../errors';

describe('Basic Distribution Functions', () => {
  describe('Normal Distribution', () => {
    test('calculates normal distribution', () => {
    test('calculates normal distribution', () => {
      expect(normDist(0, 0, 1, true)).toBeCloseTo(0.5, 4);
      expect(normDist(0, 0, 1, false)).toBeCloseTo(0.3989, 4);
      expect(() => normDist(0, 0, -1, true)).toThrow(FormulaError);
    });

    test('calculates inverse normal', () => {
      expect(normInv(0.5, 0, 1)).toBeCloseTo(0, 4);
      expect(normInv(0.9772, 0, 1)).toBeCloseTo(2, 4);
      expect(() => normInv(-0.1, 0, 1)).toThrow(FormulaError);
    });
  });

  describe('Standard Normal Distribution', () => {
    test('calculates standard normal distribution', () => {
      expect(normSDist(0)).toBeCloseTo(0.5, 4);
      expect(normSDist(2)).toBeCloseTo(0.9772, 4);
    });

    test('calculates inverse standard normal', () => {
      expect(normSInv(0.5)).toBeCloseTo(0, 4);
      expect(normSInv(0.9772)).toBeCloseTo(2, 4);
      expect(() => normSInv(2)).toThrow(FormulaError);
    });
  });

  describe('Standardization', () => {
    test('standardizes values', () => {
      expect(standardize(42, 40, 1.5)).toBeCloseTo(1.3333, 4);
      expect(() => standardize(42, 40, -1)).toThrow(FormulaError);
    });
  });
});