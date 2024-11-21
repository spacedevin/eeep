import {
  normDist,
  normInv,
  normSDist,
  normSInv,
  tDist,
  tInv,
  fDist,
  fInv,
  chiDist,
  chiInv,
  betaDist,
  betaInv,
  exponDist,
  gammaDist,
  gammaInv,
  weibullDist
} from '../../formulas/distribution';
import { FormulaError } from '../../errors';

describe('Distribution Functions', () => {
  describe('Normal Distribution', () => {
    test('NORMDIST function', () => {
      expect(normDist(0, 0, 1, true)).toBeCloseTo(0.5, 6);
      expect(normDist(0, 0, 1, false)).toBeCloseTo(0.3989, 4);
      expect(() => normDist(0, 0, -1, true)).toThrow(FormulaError);
    });

    test('NORMINV function', () => {
      expect(normInv(0.5, 0, 1)).toBeCloseTo(0, 6);
      expect(normInv(0.9772, 0, 1)).toBeCloseTo(2, 4);
      expect(() => normInv(-0.1, 0, 1)).toThrow(FormulaError);
    });

    test('NORMSDIST function', () => {
      expect(normSDist(0)).toBeCloseTo(0.5, 6);
      expect(normSDist(2)).toBeCloseTo(0.9772, 4);
    });

    test('NORMSINV function', () => {
      expect(normSInv(0.5)).toBeCloseTo(0, 6);
      expect(normSInv(0.9772)).toBeCloseTo(2, 4);
      expect(() => normSInv(2)).toThrow(FormulaError);
    });
  });

  describe('T Distribution', () => {
    test('TDIST function', () => {
      expect(tDist(2, 5, true)).toBeCloseTo(0.9507, 4);
      expect(tDist(2, 5, false)).toBeCloseTo(0.0526, 4);
      expect(() => tDist(2, 0, true)).toThrow(FormulaError);
    });

    test('TINV function', () => {
      expect(tInv(0.1, 5)).toBeCloseTo(2.0150, 4);
      expect(() => tInv(-0.1, 5)).toThrow(FormulaError);
    });
  });

  describe('F Distribution', () => {
    test('FDIST function', () => {
      expect(fDist(15.2069, 6, 4)).toBeCloseTo(0.01, 2);
      expect(() => fDist(-1, 6, 4)).toThrow(FormulaError);
    });

    test('FINV function', () => {
      expect(fInv(0.01, 6, 4)).toBeCloseTo(15.2069, 4);
      expect(() => fInv(-0.1, 6, 4)).toThrow(FormulaError);
    });
  });

  describe('Chi-Square Distribution', () => {
    test('CHIDIST function', () => {
      expect(chiDist(4, 2)).toBeCloseTo(0.1353, 4);
      expect(() => chiDist(-1, 2)).toThrow(FormulaError);
    });

    test('CHIINV function', () => {
      expect(chiInv(0.1353, 2)).toBeCloseTo(4, 4);
      expect(() => chiInv(-0.1, 2)).toThrow(FormulaError);
    });
  });

  describe('Other Distributions', () => {
    test('BETADIST function', () => {
      expect(betaDist(0.4, 4, 5)).toBeCloseTo(0.4659, 4);
      expect(() => betaDist(2, 4, 5)).toThrow(FormulaError);
    });

    test('BETAINV function', () => {
      expect(betaInv(0.4659, 4, 5)).toBeCloseTo(0.4, 4);
      expect(() => betaInv(-0.1, 4, 5)).toThrow(FormulaError);
    });

    test('EXPONDIST function', () => {
      expect(exponDist(0.2, 10, true)).toBeCloseTo(0.8647, 4);
      expect(exponDist(0.2, 10, false)).toBeCloseTo(1.3534, 4);
    });

    test('GAMMADIST function', () => {
      expect(gammaDist(2, 3, 2, true)).toBeCloseTo(0.3233, 4);
      expect(gammaDist(2, 3, 2, false)).toBeCloseTo(0.2420, 4);
    });

    test('GAMMAINV function', () => {
      expect(gammaInv(0.3233, 3, 2)).toBeCloseTo(2, 4);
      expect(() => gammaInv(-0.1, 3, 2)).toThrow(FormulaError);
    });

    test('WEIBULL function', () => {
      expect(weibullDist(1, 2, 3, true)).toBeCloseTo(0.1054, 4);
      expect(weibullDist(1, 2, 3, false)).toBeCloseTo(0.1224, 4);
    });
  });
});