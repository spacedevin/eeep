import {
  pearsonCorrelation,
  spearmanCorrelation,
  kendallCorrelation
} from '../../../analysis/statistical/correlation';

describe('Correlation Analysis', () => {
  describe('Pearson Correlation', () => {
    test('calculates perfect positive correlation', () => {
      const x = [1, 2, 3, 4, 5];
      const y = [2, 4, 6, 8, 10];
      
      const result = pearsonCorrelation(x, y);
      expect(result.coefficient).toBeCloseTo(1, 6);
      expect(result.pValue).toBeLessThan(0.05);
    });

    test('calculates perfect negative correlation', () => {
      const x = [1, 2, 3, 4, 5];
      const y = [10, 8, 6, 4, 2];
      
      const result = pearsonCorrelation(x, y);
      expect(result.coefficient).toBeCloseTo(-1, 6);
      expect(result.pValue).toBeLessThan(0.05);
    });

    test('calculates no correlation', () => {
      const x = [1, 2, 3, 4, 5];
      const y = [5, 2, 4, 1, 3];
      
      const result = pearsonCorrelation(x, y);
      expect(Math.abs(result.coefficient)).toBeLessThan(0.5);
      expect(result.pValue).toBeGreaterThan(0.05);
    });
  });

  describe('Spearman Correlation', () => {
    test('calculates monotonic relationship', () => {
      const x = [1, 2, 3, 4, 5];
      const y = [1, 4, 9, 16, 25];
      
      const result = spearmanCorrelation(x, y);
      expect(result.coefficient).toBeCloseTo(1, 6);
      expect(result.pValue).toBeLessThan(0.05);
    });

    test('handles tied ranks', () => {
      const x = [1, 2, 2, 3, 4];
      const y = [2, 3, 3, 4, 5];
      
      const result = spearmanCorrelation(x, y);
      expect(result.coefficient).toBeGreaterThan(0.8);
      expect(result.pValue).toBeLessThan(0.05);
    });
  });

  describe('Kendall Correlation', () => {
    test('calculates concordant pairs', () => {
      const x = [1, 2, 3, 4];
      const y = [1, 2, 3, 4];
      
      const result = kendallCorrelation(x, y);
      expect(result.coefficient).toBeCloseTo(1, 6);
      expect(result.pValue).toBeLessThan(0.05);
    });

    test('calculates discordant pairs', () => {
      const x = [1, 2, 3, 4];
      const y = [4, 3, 2, 1];
      
      const result = kendallCorrelation(x, y);
      expect(result.coefficient).toBeCloseTo(-1, 6);
      expect(result.pValue).toBeLessThan(0.05);
    });
  });

  describe('Error Handling', () => {
    test('throws error for mismatched array lengths', () => {
      const x = [1, 2, 3];
      const y = [1, 2];
      
      expect(() => pearsonCorrelation(x, y)).toThrow();
      expect(() => spearmanCorrelation(x, y)).toThrow();
      expect(() => kendallCorrelation(x, y)).toThrow();
    });

    test('throws error for insufficient data points', () => {
      const x = [1];
      const y = [1];
      
      expect(() => pearsonCorrelation(x, y)).toThrow();
      expect(() => spearmanCorrelation(x, y)).toThrow();
      expect(() => kendallCorrelation(x, y)).toThrow();
    });
  });
});