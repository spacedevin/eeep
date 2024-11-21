import {
  besseli,
  besselj,
  besselk,
  bessely
} from '../../../formulas/engineering/bessel';
import { FormulaError } from '../../../errors';

describe('Bessel Functions', () => {
  describe('BESSELI function', () => {
    test('calculates modified Bessel function In(x)', () => {
      expect(besseli(1, 0)).toBeCloseTo(1.2661, 4);
      expect(besseli(1, 1)).toBeCloseTo(0.5652, 4);
      expect(() => besseli(1, 1.5)).toThrow(FormulaError);
    });
  });

  describe('BESSELJ function', () => {
    test('calculates Bessel function Jn(x)', () => {
      expect(besselj(1, 0)).toBeCloseTo(0.7652, 4);
      expect(besselj(1, 1)).toBeCloseTo(0.4401, 4);
      expect(() => besselj(1, 1.5)).toThrow(FormulaError);
    });
  });

  describe('BESSELK function', () => {
    test('calculates modified Bessel function Kn(x)', () => {
      expect(besselk(1, 0)).toBeCloseTo(0.4210, 4);
      expect(besselk(1, 1)).toBeCloseTo(0.6019, 4);
      expect(() => besselk(1, 1.5)).toThrow(FormulaError);
    });
  });

  describe('BESSELY function', () => {
    test('calculates Bessel function Yn(x)', () => {
      expect(bessely(1, 0)).toBeCloseTo(0.0882, 4);
      expect(bessely(1, 1)).toBeCloseTo(-0.7812, 4);
      expect(() => bessely(1, 1.5)).toThrow(FormulaError);
    });
  });
});