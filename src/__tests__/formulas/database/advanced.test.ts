import {
  dAverage,
  dCount,
  dCountA,
  dGet,
  dMax,
  dMin,
  dProduct,
  dStDev,
  dStDevP,
  dSum,
  dVar,
  dVarP
} from '../../../formulas/database/advanced';
import { FormulaError } from '../../../errors';

describe('Database Functions', () => {
  const database = [
    ['ID', 'Region', 'Sales'],
    [1, 'North', 100],
    [2, 'North', 200],
    [3, 'South', 300],
    [4, 'South', 400],
    [5, 'East', 500]
  ];

  const criteria = [
    ['Region', 'Sales'],
    ['North', '>150'],
    ['South', '>0']
  ];

  test('DAVERAGE function', () => {
    expect(dAverage(database, 'Sales', criteria)).toBeCloseTo(300, 2);
  });

  test('DCOUNT function', () => {
    expect(dCount(database, 'Sales', criteria)).toBe(3);
  });

  test('DCOUNTA function', () => {
    expect(dCountA(database, 'Region', criteria)).toBe(3);
  });

  test('DGET function', () => {
    const singleCriteria = [['Region'], ['North']];
    expect(() => dGet(database, 'Sales', criteria)).toThrow(); // Multiple matches
    expect(dGet(database, 'Sales', singleCriteria)).toBe(100); // Single match
  });

  test('DMAX function', () => {
    expect(dMax(database, 'Sales', criteria)).toBe(400);
  });

  test('DMIN function', () => {
    expect(dMin(database, 'Sales', criteria)).toBe(200);
  });

  test('DPRODUCT function', () => {
    expect(dProduct(database, 'Sales', criteria)).toBe(200 * 300 * 400);
  });

  test('DSTDEV function', () => {
    const result = dStDev(database, 'Sales', criteria);
    expect(result).toBeGreaterThan(0);
  });

  test('DSTDEVP function', () => {
    const result = dStDevP(database, 'Sales', criteria);
    expect(result).toBeGreaterThan(0);
  });

  test('DSUM function', () => {
    expect(dSum(database, 'Sales', criteria)).toBe(900);
  });

  test('DVAR function', () => {
    const result = dVar(database, 'Sales', criteria);
    expect(result).toBeGreaterThan(0);
  });

  test('DVARP function', () => {
    const result = dVarP(database, 'Sales', criteria);
    expect(result).toBeGreaterThan(0);
  });

  describe('Error Handling', () => {
    test('handles invalid database', () => {
      expect(() => dAverage([], 'Sales', criteria)).toThrow(FormulaError);
    });

    test('handles invalid field', () => {
      expect(() => dAverage(database, 'Invalid', criteria)).toThrow(FormulaError);
    });

    test('handles invalid criteria', () => {
      expect(() => dAverage(database, 'Sales', [])).toThrow(FormulaError);
    });

    test('handles no matching values', () => {
      const noMatchCriteria = [['Region'], ['West']];
      expect(() => dAverage(database, 'Sales', noMatchCriteria)).toThrow(FormulaError);
    });
  });
});