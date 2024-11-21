import { FormulaError } from '../errors';
import * as formulajs from '@formulajs/formulajs';

// Basic Aggregation Functions
export function sum(...args: number[]): number {
  try {
    return formulajs.SUM(args) as number;
  } catch (error) {
    throw new FormulaError('Error in SUM function', error);
  }
}

export function average(...args: number[]): number {
  try {
    return formulajs.AVERAGE(args) as number;
  } catch (error) {
    throw new FormulaError('Error in AVERAGE function', error);
  }
}

export function count(...args: any[]): number {
  try {
    return formulajs.COUNT(args) as number;
  } catch (error) {
    throw new FormulaError('Error in COUNT function', error);
  }
}

export function counta(...args: any[]): number {
  try {
    return formulajs.COUNTA(args) as number;
  } catch (error) {
    throw new FormulaError('Error in COUNTA function', error);
  }
}

export function max(...args: number[]): number {
  try {
    return formulajs.MAX(args) as number;
  } catch (error) {
    throw new FormulaError('Error in MAX function', error);
  }
}

export function min(...args: number[]): number {
  try {
    return formulajs.MIN(args) as number;
  } catch (error) {
    throw new FormulaError('Error in MIN function', error);
  }
}

export function product(...args: number[]): number {
  try {
    return formulajs.PRODUCT(args) as number;
  } catch (error) {
    throw new FormulaError('Error in PRODUCT function', error);
  }
}

// Conditional Aggregation Functions
export function sumif(range: any[], criteria: string | number | boolean, sumRange?: any[]): number {
  try {
    return formulajs.SUMIF(range, criteria, sumRange) as number;
  } catch (error) {
    throw new FormulaError('Error in SUMIF function', error);
  }
}

export function sumifs(sumRange: any[], ...criteria: any[]): number {
  try {
    return formulajs.SUMIFS(sumRange, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in SUMIFS function', error);
  }
}

export function averageif(range: any[], criteria: string | number | boolean, averageRange?: any[]): number {
  try {
    return formulajs.AVERAGEIF(range, criteria, averageRange) as number;
  } catch (error) {
    throw new FormulaError('Error in AVERAGEIF function', error);
  }
}

export function averageifs(averageRange: any[], ...criteria: any[]): number {
  try {
    return formulajs.AVERAGEIFS(averageRange, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in AVERAGEIFS function', error);
  }
}

export function countif(range: any[], criteria: string | number | boolean): number {
  try {
    return formulajs.COUNTIF(range, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in COUNTIF function', error);
  }
}

export function countifs(...criteria: any[]): number {
  try {
    return formulajs.COUNTIFS(criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in COUNTIFS function', error);
  }
}

// Subtotal Function
export function subtotal(functionNum: number, range: any[]): number {
  try {
    return formulajs.SUBTOTAL(functionNum, range) as number;
  } catch (error) {
    throw new FormulaError('Error in SUBTOTAL function', error);
  }
}