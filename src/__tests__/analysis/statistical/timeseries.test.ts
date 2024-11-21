import {
  movingAverage,
  exponentialSmoothing,
  detectSeasonality,
  analyzeTrend
} from '../../../analysis/statistical/timeseries';

describe('Time Series Analysis', () => {
  describe('Moving Average', () => {
    test('calculates simple moving average', () => {
      const data = [1, 2, 3, 4, 5];
      const result = movingAverage(data, 3);
      expect(result).toHaveLength(3);
      expect(result[0]).toBe(2); // (1 + 2 + 3) / 3
      expect(result[1]).toBe(3); // (2 + 3 + 4) / 3
      expect(result[2]).toBe(4); // (3 + 4 + 5) / 3
    });

    test('throws error for invalid window size', () => {
      const data = [1, 2, 3, 4, 5];
      expect(() => movingAverage(data, 0)).toThrow();
      expect(() => movingAverage(data, 6)).toThrow();
    });
  });

  describe('Exponential Smoothing', () => {
    test('performs simple exponential smoothing', () => {
      const data = [1, 2, 3, 4, 5];
      const result = exponentialSmoothing(data, 0.5);
      expect(result).toHaveLength(5);
      expect(result[1]).toBeCloseTo(1.5, 6);
    });

    test('performs double exponential smoothing', () => {
      const data = [1, 2, 3, 4, 5];
      const result = exponentialSmoothing(data, 0.5, 0.5);
      expect(result).toHaveLength(5);
    });

    test('performs triple exponential smoothing', () => {
      const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const result = exponentialSmoothing(data, 0.5, 0.5, 0.5, 4);
      expect(result).toHaveLength(12);
    });

    test('validates smoothing parameters', () => {
      const data = [1, 2, 3, 4, 5];
      expect(() => exponentialSmoothing(data, -0.1)).toThrow();
      expect(() => exponentialSmoothing(data, 1.1)).toThrow();
    });
  });

  describe('Seasonality Detection', () => {
    test('detects simple seasonality', () => {
      const data = [
        1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3,
        1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3
      ];
      const period = detectSeasonality(data);
      expect(period).toBe(3);
    });

    test('returns null for insufficient data', () => {
      const data = [1, 2, 3, 4, 5];
      const period = detectSeasonality(data);
      expect(period).toBeNull();
    });
  });

  describe('Trend Analysis', () => {
    test('analyzes linear trend', () => {
      const data = [1, 2, 3, 4, 5];
      const { trend, slope, intercept } = analyzeTrend(data);
      
      expect(trend).toHaveLength(5);
      expect(slope).toBeCloseTo(1, 6);
      expect(intercept).toBeCloseTo(1, 6);
    });

    test('handles flat trend', () => {
      const data = [2, 2, 2, 2, 2];
      const { slope, intercept } = analyzeTrend(data);
      
      expect(slope).toBeCloseTo(0, 6);
      expect(intercept).toBeCloseTo(2, 6);
    });
  });
});