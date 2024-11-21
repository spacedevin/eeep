import {
  linearRegression,
  polynomialRegression
} from '../../../analysis/statistical/regression';

describe('Regression Analysis', () => {
  describe('Linear Regression', () => {
    test('calculates perfect linear relationship', () => {
      const x = [1, 2, 3, 4, 5];
      const y = [2, 4, 6, 8, 10]; // y = 2x
      
      const result = linearRegression(x, y);
      expect(result.coefficients[1]).toBeCloseTo(2, 6); // slope
      expect(result.coefficients[0]).toBeCloseTo(0, 6); // intercept
      expect(result.rSquared).toBeCloseTo(1, 6);
    });

    test('calculates approximate linear relationship', () => {
      const x = [1, 2, 3, 4, 5];
      const y = [2.1, 3.8, 6.2, 8.1, 9.8];
      
      const result = linearRegression(x, y);
      expect(result.rSquared).toBeGreaterThan(0.95);
      expect(result.standardError).toBeLessThan(0.5);
    });

    test('throws error for invalid input', () => {
      expect(() => linearRegression([1], [1])).toThrow();
      expect(() => linearRegression([1, 2], [1])).toThrow();
    });
  });

  describe('Polynomial Regression', () => {
    test('calculates quadratic relationship', () => {
      const x = [-2, -1, 0, 1, 2];
      const y = [4, 1, 0, 1, 4]; // y = x^2
      
      const result = polynomialRegression(x, y, 2);
      expect(result.coefficients[0]).toBeCloseTo(0, 1); // constant term
      expect(result.coefficients[1]).toBeCloseTo(0, 1); // x term
      expect(result.coefficients[2]).toBeCloseTo(1, 1); // x^2 term
      expect(result.rSquared).toBeCloseTo(1, 6);
    });

    test('calculates cubic relationship', () => {
      const x = [-2, -1, 0, 1, 2];
      const y = [-8, -1, 0, 1, 8]; // y = x^3
      
      const result = polynomialRegression(x, y, 3);
      expect(result.coefficients[3]).toBeCloseTo(1, 1); // x^3 term
      expect(result.rSquared).toBeCloseTo(1, 6);
    });

    test('throws error for insufficient data points', () => {
      expect(() => polynomialRegression([1, 2], [1, 2], 2)).toThrow();
    });
  });
});