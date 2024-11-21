import { FormulaError } from '../../errors';
import * as bessel from 'bessel';

export function besseli(x: number, n: number): number {
  try {
    if (!Number.isInteger(n)) {
      throw new Error('Order must be an integer');
    }
    return bessel.besseli(x, n);
  } catch (error) {
    throw new FormulaError('Error in BESSELI function', error);
  }
}

export function besselj(x: number, n: number): number {
  try {
    if (!Number.isInteger(n)) {
      throw new Error('Order must be an integer');
    }
    return bessel.besselj(x, n);
  } catch (error) {
    throw new FormulaError('Error in BESSELJ function', error);
  }
}

export function besselk(x: number, n: number): number {
  try {
    if (!Number.isInteger(n)) {
      throw new Error('Order must be an integer');
    }
    return bessel.besselk(x, n);
  } catch (error) {
    throw new FormulaError('Error in BESSELK function', error);
  }
}

export function bessely(x: number, n: number): number {
  try {
    if (!Number.isInteger(n)) {
      throw new Error('Order must be an integer');
    }
    return bessel.bessely(x, n);
  } catch (error) {
    throw new FormulaError('Error in BESSELY function', error);
  }
}