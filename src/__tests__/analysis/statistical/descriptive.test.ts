import {
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateVariance,
  calculateStandardDeviation,
  calculateSkewness,
  calculateKurtosis
} from '../../../analysis/statistical/descriptive';

describe('Descriptive Statistics', () => {
  const testData = [2, 4, 4, 4, 5, 5, 7, 9];

  test('calculates mean', () => {
    expect(calculateMean(testData)).toBe(5);
    expect(calculateMean([])).toBe(0);
  });

  test('calculates median', () => {
    expect(calculateMedian(testData)).toBe(4.5);
    expect(calculateMedian([1, 2, 3])).toBe(2);
    expect(calculateMedian([])).toBe(0);
  });

  test('calculates mode', () => {
    expect(calculateMode(testData)).toEqual([4]);
    expect(calculateMode([1, 1, 2, 2])).toEqual([1, 2]);
    expect(calculateMode([])).toEqual([]);
  });

  test('calculates variance', () => {
    expect(calculateVariance(testData)).toBeCloseTo(4.57, 2);
    expect(calculateVariance([1])).toBe(0);
    expect(calculateVariance([])).toBe(0);
  });

  test('calculates standard deviation', () => {
    expect(calculateStandardDeviation(testData)).toBeCloseTo(2.14, 2);
    expect(calculateStandardDeviation([1])).toBe(0);
    expect(calculateStandardDeviation([])).toBe(0);
  });

  test('calculates skewness', () => {
    expect(calculateSkewness(testData)).toBeCloseTo(0.61, 2);
    expect(calculateSkewness([1, 1])).toBe(0);
    expect(calculateSkewness([])).toBe(0);
  });

  test('calculates kurtosis', () => {
    expect(calculateKurtosis(testData)).toBeCloseTo(-0.95, 2);
    expect(calculateKurtosis([1, 1, 1])).toBe(0);
    expect(calculateKurtosis([])).toBe(0);
  });
});