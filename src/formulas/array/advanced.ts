import { FormulaError } from '../../errors';

export function linest(
  knownY: number[],
  knownX?: number[][],
  useConst: boolean = true,
  stats: boolean = false
): number[][] {
  try {
    // Validate inputs
    if (!knownY.length) {
      throw new Error('Known Y values are required');
    }

    // Create default X values if not provided
    const defaultX = Array.from({ length: knownY.length }, (_, i) => [i + 1]);
    const xValues = knownX || defaultX;

    // Perform linear regression
    const { slope, intercept, rSquared = 0, standardError = 0, fStatistic = 0, degreesOfFreedom = 0 } = 
      linearRegression(xValues.map(x => x[0]), knownY, useConst, true);

    if (!stats) {
      return [[slope, intercept]];
    }

    // Return full statistics array
    return [
      [slope, intercept],
      [standardError, standardError],
      [rSquared, standardError],
      [fStatistic, degreesOfFreedom],
      [0, 0] // Regression/residual sum of squares
    ];
  } catch (error) {
    throw new FormulaError('Error in LINEST function', error);
  }
}

function linearRegression(
  x: number[],
  y: number[],
  useConst: boolean = true,
  fullStats: boolean = false
): {
  slope: number;
  intercept: number;
  rSquared?: number;
  standardError?: number;
  fStatistic?: number;
  degreesOfFreedom?: number;
} {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

  let slope: number;
  let intercept: number;

  if (useConst) {
    slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    intercept = (sumY - slope * sumX) / n;
  } else {
    slope = sumXY / sumXX;
    intercept = 0;
  }

  if (!fullStats) {
    return { slope, intercept };
  }

  // Calculate additional statistics
  const predictions = x.map(xi => intercept + slope * xi);
  const residuals = y.map((yi, i) => yi - predictions[i]);
  const rss = residuals.reduce((sum, r) => sum + r * r, 0);
  const yMean = sumY / n;
  const tss = y.reduce((sum, yi) => sum + Math.pow(yi - yMean, 2), 0);
  const rSquared = 1 - rss / tss;
  const degreesOfFreedom = useConst ? n - 2 : n - 1;
  const standardError = Math.sqrt(rss / degreesOfFreedom);
  const fStatistic = ((tss - rss) / (useConst ? 1 : 0)) / (rss / degreesOfFreedom);

  return {
    slope,
    intercept,
    rSquared,
    standardError,
    fStatistic,
    degreesOfFreedom
  };
}