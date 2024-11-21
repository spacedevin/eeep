import {
  normalDistribution,
  normalCDF,
  tDistribution,
  chiSquareDistribution,
  fDistribution
} from '../../../analysis/statistical/distribution';

describe('Distribution Functions', () => {
  test('calculates normal distribution', () => {
    expect(normalDistribution(0, 0, 1)).toBeCloseTo(0.3989, 4);
    expect(normalDistribution(1, 0, 1)).toBeCloseTo(0.2420, 4);
    expect(normalDistribution(0, 1, 2)).toBeCloseTo(0.1760, 4);
  });

  test('calculates normal CDF', () => {
    expect(normalCDF(0, 0, 1)).toBeCloseTo(0.5, 4);
    expect(normalCDF(1, 0, 1)).toBeCloseTo(0.8413, 4);
    expect(normalCDF(-1, 0, 1)).toBeCloseTo(0.1587, 4);
  });

  test('calculates t-distribution', () => {
    expect(tDistribution(0, 1)).toBeCloseTo(0.3183, 4);
    expect(tDistribution(1, 1)).toBeCloseTo(0.1592, 4);
    expect(tDistribution(0, 2)).toBeCloseTo(0.3535, 4);
  });

  test('calculates chi-square distribution', () => {
    expect(chiSquareDistribution(1, 1)).toBeCloseTo(0.2420, 4);
    expect(chiSquareDistribution(2, 2)).toBeCloseTo(0.1839, 4);
    expect(chiSquareDistribution(0, 1)).toBe(0);
  });

  test('calculates F-distribution', () => {
    expect(fDistribution(1, 1, 1)).toBeCloseTo(0.1592, 4);
    expect(fDistribution(2, 2, 2)).toBeCloseTo(0.1111, 4);
    expect(fDistribution(0, 1, 1)).toBe(0);
  });
});