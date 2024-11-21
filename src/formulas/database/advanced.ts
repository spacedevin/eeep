import { FormulaError } from '../../errors';
import { DatabaseState } from '../../../spec/Database';

export function dAverage(database: any[][], field: string | number, criteria: any[][]): number {
  try {
    const values = getMatchingValues(database, field, criteria);
    if (values.length === 0) {
      throw new Error('No values match the criteria');
    }
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  } catch (error) {
    throw new FormulaError('Error in DAVERAGE function', error);
  }
}

export function dCount(database: any[][], field: string | number, criteria: any[][]): number {
  try {
    const values = getMatchingValues(database, field, criteria);
    return values.filter(val => typeof val === 'number').length;
  } catch (error) {
    throw new FormulaError('Error in DCOUNT function', error);
  }
}

export function dCountA(database: any[][], field: string | number, criteria: any[][]): number {
  try {
    const values = getMatchingValues(database, field, criteria);
    return values.filter(val => val !== null && val !== undefined).length;
  } catch (error) {
    throw new FormulaError('Error in DCOUNTA function', error);
  }
}

export function dGet(database: any[][], field: string | number, criteria: any[][]): any {
  try {
    const values = getMatchingValues(database, field, criteria);
    if (values.length !== 1) {
      throw new Error('Criteria must match exactly one value');
    }
    return values[0];
  } catch (error) {
    throw new FormulaError('Error in DGET function', error);
  }
}

export function dMax(database: any[][], field: string | number, criteria: any[][]): number {
  try {
    const values = getMatchingValues(database, field, criteria);
    if (values.length === 0) {
      throw new Error('No values match the criteria');
    }
    return Math.max(...values);
  } catch (error) {
    throw new FormulaError('Error in DMAX function', error);
  }
}

export function dMin(database: any[][], field: string | number, criteria: any[][]): number {
  try {
    const values = getMatchingValues(database, field, criteria);
    if (values.length === 0) {
      throw new Error('No values match the criteria');
    }
    return Math.min(...values);
  } catch (error) {
    throw new FormulaError('Error in DMIN function', error);
  }
}

export function dProduct(database: any[][], field: string | number, criteria: any[][]): number {
  try {
    const values = getMatchingValues(database, field, criteria);
    if (values.length === 0) {
      throw new Error('No values match the criteria');
    }
    return values.reduce((product, val) => product * val, 1);
  } catch (error) {
    throw new FormulaError('Error in DPRODUCT function', error);
  }
}

export function dStDev(database: any[][], field: string | number, criteria: any[][]): number {
  try {
    const values = getMatchingValues(database, field, criteria);
    if (values.length < 2) {
      throw new Error('Need at least two values');
    }
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const sumSquares = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0);
    return Math.sqrt(sumSquares / (values.length - 1));
  } catch (error) {
    throw new FormulaError('Error in DSTDEV function', error);
  }
}

export function dStDevP(database: any[][], field: string | number, criteria: any[][]): number {
  try {
    const values = getMatchingValues(database, field, criteria);
    if (values.length === 0) {
      throw new Error('No values match the criteria');
    }
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const sumSquares = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0);
    return Math.sqrt(sumSquares / values.length);
  } catch (error) {
    throw new FormulaError('Error in DSTDEVP function', error);
  }
}

export function dSum(database: any[][], field: string | number, criteria: any[][]): number {
  try {
    const values = getMatchingValues(database, field, criteria);
    return values.reduce((sum, val) => sum + val, 0);
  } catch (error) {
    throw new FormulaError('Error in DSUM function', error);
  }
}

export function dVar(database: any[][], field: string | number, criteria: any[][]): number {
  try {
    const values = getMatchingValues(database, field, criteria);
    if (values.length < 2) {
      throw new Error('Need at least two values');
    }
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const sumSquares = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0);
    return sumSquares / (values.length - 1);
  } catch (error) {
    throw new FormulaError('Error in DVAR function', error);
  }
}

export function dVarP(database: any[][], field: string | number, criteria: any[][]): number {
  try {
    const values = getMatchingValues(database, field, criteria);
    if (values.length === 0) {
      throw new Error('No values match the criteria');
    }
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const sumSquares = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0);
    return sumSquares / values.length;
  } catch (error) {
    throw new FormulaError('Error in DVARP function', error);
  }
}

// Helper functions
function getMatchingValues(database: any[][], field: string | number, criteria: any[][]): number[] {
  const headers = database[0];
  const fieldIndex = typeof field === 'string' ? 
    headers.indexOf(field) : 
    field;

  if (fieldIndex === -1) {
    throw new Error('Field not found in database');
  }

  const criteriaHeaders = criteria[0];
  const criteriaValues = criteria.slice(1);
  const criteriaIndices = criteriaHeaders.map(header => headers.indexOf(header));

  return database.slice(1).filter(row => {
    return criteriaValues.some(criteriaRow => {
      return criteriaIndices.every((index, i) => {
        const criteriaValue = criteriaRow[i];
        const cellValue = row[index];
        return matchesCriteria(cellValue, criteriaValue);
      });
    });
  }).map(row => row[fieldIndex]);
}

function matchesCriteria(value: any, criteria: any): boolean {
  if (typeof criteria === 'string') {
    // Handle comparison operators
    const operators = ['>=', '<=', '<>', '>', '<', '='];
    for (const op of operators) {
      if (criteria.startsWith(op)) {
        const compareValue = criteria.slice(op.length);
        const numValue = Number(value);
        const numCompare = Number(compareValue);

        if (!isNaN(numValue) && !isNaN(numCompare)) {
          switch (op) {
            case '>=': return numValue >= numCompare;
            case '<=': return numValue <= numCompare;
            case '<>': return numValue !== numCompare;
            case '>': return numValue > numCompare;
            case '<': return numValue < numCompare;
            case '=': return numValue === numCompare;
          }
        }
      }
    }

    // Handle wildcards
    if (criteria.includes('*') || criteria.includes('?')) {
      const regex = new RegExp('^' + criteria.replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
      return regex.test(String(value));
    }
  }

  // Default exact match
  return value === criteria;
}