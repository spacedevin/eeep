import { FormulaError } from '../../errors';
import { erf, gammaLn, incompleteBeta } from '../statistical/utils';

export function betadist(x: number, alpha: number, beta: number, cumulative: boolean = true): number {
  try {
    if (x < 0 || x > 1) {
      throw new Error('x must be between 0 and 1');
    }
    if (alpha <= 0 || beta <= 0) {
      throw new Error('alpha and beta must be positive');
    }

    if (cumulative) {
      return incompleteBeta(x, alpha, beta);
    } else {
      return Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1) / betaFunction(alpha, beta);
    }
  } catch (error) {
    throw new FormulaError('Error in BETADIST function', error);
  }
}

export function expondist(x: number, lambda: number, cumulative: boolean): number {
  try {
    if (x < 0) {
      throw new Error('x must be non-negative');
    }
    if (lambda <= 0) {
      throw new Error('lambda must be positive');
    }

    if (cumulative) {
      return 1 - Math.exp(-lambda * x);
    } else {
      return lambda * Math.exp(-lambda * x);
    }
  } catch (error) {
    throw new FormulaError('Error in EXPONDIST function', error);
  }
}

export function gammadist(x: number, alpha: number, beta: number, cumulative: boolean): number {
  try {
    if (x < 0) {
      throw new Error('x must be non-negative');
    }
    if (alpha <= 0 || beta <= 0) {
      throw new Error('alpha and beta must be positive');
    }

    const gamma = Math.exp(gammaLn(alpha));
    if (cumulative) {
      return lowerGamma(alpha, x / beta) / gamma;
    } else {
      return Math.pow(x, alpha - 1) * Math.exp(-x / beta) / (gamma * Math.pow(beta, alpha));
    }
  } catch (error) {
    throw new FormulaError('Error in GAMMADIST function', error);
  }
}

export function hypgeomdist(sampleS: number, numberSample: number, populationS: number, numberPop: number): number {
  try {
    if (!Number.isInteger(sampleS) || !Number.isInteger(numberSample) ||
        !Number.isInteger(populationS) || !Number.isInteger(numberPop)) {
      throw new Error('All parameters must be integers');
    }

    if (sampleS < 0 || numberSample < 0 || populationS < 0 || numberPop < 0) {
      throw new Error('All parameters must be non-negative');
    }

    if (numberSample > numberPop || populationS > numberPop) {
      throw new Error('Sample size and successes cannot exceed population');
    }

    return (combination(populationS, sampleS) * combination(numberPop - populationS, numberSample - sampleS)) /
           combination(numberPop, numberSample);
  } catch (error) {
    throw new FormulaError('Error in HYPGEOMDIST function', error);
  }
}

export function lognormdist(x: number, mean: number, standardDev: number, cumulative: boolean = true): number {
  try {
    if (x <= 0) {
      throw new Error('x must be positive');
    }
    if (standardDev <= 0) {
      throw new Error('Standard deviation must be positive');
    }

    const logX = Math.log(x);
    if (cumulative) {
      return 0.5 + 0.5 * erf((logX - mean) / (standardDev * Math.sqrt(2)));
    } else {
      const exponent = -Math.pow(logX - mean, 2) / (2 * Math.pow(standardDev, 2));
      return Math.exp(exponent) / (x * standardDev * Math.sqrt(2 * Math.PI));
    }
  } catch (error) {
    throw new FormulaError('Error in LOGNORMDIST function', error);
  }
}

export function negbinomdist(numberF: number, numberS: number, probabilityS: number): number {
  try {
    if (!Number.isInteger(numberF) || !Number.isInteger(numberS)) {
      throw new Error('Number of failures and successes must be integers');
    }
    if (numberF < 0 || numberS < 0) {
      throw new Error('Numbers must be non-negative');
    }
    if (probabilityS <= 0 || probabilityS > 1) {
      throw new Error('Probability must be between 0 and 1');
    }

    return combination(numberF + numberS - 1, numberF) *
           Math.pow(probabilityS, numberS) *
           Math.pow(1 - probabilityS, numberF);
  } catch (error) {
    throw new FormulaError('Error in NEGBINOMDIST function', error);
  }
}

export function weibull(x: number, alpha: number, beta: number, cumulative: boolean): number {
  try {
    if (x < 0) {
      throw new Error('x must be non-negative');
    }
    if (alpha <= 0 || beta <= 0) {
      throw new Error('alpha and beta must be positive');
    }

    if (cumulative) {
      return 1 - Math.exp(-Math.pow(x / beta, alpha));
    } else {
      return (alpha / Math.pow(beta, alpha)) *
             Math.pow(x, alpha - 1) *
             Math.exp(-Math.pow(x / beta, alpha));
    }
  } catch (error) {
    throw new FormulaError('Error in WEIBULL function', error);
  }
}

// Helper functions
function betaFunction(a: number, b: number): number {
  return Math.exp(gammaLn(a) + gammaLn(b) - gammaLn(a + b));
}

function lowerGamma(s: number, x: number): number {
  let sum = 0;
  let term = x;
  for (let k = 1; k < 1000; k++) {
    sum += term;
    term *= x * (s - k) / (k * (k + 1));
    if (Math.abs(term) < 1e-10) break;
  }
  return Math.pow(x, s) * Math.exp(-x) * sum;
}

function combination(n: number, k: number): number {
  return Math.exp(gammaLn(n + 1) - gammaLn(k + 1) - gammaLn(n - k + 1));
}