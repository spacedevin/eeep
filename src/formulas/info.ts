import { FormulaError } from '../errors';
import * as formulajs from '@formulajs/formulajs';

export function isBlank(value: any): boolean {
  try {
    return value === null || value === undefined || value === '';
  } catch (error) {
    throw new FormulaError('Error in ISBLANK function', error);
  }
}

export function isErr(value: any): boolean {
  try {
    return value instanceof Error && value.name !== '#N/A';
  } catch (error) {
    throw new FormulaError('Error in ISERR function', error);
  }
}

export function isError(value: any): boolean {
  try {
    return value instanceof Error;
  } catch (error) {
    throw new FormulaError('Error in ISERROR function', error);
  }
}

export function isEven(number: number): boolean {
  try {
    if (typeof number !== 'number') {
      throw new Error('Value must be a number');
    }
    return number % 2 === 0;
  } catch (error) {
    throw new FormulaError('Error in ISEVEN function', error);
  }
}

export function isFormula(reference: string): boolean {
  try {
    return reference.startsWith('=');
  } catch (error) {
    throw new FormulaError('Error in ISFORMULA function', error);
  }
}

export function isLogical(value: any): boolean {
  try {
    return typeof value === 'boolean';
  } catch (error) {
    throw new FormulaError('Error in ISLOGICAL function', error);
  }
}

export function isNa(value: any): boolean {
  try {
    return value instanceof Error && value.name === '#N/A';
  } catch (error) {
    throw new FormulaError('Error in ISNA function', error);
  }
}

export function isNonText(value: any): boolean {
  try {
    return typeof value !== 'string';
  } catch (error) {
    throw new FormulaError('Error in ISNONTEXT function', error);
  }
}

export function isNumber(value: any): boolean {
  try {
    return typeof value === 'number' && !isNaN(value);
  } catch (error) {
    throw new FormulaError('Error in ISNUMBER function', error);
  }
}

export function isOdd(number: number): boolean {
  try {
    if (typeof number !== 'number') {
      throw new Error('Value must be a number');
    }
    return Math.abs(number % 2) === 1;
  } catch (error) {
    throw new FormulaError('Error in ISODD function', error);
  }
}

export function isRef(reference: string): boolean {
  try {
    return /^[A-Z]+[0-9]+$/i.test(reference);
  } catch (error) {
    throw new FormulaError('Error in ISREF function', error);
  }
}

export function isText(value: any): boolean {
  try {
    return typeof value === 'string';
  } catch (error) {
    throw new FormulaError('Error in ISTEXT function', error);
  }
}

export function n(value: any): number {
  try {
    if (typeof value === 'number') return value;
    if (typeof value === 'boolean') return value ? 1 : 0;
    if (value instanceof Date) return value.getTime();
    return 0;
  } catch (error) {
    throw new FormulaError('Error in N function', error);
  }
}

export function na(): Error {
  return new Error('#N/A');
}

export function sheet(reference?: string): number {
  try {
    // This is a placeholder - actual implementation would need worksheet context
    return 1;
  } catch (error) {
    throw new FormulaError('Error in SHEET function', error);
  }
}

export function sheets(reference?: string): number {
  try {
    // This is a placeholder - actual implementation would need workbook context
    return 1;
  } catch (error) {
    throw new FormulaError('Error in SHEETS function', error);
  }
}

export function type(value: any): number {
  try {
    if (value === null || value === undefined) return 1; // Empty
    if (typeof value === 'string') return 2; // Text
    if (typeof value === 'number') return 1; // Number
    if (typeof value === 'boolean') return 4; // Logical
    if (value instanceof Error) return 16; // Error
    if (Array.isArray(value)) return 64; // Array
    return 0; // Unknown
  } catch (error) {
    throw new FormulaError('Error in TYPE function', error);
  }
}