import { FormulaError } from '../errors';
import * as formulajs from '@formulajs/formulajs';

// Basic Statistics
export function average(...args: number[]): number {
  try {
    return formulajs.AVERAGE(args) as number;
  } catch (error) {
    throw new FormulaError('Error in AVERAGE function', error);
  }
}

export function median(...args: number[]): number {
  try {
    return formulajs.MEDIAN(args) as number;
  } catch (error) {
    throw new FormulaError('Error in MEDIAN function', error);
  }
}

export function mode(...args: number[]): number {
  try {
    return formulajs.MODE.SNGL(args) as number;
  } catch (error) {
    throw new FormulaError('Error in MODE function', error);
  }
}

export function stdev(...args: number[]): number {
  try {
    return formulajs.STDEV.S(args) as number;
  } catch (error) {
    throw new FormulaError('Error in STDEV function', error);
  }
}

export function variance(...args: number[]): number {
  try {
    return formulajs.VAR.S(args) as number;
  } catch (error) {
    throw new FormulaError('Error in VAR function', error);
  }
}

// Advanced Statistics
export function avedev(...args: number[]): number {
  try {
    const result = formulajs.AVEDEV(args);
    if (result instanceof Error) throw result;
    return result;
  } catch (error) {
    throw new FormulaError('Error in AVEDEV function', error);
  }
}

export function confidence(alpha: number, standardDev: number, size: number): number {
  try {
    const result = formulajs.CONFIDENCE.NORM(alpha, standardDev, size);
    if (result instanceof Error) throw result;
    return result;
  } catch (error) {
    throw new FormulaError('Error in CONFIDENCE function', error);
  }
}

export function covar(array1: number[], array2: number[]): number {
  try {
    const result = formulajs.COVARIANCE.P(array1, array2);
    if (result instanceof Error) throw result;
    return result;
  } catch (error) {
    throw new FormulaError('Error in COVAR function', error);
  }
}

export function forecast(x: number, knownYs: number[], knownXs: number[]): number {
  try {
    const result = formulajs.FORECAST(x, knownYs, knownXs);
    if (result instanceof Error) throw result;
    return result;
  } catch (error) {
    throw new FormulaError('Error in FORECAST function', error);
  }
}

export function harmean(...args: number[]): number {
  try {
    const result = formulajs.HARMEAN(args);
    if (result instanceof Error) throw result;
    return result;
  } catch (error) {
    throw new FormulaError('Error in HARMEAN function', error);
  }
}

export function kurt(...args: number[]): number {
  try {
    const result = formulajs.KURT(args);
    if (result instanceof Error) throw result;
    return result;
  } catch (error) {
    throw new FormulaError('Error in KURT function', error);
  }
}

export function skew(...args: number[]): number {
  try {
    const result = formulajs.SKEW(args);
    if (result instanceof Error) throw result;
    return result;
  } catch (error) {
    throw new FormulaError('Error in SKEW function', error);
  }
}