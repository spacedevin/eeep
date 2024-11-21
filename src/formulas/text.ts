import { FormulaError } from '../errors';
import * as formulajs from '@formulajs/formulajs';

// Basic Text Functions
export function concatenate(...args: string[]): string {
  try {
    return formulajs.CONCATENATE(...args);
  } catch (error) {
    throw new FormulaError('Error in CONCATENATE function', error);
  }
}

export function left(text: string, numChars: number = 1): string {
  try {
    return formulajs.LEFT(text, numChars);
  } catch (error) {
    throw new FormulaError('Error in LEFT function', error);
  }
}

export function right(text: string, numChars: number = 1): string {
  try {
    return formulajs.RIGHT(text, numChars);
  } catch (error) {
    throw new FormulaError('Error in RIGHT function', error);
  }
}

export function mid(text: string, startNum: number, numChars: number): string {
  try {
    return formulajs.MID(text, startNum, numChars);
  } catch (error) {
    throw new FormulaError('Error in MID function', error);
  }
}

export function len(text: string): number {
  try {
    return formulajs.LEN(text);
  } catch (error) {
    throw new FormulaError('Error in LEN function', error);
  }
}

export function lower(text: string): string {
  try {
    return formulajs.LOWER(text);
  } catch (error) {
    throw new FormulaError('Error in LOWER function', error);
  }
}

export function upper(text: string): string {
  try {
    return formulajs.UPPER(text);
  } catch (error) {
    throw new FormulaError('Error in UPPER function', error);
  }
}

export function proper(text: string): string {
  try {
    return formulajs.PROPER(text);
  } catch (error) {
    throw new FormulaError('Error in PROPER function', error);
  }
}

// Advanced Text Functions
export function replace(oldText: string, startNum: number, numChars: number, newText: string): string {
  try {
    const result = formulajs.REPLACE(oldText, startNum, numChars, newText);
    if (result instanceof Error) throw result;
    return result;
  } catch (error) {
    throw new FormulaError('Error in REPLACE function', error);
  }
}

export function substitute(text: string, oldText: string, newText: string, instance?: number): string {
  try {
    return formulajs.SUBSTITUTE(text, oldText, newText, instance);
  } catch (error) {
    throw new FormulaError('Error in SUBSTITUTE function', error);
  }
}

export function trim(text: string): string {
  try {
    return formulajs.TRIM(text);
  } catch (error) {
    throw new FormulaError('Error in TRIM function', error);
  }
}

export function value(text: string): number {
  try {
    return formulajs.VALUE(text);
  } catch (error) {
    throw new FormulaError('Error in VALUE function', error);
  }
}

export function text(value: number, format: string): string {
  try {
    return formulajs.TEXT(value, format);
  } catch (error) {
    throw new FormulaError('Error in TEXT function', error);
  }
}