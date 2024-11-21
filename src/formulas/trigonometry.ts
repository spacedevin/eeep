import { FormulaError } from '../errors';
import * as formulajs from '@formulajs/formulajs';

export function sin(number: number): number {
  try {
    return formulajs.SIN(number) as number;
  } catch (error) {
    throw new FormulaError('Error in SIN function', error);
  }
}

export function cos(number: number): number {
  try {
    return formulajs.COS(number) as number;
  } catch (error) {
    throw new FormulaError('Error in COS function', error);
  }
}

export function tan(number: number): number {
  try {
    return formulajs.TAN(number) as number;
  } catch (error) {
    throw new FormulaError('Error in TAN function', error);
  }
}

export function asin(number: number): number {
  try {
    return formulajs.ASIN(number) as number;
  } catch (error) {
    throw new FormulaError('Error in ASIN function', error);
  }
}

export function acos(number: number): number {
  try {
    return formulajs.ACOS(number) as number;
  } catch (error) {
    throw new FormulaError('Error in ACOS function', error);
  }
}

export function atan(number: number): number {
  try {
    return formulajs.ATAN(number) as number;
  } catch (error) {
    throw new FormulaError('Error in ATAN function', error);
  }
}

export function degrees(radians: number): number {
  try {
    return formulajs.DEGREES(radians) as number;
  } catch (error) {
    throw new FormulaError('Error in DEGREES function', error);
  }
}

export function radians(degrees: number): number {
  try {
    return formulajs.RADIANS(degrees) as number;
  } catch (error) {
    throw new FormulaError('Error in RADIANS function', error);
  }
}