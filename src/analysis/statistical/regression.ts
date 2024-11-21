import { StatisticalState } from '../../../spec/Statistical';
import { FormulaError } from '../../errors';

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

export function polynomialRegression(
  xValues: number[],
  yValues: number[],
  degree: number
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

    if (degree < 1) {
      throw new Error('Degree must be at least 1');
    }

    const n = xValues.length;
    const matrix: number[][] = [];
    const vector: number[] = [];

    // Build the matrix and vector for the normal equations
    for (let i = 0; i <= degree; i++) {
      matrix[i] = [];
      for (let j = 0; j <= degree; j++) {
        matrix[i][j] = xValues.reduce((sum, x) => sum + Math.pow(x, i + j), 0);
      }
      vector[i] = xValues.reduce((sum, x, k) => sum + Math.pow(x, i) * yValues[k], 0);
    }

    // Solve the system using Gaussian elimination
    const coefficients = solveSystem(matrix, vector);

    // Calculate predictions
    const predictions = xValues.map(x => 
      coefficients.reduce((sum, coef, i) => sum + coef * Math.pow(x, i), 0)
    );

    // Calculate R-squared and standard error
    const yMean = yValues.reduce((a, b) => a + b, 0) / n;
    const totalSS = yValues.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
    const residualSS = yValues.reduce((sum, y, i) => sum + Math.pow(y - predictions[i], 2), 0);
    const rSquared = 1 - (residualSS / totalSS);
    const standardError = Math.sqrt(residualSS / (n - degree - 1));

    return {
      coefficients,
      rSquared,
      standardError,
      predictions
    };
  } catch (error) {
    throw new FormulaError('Error calculating polynomial regression', error);
  }
}

function solveSystem(matrix: number[][], vector: number[]): number[] {
  const n = matrix.length;
  const augmented = matrix.map((row, i) => [...row, vector[i]]);

  // Gaussian elimination
  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(augmented[j][i]) > Math.abs(augmented[maxRow][i])) {
        maxRow = j;
      }
    }

    [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

    for (let j = i + 1; j < n; j++) {
      const factor = augmented[j][i] / augmented[i][i];
      for (let k = i; k <= n; k++) {
        augmented[j][k] -= factor * augmented[i][k];
      }
    }
  }

  // Back substitution
  const solution = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += augmented[i][j] * solution[j];
    }
    solution[i] = (augmented[i][n] - sum) / augmented[i][i];
  }

  return solution;
}

