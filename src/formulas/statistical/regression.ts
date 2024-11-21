import { FormulaError } from '../../errors';
import * as formulajs from '@formulajs/formulajs';

export function linearRegression(
  xValues: number[],
  yValues: number[]
): {
  coefficients: number[];
  rSquared: number;
  standardError: number;
  predictions: number[];
} {
  try {
    if (xValues.length !== yValues.length) {
      throw new Error('Input arrays must have the same length');
    }

    const n = xValues.length;
    const sumX = xValues.reduce((a, b) => a + b, 0);
    const sumY = yValues.reduce((a, b) => a + b, 0);
    const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
    const sumXX = xValues.reduce((sum, x) => sum + x * x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Calculate R-squared
    const yMean = sumY / n;
    const totalSS = yValues.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
    const residualSS = yValues.reduce((sum, y, i) => {
      const predicted = slope * xValues[i] + intercept;
      return sum + Math.pow(y - predicted, 2);
    }, 0);
    const rSquared = 1 - (residualSS / totalSS);

    // Calculate standard error
    const standardError = Math.sqrt(residualSS / (n - 2));

    // Calculate predictions
    const predictions = xValues.map(x => slope * x + intercept);

    return {
      coefficients: [intercept, slope],
      rSquared,
      standardError,
      predictions
    };
  } catch (error) {
    throw new FormulaError('Error calculating linear regression', error);
  }
}