import { FormulaError } from '../errors';
import { erf, gammaLn, incompleteBeta } from './statistical/utils';

export function betadist(x: number, alpha: number, beta: number): number {
  try {
    if (x < 0 || x > 1) {
      throw new Error('x must be between 0 and 1');
    }
    if (alpha <= 0 || beta <= 0) {
      throw new Error('alpha and beta must be positive');
    }

    return incompleteBeta(x, alpha, beta);
  } catch (error) {
    throw new FormulaError('Error in BETADIST function', error);
  }
}

export function betainv(probability: number, alpha: number, beta: number): number {
  try {
    if (probability < 0 || probability > 1) {
      throw new Error('Probability must be between 0 and 1');
    }
    if (alpha <= 0 || beta <= 0) {
      throw new Error('alpha and beta must be positive');
    }

    // Newton-Raphson method for inverse beta
    let x = 0.5;
    let h = 1;
    while (Math.abs(h) > 1e-10) {
      const fx = incompleteBeta(x, alpha, beta) - probability;
      const dfx = Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1) / gammaLn(alpha + beta);
      h = fx / dfx;
      x = x - h;
    }
    return x;
  } catch (error) {
    throw new FormulaError('Error in BETAINV function', error);
  }
}

export function binomdist(number: number, trials: number, probability: number, cumulative: boolean): number {
  try {
    if (number < 0 || trials < 0 || probability < 0 || probability > 1) {
      throw new Error('Invalid parameters');
    }

    if (cumulative) {
      let sum = 0;
      for (let i = 0; i <= number; i++) {
        sum += binomPMF(i, trials, probability);
      }
      return sum;
    }
    return binomPMF(number, trials, probability);
  } catch (error) {
    throw new FormulaError('Error in BINOMDIST function', error);
  }
}

export function chidist(x: number, degFreedom: number): number {
  try {
    if (x < 0) {
      throw new Error('x must be non-negative');
    }
    if (degFreedom <= 0) {
      throw new Error('Degrees of freedom must be positive');
    }

    const halfDf = degFreedom / 2;
    return (Math.pow(x, halfDf - 1) * Math.exp(-x / 2)) / (Math.pow(2, halfDf) * gammaLn(halfDf));
  } catch (error) {
    throw new FormulaError('Error in CHIDIST function', error);
  }
}

export function chiinv(probability: number, degFreedom: number): number {
  try {
    if (probability < 0 || probability > 1) {
      throw new Error('Probability must be between 0 and 1');
    }
    if (degFreedom <= 0) {
      throw new Error('Degrees of freedom must be positive');
    }

    // Newton-Raphson method for inverse chi-square
    let x = degFreedom;
    let h = 1;
    while (Math.abs(h) > 1e-10) {
      const fx = chidist(x, degFreedom) - probability;
      const dfx = -chidist(x, degFreedom) / x;
      h = fx / dfx;
      x = x - h;
    }
    return x;
  } catch (error) {
    throw new FormulaError('Error in CHIINV function', error);
  }
}

export function chitest(actual: number[][], expected: number[][]): number {
  try {
    if (!Array.isArray(actual) || !Array.isArray(expected)) {
      throw new Error('Actual and expected must be arrays');
    }

    let chiSquare = 0;
    let degFreedom = 0;

    for (let i = 0; i < actual.length; i++) {
      for (let j = 0; j < actual[i].length; j++) {
        const diff = actual[i][j] - expected[i][j];
        chiSquare += (diff * diff) / expected[i][j];
        degFreedom++;
      }
    }

    degFreedom--; // Adjust degrees of freedom
    return chidist(chiSquare, degFreedom);
  } catch (error) {
    throw new FormulaError('Error in CHITEST function', error);
  }
}

export function fdist(x: number, degFreedom1: number, degFreedom2: number): number {
  try {
    if (x < 0) {
      throw new Error('x must be non-negative');
    }
    if (degFreedom1 <= 0 || degFreedom2 <= 0) {
      throw new Error('Degrees of freedom must be positive');
    }

    const p = degFreedom1 * x / (degFreedom1 * x + degFreedom2);
    return incompleteBeta(p, degFreedom1 / 2, degFreedom2 / 2);
  } catch (error) {
    throw new FormulaError('Error in FDIST function', error);
  }
}

export function finv(probability: number, degFreedom1: number, degFreedom2: number): number {
  try {
    if (probability < 0 || probability > 1) {
      throw new Error('Probability must be between 0 and 1');
    }
    if (degFreedom1 <= 0 || degFreedom2 <= 0) {
      throw new Error('Degrees of freedom must be positive');
    }

    // Newton-Raphson method for inverse F
    let x = 1;
    let h = 1;
    while (Math.abs(h) > 1e-10) {
      const fx = fdist(x, degFreedom1, degFreedom2) - probability;
      const dfx = -fdist(x, degFreedom1, degFreedom2) / x;
      h = fx / dfx;
      x = x - h;
    }
    return x;
  } catch (error) {
    throw new FormulaError('Error in FINV function', error);
  }
}

// Helper functions
function binomPMF(k: number, n: number, p: number): number {
  return combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function combination(n: number, k: number): number {
  return Math.exp(gammaLn(n + 1) - gammaLn(k + 1) - gammaLn(n - k + 1));
}