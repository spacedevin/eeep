import { FormulaError } from '../errors';
import * as formulajs from '@formulajs/formulajs';

// Basic Arithmetic Functions
export function sum(...args: number[]): number {
  try {
    return formulajs.SUM(...args) as number;
  } catch (error) {
    throw new FormulaError('Error calculating sum', error);
  }
}

export function product(...args: number[]): number {
  try {
    return formulajs.PRODUCT(...args) as number;
  } catch (error) {
    throw new FormulaError('Error calculating product', error);
  }
}

export function quotient(numerator: number, denominator: number): number {
  try {
    return formulajs.QUOTIENT(numerator, denominator) as number;
  } catch (error) {
    throw new FormulaError('Error calculating quotient', error);
  }
}

export function mod(number: number, divisor: number): number {
  try {
    return formulajs.MOD(number, divisor) as number;
  } catch (error) {
    throw new FormulaError('Error calculating modulo', error);
  }
}

export function power(number: number, power: number): number {
  try {
    return formulajs.POWER(number, power) as number;
  } catch (error) {
    throw new FormulaError('Error calculating power', error);
  }
}

export function sqrt(number: number): number {
  try {
    return formulajs.SQRT(number) as number;
  } catch (error) {
    throw new FormulaError('Error calculating square root', error);
  }
}

export function abs(number: number): number {
  try {
    return formulajs.ABS(number) as number;
  } catch (error) {
    throw new FormulaError('Error calculating absolute value', error);
  }
}

// Advanced Math Functions
export function ceiling(number: number, significance: number): number {
  try {
    return formulajs.CEILING(number, significance, 0) as number;
  } catch (error) {
    throw new FormulaError('Error calculating ceiling', error);
  }
}

export function floor(number: number, significance: number): number {
  try {
    return formulajs.FLOOR(number, significance) as number;
  } catch (error) {
    throw new FormulaError('Error calculating floor', error);
  }
}

export function round(number: number, digits: number): number {
  try {
    return formulajs.ROUND(number, digits) as number;
  } catch (error) {
    throw new FormulaError('Error rounding number', error);
  }
}

export function roundDown(number: number, digits: number): number {
  try {
    return formulajs.ROUNDDOWN(number, digits) as number;
  } catch (error) {
    throw new FormulaError('Error rounding down number', error);
  }
}

export function roundUp(number: number, digits: number): number {
  try {
    return formulajs.ROUNDUP(number, digits) as number;
  } catch (error) {
    throw new FormulaError('Error rounding up number', error);
  }
}

export function trunc(number: number, digits: number = 0): number {
  try {
    return formulajs.TRUNC(number, digits) as number;
  } catch (error) {
    throw new FormulaError('Error truncating number', error);
  }
}