export function logisticRegression(
  xValues: number[],
  yValues: number[],
  maxIterations: number = 100,
  learningRate: number = 0.1
): {
  coefficients: number[];
  accuracy: number;
  predictions: number[];
} {
  try {
    if (xValues.length !== yValues.length) {
      throw new Error('Input arrays must have the same length');
    }

    if (!yValues.every(y => y === 0 || y === 1)) {
      throw new Error('Y values must be binary (0 or 1)');
    }

    const n = xValues.length;
    let coefficients = [0, 0]; // [intercept, slope]
    
    // Gradient descent
    for (let iter = 0; iter < maxIterations; iter++) {
      const predictions = xValues.map(x => sigmoid(coefficients[0] + coefficients[1] * x));
      
      // Calculate gradients
      const gradientIntercept = predictions.reduce((sum, p, i) => sum + (p - yValues[i]), 0) / n;
      const gradientSlope = predictions.reduce((sum, p, i) => sum + (p - yValues[i]) * xValues[i], 0) / n;
      
      // Update coefficients
      coefficients[0] -= learningRate * gradientIntercept;
      coefficients[1] -= learningRate * gradientSlope;
    }

    // Calculate final predictions
    const predictions = xValues.map(x => sigmoid(coefficients[0] + coefficients[1] * x));
    
    // Calculate accuracy
    const accuracy = predictions.reduce((sum, p, i) => {
      const predicted = p >= 0.5 ? 1 : 0;
      return sum + (predicted === yValues[i] ? 1 : 0);
    }, 0) / n;

    return {
      coefficients,
      accuracy,
      predictions
    };
  } catch (error) {
    throw new FormulaError('Error calculating logistic regression', error);
  }
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

export function ridgeRegression(
  xValues: number[],
  yValues: number[],
  alpha: number = 0.1
): {
  coefficients: number[];
  rSquared: number;
  predictions: number[];
} {
  try {
    if (xValues.length !== yValues.length) {
      throw new Error('Input arrays must have the same length');
    }

    const n = xValues.length;
    const X = xValues.map(x => [1, x]); // Add intercept term
    const y = yValues;

    // Add regularization term (alpha * I) to X'X
    const XtX = multiply(transpose(X), X);
    for (let i = 0; i < XtX.length; i++) {
      XtX[i][i] += alpha;
    }

    const Xty = multiply(transpose(X), [y])[0];
    const coefficients = solveSystem(XtX, Xty);

    // Calculate predictions
    const predictions = xValues.map(x => coefficients[0] + coefficients[1] * x);

    // Calculate R-squared
    const yMean = yValues.reduce((a, b) => a + b, 0) / n;
    const totalSS = yValues.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
    const residualSS = yValues.reduce((sum, y, i) => sum + Math.pow(y - predictions[i], 2), 0);
    const rSquared = 1 - (residualSS / totalSS);

    return {
      coefficients,
      rSquared,
      predictions
    };
  } catch (error) {
    throw new FormulaError('Error calculating ridge regression', error);
  }
}

function multiply(a: number[][], b: number[][]): number[][] {
  const result: number[][] = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      result[i][j] = 0;
      for (let k = 0; k < a[0].length; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

function transpose(matrix: number[][]): number[][] {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

export function lassoRegression(
  xValues: number[],
  yValues: number[],
  alpha: number = 0.1,
  maxIterations: number = 1000,
  tolerance: number = 1e-4
): {
  coefficients: number[];
  rSquared: number;
  predictions: number[];
} {
  try {
    if (xValues.length !== yValues.length) {
      throw new Error('Input arrays must have the same length');
    }

    const n = xValues.length;
    let coefficients = [0, 0]; // [intercept, slope]
    let oldCoefficients: number[];
    
    // Coordinate descent
    for (let iter = 0; iter < maxIterations; iter++) {
      oldCoefficients = [...coefficients];
      
      // Update intercept (no regularization)
      const residuals = yValues.map((y, i) => y - coefficients[1] * xValues[i]);
      coefficients[0] = residuals.reduce((a, b) => a + b, 0) / n;
      
      // Update slope with soft thresholding
      const correlations = xValues.map((x, i) => x * (yValues[i] - coefficients[0]));
      const correlation = correlations.reduce((a, b) => a + b, 0);
      coefficients[1] = softThreshold(correlation, alpha * n) / 
                       xValues.reduce((a, x) => a + x * x, 0);
      
      // Check convergence
      if (coefficients.every((c, i) => Math.abs(c - oldCoefficients[i]) < tolerance)) {
        break;
      }
    }

    // Calculate predictions
    const predictions = xValues.map(x => coefficients[0] + coefficients[1] * x);

    // Calculate R-squared
    const yMean = yValues.reduce((a, b) => a + b, 0) / n;
    const totalSS = yValues.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
    const residualSS = yValues.reduce((sum, y, i) => sum + Math.pow(y - predictions[i], 2), 0);
    const rSquared = 1 - (residualSS / totalSS);

    return {
      coefficients,
      rSquared,
      predictions
    };
  } catch (error) {
    throw new FormulaError('Error calculating lasso regression', error);
  }
}

function softThreshold(x: number, lambda: number): number {
  if (x > lambda) return x - lambda;
  if (x < -lambda) return x + lambda;
  return 0;
}