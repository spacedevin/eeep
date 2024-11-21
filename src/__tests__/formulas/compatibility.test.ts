import {
  betadist,
  betainv,
  binomdist,
  chidist,
  chiinv,
  chitest,
  fdist,
  finv
} from '../../formulas/compatibility';
import { FormulaError } from '../../errors';

describe('Compatibility Functions', () => {
  describe('Beta Distribution', () => {
    test('calculates beta distribution', () => {
      expect(betadist(0.5, 2, 3)).toBeCloseTo(0.6875, 4);
      expect(() => betadist(-1, 2, 3)).toThrow(FormulaError);
      expect(() => betadist(0.5, -1, 3)).toThrow(FormulaError);
    });

    test('calculates inverse beta', () => {
      expect(betainv(0.6875, 2, 3)).toBeCloseTo(0.5, 4);
      expect(() => betainv(-1, 2, 3)).toThrow(FormulaError);
      expect(() => betainv(0.5, -1, 3)).toThrow(FormulaError);
    });
  });

  describe('Binomial Distribution', () => {
    test('calculates binomial distribution', () => {
      expect(binomdist(6, 10, 0.5, false)).toBeCloseTo(0.2051, 4);
      expect(binomdist(6, 10, 0.5, true)).toBeCloseTo(0.8281, 4);
      expect(() => binomdist(-1, 10, 0.5, true)).toThrow(FormulaError);
    });
  });

  describe('Chi-Square Distribution', () => {
    test('calculates chi-square distribution', () => {
      expect(chidist(2, 1)).toBeCloseTo(0.1573, 4);
      expect(() => chidist(-1, 1)).toThrow(FormulaError);
      expect(() => chidist(1, 0)).toThrow(FormulaError);
    });

    test('calculates inverse chi-square', () => {
      expect(chiinv(0.1573, 1)).toBeCloseTo(2, 4);
      expect(() => chiinv(-1, 1)).toThrow(FormulaError);
      expect(() => chiinv(0.5, 0)).toThrow(FormulaError);
    });

    test('performs chi-square test', () => {
      const actual = [[4, 5], [6, 7]];
      const expected = [[5, 5], [6, 6]];
      expect(chitest(actual, expected)).toBeGreaterThan(0);
      expect(() => chitest([], [])).toThrow(FormulaError);
    });
  });

  describe('F Distribution', () => {
    test('calculates F distribution', () => {
      expect(fdist(15.2069, 6, 4)).toBeCloseTo(0.01, 2);
      expect(() => fdist(-1, 6, 4)).toThrow(FormulaError);
      expect(() => fdist(1, 0, 4)).toThrow(FormulaError);
    });

    test('calculates inverse F', () => {
      expect(finv(0.01, 6, 4)).toBeCloseTo(15.2069, 4);
      expect(() => finv(-1, 6, 4)).toThrow(FormulaError);
      expect(() => finv(0.5, 0, 4)).toThrow(FormulaError);
    });
  });
});