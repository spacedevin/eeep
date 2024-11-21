import {
  fv,
  pv,
  pmt,
  nper,
  rate,
  irr,
  xirr,
  npv,
  xnpv,
  mirr,
  db,
  ddb,
  sln,
  syd,
  vdb
} from '../../formulas/financial';
import { FormulaError } from '../../errors';

describe('Financial Functions', () => {
  describe('Basic Financial Functions', () => {
    test('FV function', () => {
      expect(fv(0.1, 10, -100)).toBeCloseTo(-1593.74, 2);
      expect(fv(0.1, 10, -100, -1000)).toBeCloseTo(-4143.74, 2);
    });

    test('PV function', () => {
      expect(pv(0.1, 10, -100)).toBeCloseTo(614.46, 2);
      expect(pv(0.1, 10, -100, 1000)).toBeCloseTo(852.16, 2);
    });

    test('PMT function', () => {
      expect(pmt(0.1, 10, 1000)).toBeCloseTo(-162.75, 2);
      expect(pmt(0.1, 10, 1000, 0, 1)).toBeCloseTo(-147.95, 2);
    });

    test('NPER function', () => {
      expect(nper(0.1, -100, 1000)).toBeCloseTo(14.21, 2);
      expect(nper(0.1, -100, 1000, 0, 1)).toBeCloseTo(13.49, 2);
    });

    test('RATE function', () => {
      expect(rate(10, -100, 1000)).toBeCloseTo(-0.0931, 4);
      expect(rate(10, -100, 1000, 0, 1)).toBeCloseTo(-0.0851, 4);
    });
  });

  describe('Investment Functions', () => {
    test('IRR function', () => {
      const values = [-100, 39, 59, 55, 20];
      expect(irr(values)).toBeCloseTo(0.2812, 4);
    });

    test('XIRR function', () => {
      const values = [-100, 39, 59, 55, 20];
      const dates = [
        new Date(2020, 0, 1),
        new Date(2020, 3, 1),
        new Date(2020, 6, 1),
        new Date(2020, 9, 1),
        new Date(2020, 11, 31)
      ];
      expect(xirr(values, dates)).toBeCloseTo(0.3707, 4);
    });

    test('NPV function', () => {
      const values = [-100, 39, 59, 55, 20];
      expect(npv(0.1, values)).toBeCloseTo(33.72, 2);
    });

    test('XNPV function', () => {
      const values = [-100, 39, 59, 55, 20];
      const dates = [
        new Date(2020, 0, 1),
        new Date(2020, 3, 1),
        new Date(2020, 6, 1),
        new Date(2020, 9, 1),
        new Date(2020, 11, 31)
      ];
      expect(xnpv(0.1, values, dates)).toBeCloseTo(35.54, 2);
    });

    test('MIRR function', () => {
      const values = [-100, 39, 59, 55, 20];
      expect(mirr(values, 0.1, 0.12)).toBeCloseTo(0.2099, 4);
    });
  });

  describe('Depreciation Functions', () => {
    test('DB function', () => {
      expect(db(1000000, 100000, 6, 1)).toBeCloseTo(186083.33, 2);
      expect(db(1000000, 100000, 6, 2)).toBeCloseTo(259639.42, 2);
    });

    test('DDB function', () => {
      expect(ddb(1000000, 100000, 6, 1)).toBeCloseTo(333333.33, 2);
      expect(ddb(1000000, 100000, 6, 2)).toBeCloseTo(222222.22, 2);
    });

    test('SLN function', () => {
      expect(sln(1000000, 100000, 6)).toBeCloseTo(150000, 2);
    });

    test('SYD function', () => {
      expect(syd(1000000, 100000, 6, 1)).toBeCloseTo(257142.86, 2);
      expect(syd(1000000, 100000, 6, 2)).toBeCloseTo(214285.71, 2);
    });

    test('VDB function', () => {
      expect(vdb(1000000, 100000, 6, 0, 1)).toBeCloseTo(333333.33, 2);
      expect(vdb(1000000, 100000, 6, 1, 2)).toBeCloseTo(222222.22, 2);
    });
  });

  describe('Error Handling', () => {
    test('handles invalid rates', () => {
      expect(() => fv(-2, 10, -100)).toThrow(FormulaError);
      expect(() => pv(-2, 10, -100)).toThrow(FormulaError);
      expect(() => rate(10, -100, -1000)).toThrow(FormulaError);
    });

    test('handles invalid cash flows', () => {
      expect(() => irr([])).toThrow(FormulaError);
      expect(() => npv(0.1, [])).toThrow(FormulaError);
      expect(() => mirr([], 0.1, 0.12)).toThrow(FormulaError);
    });

    test('handles invalid depreciation parameters', () => {
      expect(() => db(-1000, 100, 6, 1)).toThrow(FormulaError);
      expect(() => ddb(1000, -100, 6, 1)).toThrow(FormulaError);
      expect(() => sln(1000, 100, -6)).toThrow(FormulaError);
    });
  });
});