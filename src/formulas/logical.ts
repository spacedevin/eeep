import { FormulaError } from '../errors';
import * as formulajs from '@formulajs/formulajs';

// Basic Logical Functions
export function and(...args: boolean[]): boolean {
  try {
    return formulajs.AND(...args) as boolean;
  } catch (error) {
    throw new FormulaError('Error in AND function', error);
  }
}

export function or(...args: boolean[]): boolean {
  try {
    return formulajs.OR(...args) as boolean;
  } catch (error) {
    throw new FormulaError('Error in OR function', error);
  }
}

export function not(value: boolean): boolean {
  try {
    const result = formulajs.NOT(value);
    if (result instanceof Error) throw result;
    return result;
  } catch (error) {
    throw new FormulaError('Error in NOT function', error);
  }
}

export function ifFunc(test: boolean, valueIfTrue: any, valueIfFalse: any): any {
  try {
    return formulajs.IF(test, valueIfTrue, valueIfFalse);
  } catch (error) {
    throw new FormulaError('Error in IF function', error);
  }
}