import { FormulaError } from '../errors';
import * as formulajs from '@formulajs/formulajs';

// Basic Lookup Functions
export function vlookup(
  lookupValue: any,
  tableArray: any[][],
  colIndex: number,
  rangeLookup: boolean = true
): any {
  try {
    return formulajs.VLOOKUP(lookupValue, tableArray, colIndex, rangeLookup);
  } catch (error) {
    throw new FormulaError('Error in VLOOKUP function', error);
  }
}

export function hlookup(
  lookupValue: any,
  tableArray: any[][],
  rowIndex: number,
  rangeLookup: boolean = true
): any {
  try {
    return formulajs.HLOOKUP(lookupValue, tableArray, rowIndex, rangeLookup);
  } catch (error) {
    throw new FormulaError('Error in HLOOKUP function', error);
  }
}

export function lookup(
  lookupValue: any,
  lookupVector: any[],
  resultVector?: any[]
): any {
  try {
    return formulajs.LOOKUP(lookupValue, lookupVector, resultVector);
  } catch (error) {
    throw new FormulaError('Error in LOOKUP function', error);
  }
}

export function match(lookupValue: any, lookupArray: any[], matchType: number = 1): number {
  try {
    const result = formulajs.MATCH(lookupValue, lookupArray, matchType);
    if (result instanceof Error) throw result;
    return result;
  } catch (error) {
    throw new FormulaError('Error in MATCH function', error);
  }
}

export function index(
  array: any[][] | any[],
  rowNum: number,
  colNum?: number
): any {
  try {
    return formulajs.INDEX(array, rowNum, colNum);
  } catch (error) {
    throw new FormulaError('Error in INDEX function', error);
  }
}

// Array Functions
export function transposeArray(array: any[][]): any[][] {
  try {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
  } catch (error) {
    throw new FormulaError('Error in TRANSPOSE function', error);
  }
}

export function sort(array: any[], sortIndex?: number, ascending: boolean = true): any[][] {
  try {
    const sorted = [...array];
    if (sortIndex !== undefined) {
      // Sort by specific column
      sorted.sort((a, b) => {
        const aVal = Array.isArray(a) ? a[sortIndex] : a;
        const bVal = Array.isArray(b) ? b[sortIndex] : b;
        return ascending ? 
          (aVal > bVal ? 1 : -1) :
          (aVal < bVal ? 1 : -1);
      });
    } else {
      // Simple sort
      sorted.sort((a, b) => ascending ? (a > b ? 1 : -1) : (a < b ? 1 : -1));
    }
    return sorted;
  } catch (error) {
    throw new FormulaError('Error in SORT function', error);
  }
}

export function unique(array: any[]): any[] {
  try {
    return Array.from(new Set(array));
  } catch (error) {
    throw new FormulaError('Error in UNIQUE function', error);
  }
}

export function filter(array: any[], criteria: (value: any) => boolean): any[] {
  try {
    return array.filter(criteria);
  } catch (error) {
    throw new FormulaError('Error in FILTER function', error);
  }
}

export function sequence(rows: number, cols: number = 1, start: number = 1, step: number = 1): number[][] {
  try {
    const result = [];
    let value = start;
    
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        row.push(value);
        value += step;
      }
      result.push(row);
    }
    
    return result;
  } catch (error) {
    throw new FormulaError('Error in SEQUENCE function', error);
  }
}