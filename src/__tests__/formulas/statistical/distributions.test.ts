import {
  normDist,
  normInv,
  tDist,
  tInv,
  fDist,
  fInv,
  chiDist,
  chiInv
} from '../../../formulas/statistical/distributions';
import { FormulaError } from '../../../errors';

describe('Distribution Functions', () => {
  describe('Normal Distribution', () => {
    test('calculates normal distribution', () => {
      expect(normDist(0, 0, 1, true)).toBeCloseTo(0.5, 6);
      expect(normDist(0, 0, 1, false)).toBeCloseTo(0.3989, 4);
    });

    test('calculates inverse normal', () => {
      expect(normInv(0.5, 0, 1)).toBeCloseTo(0, 6);
      expect(normInv(0.9772, 0, 1)).toBeCloseTo(2, 4);
    });
  });

  describe('T Distribution', () => {
    test('calculates t distribution', () => {
      expect(tDist(2, 5, true)).toBeCloseTo(0.9507, 4);
      expect(tDist(2, 5, false)).toBeCloseTo(0.0526, 4);
    });

    test('calculates inverse t', () => {
      expect(tInv(0.1, 5)).toBeCloseTo(2.0150, 4);
    });
  });

  describe('F Distribution', () => {
    test('calculates F distribution', () => {
      expect(fDist(15.2069, 6, 4)).toBeCloseTo(0.01, 2);
    });

    test('calculates inverse F', () => {
      expect(fInv(0.01, 6, 4)).toBeCloseTo(15.2069, 4);
    });
  });

  describe('Chi-Square Distribution', () => {
    test('calculates chi-square distribution', () => {
      expect(chiDist(4, 2)).toBeCloseTo(0.1353, 4);
    });

    test('calculates inverse chi-square', () => {
      expect(chiInv(0.1353, 2)).toBeCloseTo(4, 4);
    });
  });

  describe('Error Handling', () => {
    test('handles invalid parameters', () => {
      expect(() => normDist(0, 0, -1, true)).toThrow(FormulaError);
      expect(() => normInv(-0.1, 0, 1)).toThrow(FormulaError);
      expect(() => tDist(2, 0, true)).toThrow(FormulaError);
      expect(() => chiDist(-1, 2)).toThrow(FormulaError);
    });
  });
});
