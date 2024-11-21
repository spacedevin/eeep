import { FormulaError } from '../../errors';
import { erf } from '../statistical/utils';

export function normDist(x: number, mean: number, standardDev: number, cumulative: boolean): number {
  try {
    if (standardDev <= 0) {
      throw new Error('Standard deviation must be positive');
    }

    if (cumulative) {
      const z = (x - mean) / (standardDev * Math.sqrt(2));
      return 0.5 * (1 + erf(z));
    } else {
      const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(standardDev, 2));
      return (1 / (standardDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
    }
  } catch (error) {
    throw new FormulaError('Error in NORMDIST function', error);
  }
}

export function normInv(probability: number, mean: number, standardDev: number): number {
  try {
    if (probability <= 0 || probability >= 1) {
      throw new Error('Probability must be between 0 and 1');
    }
    if (standardDev <= 0) {
      throw new Error('Standard deviation must be positive');
    }

    // Newton-Raphson method
    let x = mean;
    let h = 1;
    while (Math.abs(h) > 1e-10) {
      const fx = normDist(x, mean, standardDev, true) - probability;
      const dfx = normDist(x, mean, standardDev, false);
      h = fx / dfx;
      x -= h;
    }
    return x;
  } catch (error) {
    throw new FormulaError('Error in NORMINV function', error);
  }
}

export function normSDist(z: number): number {
  try {
    return normDist(z, 0, 1, true);
  } catch (error) {
    throw new FormulaError('Error in NORMSDIST function', error);
  }
}

export function normSInv(probability: number): number {
  try {
    return normInv(probability, 0, 1);
  } catch (error) {
    throw new FormulaError('Error in NORMSINV function', error);
  }
}

export function standardize(x: number, mean: number, standardDev: number): number {
  try {
    if (standardDev <= 0) {
      throw new Error('Standard deviation must be positive');
    }
    return (x - mean) / standardDev;
  } catch (error) {
    throw new FormulaError('Error in STANDARDIZE function', error);
  }
}