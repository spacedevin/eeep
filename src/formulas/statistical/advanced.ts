import { FormulaError } from '../../errors';
import { erf, gammaLn, incompleteBeta } from './utils';

// Distribution Functions
export function normDist(x: number, mean: number, stdDev: number, cumulative: boolean): number {
  try {
    if (stdDev <= 0) {
      throw new Error('Standard deviation must be positive');
    }

    if (cumulative) {
      const z = (x - mean) / (stdDev * Math.sqrt(2));
      return 0.5 * (1 + erf(z));
    } else {
      const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
      return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
    }
  } catch (error) {
    throw new FormulaError('Error in NORMDIST function', error);
  }
}

export function normInv(probability: number, mean: number, stdDev: number): number {
  try {
    if (probability <= 0 || probability >= 1) {
      throw new Error('Probability must be between 0 and 1');
    }
    if (stdDev <= 0) {
      throw new Error('Standard deviation must be positive');
    }

    // Newton-Raphson method for inverse normal
    let x = mean;
    let delta = stdDev;
    while (Math.abs(delta) > 1e-10) {
      const fx = normDist(x, mean, stdDev, true) - probability;
      const dfx = normDist(x, mean, stdDev, false);
      delta = fx / dfx;
      x -= delta;
    }
    return x;
  } catch (error) {
    throw new FormulaError('Error in NORMINV function', error);
  }
}

export function tDist(x: number, degFreedom: number, cumulative: boolean): number {
  try {
    if (degFreedom < 1) {
      throw new Error('Degrees of freedom must be positive');
    }

    const a = gammaLn((degFreedom + 1) / 2);
    const b = gammaLn(degFreedom / 2);
    const c = Math.sqrt(Math.PI * degFreedom);

    if (cumulative) {
      const beta = incompleteBeta(
        degFreedom / (degFreedom + x * x),
        degFreedom / 2,
        0.5
      );
      return 1 - 0.5 * beta;
    } else {
      return Math.exp(a - b) * Math.pow(1 + x * x / degFreedom, -(degFreedom + 1) / 2) / c;
    }
  } catch (error) {
    throw new FormulaError('Error in TDIST function', error);
  }
}

// Matrix Functions
export function munit(dimension: number): number[][] {
  try {
    if (!Number.isInteger(dimension) || dimension <= 0) {
      throw new Error('Dimension must be a positive integer');
    }

    const result: number[][] = Array(dimension).fill(0)
      .map(() => Array(dimension).fill(0));
    
    for (let i = 0; i < dimension; i++) {
      result[i][i] = 1;
    }
    
    return result;
  } catch (error) {
    throw new FormulaError('Error in MUNIT function', error);
  }
}

export function eigenvals(matrix: number[][]): number[] {
  try {
    const n = matrix.length;
    if (n !== matrix[0].length) {
      throw new Error('Matrix must be square');
    }

    // QR Algorithm implementation for eigenvalues
    let A = matrix.map(row => [...row]);
    const maxIter = 100;
    const tolerance = 1e-10;

    for (let iter = 0; iter < maxIter; iter++) {
      // QR decomposition
      const { Q, R } = qrDecomposition(A);
      const newA = multiplyMatrices(R, Q);

      // Check convergence
      let converged = true;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (i !== j && Math.abs(newA[i][j]) > tolerance) {
            converged = false;
            break;
          }
        }
      }

      if (converged) {
        return newA.map((row, i) => row[i]); // Diagonal elements are eigenvalues
      }

      A = newA;
    }

    throw new Error('Failed to converge');
  } catch (error) {
    throw new FormulaError('Error in EIGENVALS function', error);
  }
}

// Helper functions
function qrDecomposition(A: number[][]): { Q: number[][], R: number[][] } {
  const n = A.length;
  const Q: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
  const R: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));

  // Gram-Schmidt process
  for (let j = 0; j < n; j++) {
    let v = A.map(row => row[j]);

    for (let i = 0; i < j; i++) {
      const q = Q.map(row => row[i]);
      const dot = dotProduct(v, q);
      R[i][j] = dot;
      v = subtractVectors(v, scaleVector(q, dot));
    }

    const norm = Math.sqrt(dotProduct(v, v));
    R[j][j] = norm;

    if (norm > 0) {
      for (let i = 0; i < n; i++) {
        Q[i][j] = v[i] / norm;
      }
    }
  }

  return { Q, R };
}

function multiplyMatrices(A: number[][], B: number[][]): number[][] {
  const m = A.length;
  const n = B[0].length;
  const p = B.length;
  
  const result: number[][] = Array(m).fill(0).map(() => Array(n).fill(0));
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < p; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  
  return result;
}

function dotProduct(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function scaleVector(v: number[], scalar: number): number[] {
  return v.map(x => x * scalar);
}

function subtractVectors(a: number[], b: number[]): number[] {
  return a.map((x, i) => x - b[i]);
}