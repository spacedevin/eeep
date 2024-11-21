import {
  betadist,
  expondist,
  gammadist,
  hypgeomdist,
  lognormdist,
  negbinomdist,
  weibull
} from '../../../formulas/distribution/advanced';
import { FormulaError } from '../../../errors';

describe('Advanced Distribution Functions', () => {
  describe('Beta Distribution', () => {
    test('calculates beta distribution', () => {
      expect(betadist(0.5, 2, 3, true)).toBeCloseTo(0.6875, 4);
      expect(betadist(0.5, 2, 3, false)).toBeGreaterThan(0);
      expect(() => betadist(-1, 2, 3)).toThrow(FormulaError);
    });
  });

  describe('Exponential Distribution', () => {
    test('calculates exponential distribution', () => {
      expect(expondist(1, 1, true)).toBeCloseTo(0.6321, 4);
      expect(expondist(1, 1, false)).toBeCloseTo(0.3679, 4);
      expect(() => expondist(-1, 1, true)).toThrow(FormulaError);
    });
  });

  describe('Gamma Distribution', () => {
    test('calculates gamma distribution', () => {
      expect(gammadist(2, 2, 1, true)).toBeGreaterThan(0);
      expect(gammadist(2, 2, 1, false)).toBeGreaterThan(0);
      expect(() => gammadist(-1, 2, 1, true)).toThrow(FormulaError);
    });
  });

  describe('Hypergeometric Distribution', () => {
    test('calculates hypergeometric distribution', () => {
      expect(hypgeomdist(1, 4, 8, 20)).toBeGreaterThan(0);
      expect(() => hypgeomdist(-1, 4, 8, 20)).toThrow(FormulaError);
    });
  });

  describe('Lognormal Distribution', () => {
    test('calculates lognormal distribution', () => {
      expect(lognormdist(1, 0, 1, true)).toBeCloseTo(0.5, 4);
      expect(lognormdist(1, 0, 1, false)).toBeGreaterThan(0);
      expect(() => lognormdist(0, 0, 1)).toThrow(FormulaError);
    });
  });

  describe('Negative Binomial Distribution', () => {
    test('calculates negative binomial distribution', () => {
      expect(negbinomdist(10, 5, 0.5)).toBeGreaterThan(0);
      expect(() => negbinomdist(-1, 5, 0.5)).toThrow(FormulaError);
    });
  });

  describe('Weibull Distribution', () => {
    test('calculates weibull distribution', () => {
      expect(weibull(1, 2, 3, true)).toBeGreaterThan(0);
      expect(weibull(1, 2, 3, false)).toBeGreaterThan(0);
      expect(() => weibull(-1, 2, 3, true)).toThrow(FormulaError);
    });
  });
});