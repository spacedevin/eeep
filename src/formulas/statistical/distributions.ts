import { FormulaError } from '../../errors';
import { erf, gammaLn, incompleteBeta, factorial, combinations, permutations } from './utils';

// Binomial Distribution Functions
export function binomDist(
  numberS: number,
  trials: number,
  probabilityS: number,
  cumulative: boolean
): number {
  try {
    if (numberS < 0 || trials < 0 || probabilityS < 0 || probabilityS > 1) {
      throw new Error('Invalid parameters');
    }

    if (!Number.isInteger(numberS) || !Number.isInteger(trials)) {
      throw new Error('Number of successes and trials must be integers');
    }

    if (numberS > trials) {
      throw new Error('Number of successes cannot exceed trials');
    }

    if (cumulative) {
      let sum = 0;
      for (let i = 0; i <= numberS; i++) {
        sum += combinations(trials, i) * Math.pow(probabilityS, i) * 
               Math.pow(1 - probabilityS, trials - i);
      }
      return sum;
    } else {
      return combinations(trials, numberS) * Math.pow(probabilityS, numberS) * 
             Math.pow(1 - probabilityS, trials - numberS);
    }
  } catch (error) {
    throw new FormulaError('Error in BINOMDIST function', error);
  }
}

// Hypergeometric Distribution Functions
export function hyperGeomDist(
  sampleS: number,
  numberSample: number,
  populationS: number,
  numberPop: number,
  cumulative: boolean
): number {
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

    if (sampleS > numberSample || sampleS > populationS) {
      throw new Error('Sample successes cannot exceed sample size or population successes');
    }

    if (cumulative) {
      let sum = 0;
      for (let i = 0; i <= sampleS; i++) {
        sum += (combinations(populationS, i) * combinations(numberPop - populationS, numberSample - i)) /
               combinations(numberPop, numberSample);
      }
      return sum;
    } else {
      return (combinations(populationS, sampleS) * combinations(numberPop - populationS, numberSample - sampleS)) /
             combinations(numberPop, numberSample);
    }
  } catch (error) {
    throw new FormulaError('Error in HYPGEOMDIST function', error);
  }
}

// Negative Binomial Distribution Functions
export function negBinomDist(
  numberF: number,
  numberS: number,
  probabilityS: number,
  cumulative: boolean
): number {
  try {
    if (numberF < 0 || numberS < 0 || probabilityS < 0 || probabilityS > 1) {
      throw new Error('Invalid parameters');
    }

    if (!Number.isInteger(numberF) || !Number.isInteger(numberS)) {
      throw new Error('Number of failures and successes must be integers');
    }

    if (cumulative) {
      let sum = 0;
      for (let i = 0; i <= numberF; i++) {
        sum += combinations(i + numberS - 1, i) * Math.pow(probabilityS, numberS) * 
               Math.pow(1 - probabilityS, i);
      }
      return sum;
    } else {
      return combinations(numberF + numberS - 1, numberF) * Math.pow(probabilityS, numberS) * 
             Math.pow(1 - probabilityS, numberF);
    }
  } catch (error) {
    throw new FormulaError('Error in NEGBINOMDIST function', error);
  }
}

// Poisson Distribution Functions
export function poissonDist(x: number, mean: number, cumulative: boolean): number {
  try {
    if (x < 0 || mean <= 0) {
      throw new Error('Invalid parameters');
    }

    if (!Number.isInteger(x)) {
      throw new Error('x must be an integer');
    }

    if (cumulative) {
      let sum = 0;
      for (let i = 0; i <= x; i++) {
        sum += Math.pow(mean, i) * Math.exp(-mean) / factorial(i);
      }
      return sum;
    } else {
      return Math.pow(mean, x) * Math.exp(-mean) / factorial(x);
    }
  } catch (error) {
    throw new FormulaError('Error in POISSON function', error);
  }
}

// Weibull Distribution Functions
export function weibullDist(
  x: number,
  alpha: number,
  beta: number,
  cumulative: boolean
): number {
  try {
    if (x < 0 || alpha <= 0 || beta <= 0) {
      throw new Error('Invalid parameters');
    }

    if (cumulative) {
      return 1 - Math.exp(-Math.pow(x / beta, alpha));
    } else {
      return (alpha / Math.pow(beta, alpha)) * Math.pow(x, alpha - 1) * 
             Math.exp(-Math.pow(x / beta, alpha));
    }
  } catch (error) {
    throw new FormulaError('Error in WEIBULL function', error);
  }
}

// Z-Test Function
export function zTest(array: number[], x: number, sigma?: number): number {
  try {
    if (!Array.isArray(array) || array.length < 2) {
      throw new Error('Array must contain at least 2 values');
    }

    const n = array.length;
    const mean = array.reduce((sum, val) => sum + val, 0) / n;
    
    if (sigma === undefined) {
      // Calculate sample standard deviation
      sigma = Math.sqrt(array.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1));
    }

    const standardError = sigma / Math.sqrt(n);
    const z = (mean - x) / standardError;
    
    // Return two-tailed p-value
    return 2 * (1 - normDist(Math.abs(z), 0, 1, true));
  } catch (error) {
    throw new FormulaError('Error in ZTEST function', error);
  }
}

// Normal Distribution Helper
function normDist(x: number, mean: number, stdDev: number, cumulative: boolean): number {
  if (cumulative) {
    const z = (x - mean) / (stdDev * Math.sqrt(2));
    return 0.5 * (1 + erf(z));
  } else {
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
  }
}