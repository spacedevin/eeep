import {
  accrint,
  accrintm,
  disc,
  duration,
  effect,
  intrate,
  mduration,
  nominal,
  price,
  pricedisc,
  pricemat,
  received,
  yield_,
  yielddisc,
  yieldmat
} from '../../../formulas/financial/bonds';
import { FormulaError } from '../../../errors';

describe('Bond Functions', () => {
  describe('ACCRINT function', () => {
    test('calculates accrued interest', () => {
      const issue = new Date(2020, 0, 1);
      const firstInterest = new Date(2020, 6, 1);
      const settlement = new Date(2020, 11, 31);
      
      const result = accrint(issue, firstInterest, settlement, 0.1);
      expect(result).toBeGreaterThan(0);
    });

    test('handles invalid dates', () => {
      const issue = new Date(2020, 0, 1);
      const firstInterest = new Date(2019, 6, 1);
      const settlement = new Date(2020, 11, 31);
      
      expect(() => accrint(issue, firstInterest, settlement, 0.1))
        .toThrow(FormulaError);
    });
  });

  describe('DISC function', () => {
    test('calculates discount rate', () => {
      const settlement = new Date(2020, 0, 1);
      const maturity = new Date(2021, 0, 1);
      
      const result = disc(settlement, maturity, 95, 100);
      expect(result).toBeGreaterThan(0);
    });

    test('handles invalid inputs', () => {
      const settlement = new Date(2020, 0, 1);
      const maturity = new Date(2019, 0, 1);
      
      expect(() => disc(settlement, maturity, 95, 100))
        .toThrow(FormulaError);
    });
  });

  describe('DURATION function', () => {
    test('calculates bond duration', () => {
      const settlement = new Date(2020, 0, 1);
      const maturity = new Date(2025, 0, 1);
      
      const result = duration(settlement, maturity, 0.08, 0.09);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('EFFECT function', () => {
    test('calculates effective interest rate', () => {
      const result = effect(0.1, 4);
      expect(result).toBeGreaterThan(0.1);
    });

    test('handles invalid inputs', () => {
      expect(() => effect(-0.1, 4)).toThrow(FormulaError);
      expect(() => effect(0.1, 0)).toThrow(FormulaError);
    });
  });

  describe('PRICE function', () => {
    test('calculates bond price', () => {
      const settlement = new Date(2020, 0, 1);
      const maturity = new Date(2025, 0, 1);
      
      const result = price(settlement, maturity, 0.08, 0.09);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('YIELD function', () => {
    test('calculates bond yield', () => {
      const settlement = new Date(2020, 0, 1);
      const maturity = new Date(2025, 0, 1);
      
      const result = yield_(settlement, maturity, 0.08, 95);
      expect(result).toBeGreaterThan(0);
    });
  });
});