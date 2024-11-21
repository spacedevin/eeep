import { FormulaError } from '../../errors';

export function sumifs(
  sumRange: any[],
  ...criteria: any[]
): number {
  try {
    if (criteria.length % 2 !== 0) {
      throw new Error('Criteria must be in pairs');
    }

    const ranges = [];
    const conditions = [];
    for (let i = 0; i < criteria.length; i += 2) {
      ranges.push(criteria[i]);
      conditions.push(criteria[i + 1]);
    }

    // Validate ranges have same length
    const length = sumRange.length;
    if (!ranges.every(range => range.length === length)) {
      throw new Error('All ranges must have the same length');
    }

    let sum = 0;
    for (let i = 0; i < length; i++) {
      let match = true;
      for (let j = 0; j < ranges.length; j++) {
        const value = ranges[j][i];
        const condition = conditions[j];
        if (!evaluateCondition(value, condition)) {
          match = false;
          break;
        }
      }
      if (match) {
        sum += Number(sumRange[i]) || 0;
      }
    }

    return sum;
  } catch (error) {
    throw new FormulaError('Error in SUMIFS function', error);
  }
}

export function averageifs(
  averageRange: any[],
  ...criteria: any[]
): number {
  try {
    if (criteria.length % 2 !== 0) {
      throw new Error('Criteria must be in pairs');
    }

    const ranges = [];
    const conditions = [];
    for (let i = 0; i < criteria.length; i += 2) {
      ranges.push(criteria[i]);
      conditions.push(criteria[i + 1]);
    }

    // Validate ranges have same length
    const length = averageRange.length;
    if (!ranges.every(range => range.length === length)) {
      throw new Error('All ranges must have the same length');
    }

    let sum = 0;
    let count = 0;
    for (let i = 0; i < length; i++) {
      let match = true;
      for (let j = 0; j < ranges.length; j++) {
        const value = ranges[j][i];
        const condition = conditions[j];
        if (!evaluateCondition(value, condition)) {
          match = false;
          break;
        }
      }
      if (match) {
        sum += Number(averageRange[i]) || 0;
        count++;
      }
    }

    if (count === 0) {
      throw new Error('No values match the criteria');
    }

    return sum / count;
  } catch (error) {
    throw new FormulaError('Error in AVERAGEIFS function', error);
  }
}

export function countifs(...criteria: any[]): number {
  try {
    if (criteria.length % 2 !== 0) {
      throw new Error('Criteria must be in pairs');
    }

    const ranges = [];
    const conditions = [];
    for (let i = 0; i < criteria.length; i += 2) {
      ranges.push(criteria[i]);
      conditions.push(criteria[i + 1]);
    }

    // Validate ranges have same length
    const length = ranges[0].length;
    if (!ranges.every(range => range.length === length)) {
      throw new Error('All ranges must have the same length');
    }

    let count = 0;
    for (let i = 0; i < length; i++) {
      let match = true;
      for (let j = 0; j < ranges.length; j++) {
        const value = ranges[j][i];
        const condition = conditions[j];
        if (!evaluateCondition(value, condition)) {
          match = false;
          break;
        }
      }
      if (match) {
        count++;
      }
    }

    return count;
  } catch (error) {
    throw new FormulaError('Error in COUNTIFS function', error);
  }
}

export function subtotal(
  functionNum: number,
  range: any[],
  options: {
    excludeHidden?: boolean;
    excludeSubtotals?: boolean;
  } = {}
): number {
  try {
    const { excludeHidden = true, excludeSubtotals = true } = options;

    // Filter values based on options
    const values = range.filter(value => {
      if (excludeHidden && isHidden(value)) return false;
      if (excludeSubtotals && isSubtotal(value)) return false;
      return true;
    });

    // Apply selected function
    switch (functionNum) {
      case 1: return average(values);
      case 2: return count(values);
      case 3: return counta(values);
      case 4: return max(values);
      case 5: return min(values);
      case 6: return product(values);
      case 7: return stdev(values);
      case 8: return stdevp(values);
      case 9: return sum(values);
      case 10: return var_(values);
      case 11: return varp(values);
      default:
        throw new Error('Invalid function number');
    }
  } catch (error) {
    throw new FormulaError('Error in SUBTOTAL function', error);
  }
}

// Helper functions
function evaluateCondition(value: any, condition: string): boolean {
  if (typeof condition !== 'string') {
    return value === condition;
  }

  condition = condition.toString().toLowerCase();
  const stringValue = value?.toString().toLowerCase();

  // Handle wildcards
  if (condition.includes('*') || condition.includes('?')) {
    const regex = new RegExp('^' + condition.replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
    return regex.test(stringValue);
  }

  // Handle comparison operators
  const operators = ['>=', '<=', '<>', '>', '<', '='];
  for (const op of operators) {
    if (condition.startsWith(op)) {
      const compareValue = condition.slice(op.length);
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

  // Default exact match
  return stringValue === condition;
}

function isHidden(value: any): boolean {
  // Implementation would depend on your cell/range model
  return false;
}

function isSubtotal(value: any): boolean {
  // Implementation would depend on your cell/range model
  return false;
}

// Basic statistical functions used by SUBTOTAL
function average(values: any[]): number {
  const nums = values.filter(v => typeof v === 'number');
  if (nums.length === 0) throw new Error('No numeric values');
  return sum(nums) / nums.length;
}

function count(values: any[]): number {
  return values.filter(v => typeof v === 'number').length;
}

function counta(values: any[]): number {
  return values.filter(v => v != null).length;
}

function max(values: any[]): number {
  const nums = values.filter(v => typeof v === 'number');
  if (nums.length === 0) throw new Error('No numeric values');
  return Math.max(...nums);
}

function min(values: any[]): number {
  const nums = values.filter(v => typeof v === 'number');
  if (nums.length === 0) throw new Error('No numeric values');
  return Math.min(...nums);
}

function product(values: any[]): number {
  const nums = values.filter(v => typeof v === 'number');
  if (nums.length === 0) throw new Error('No numeric values');
  return nums.reduce((a, b) => a * b, 1);
}

function sum(values: any[]): number {
  const nums = values.filter(v => typeof v === 'number');
  if (nums.length === 0) throw new Error('No numeric values');
  return nums.reduce((a, b) => a + b, 0);
}

function stdev(values: any[]): number {
  const nums = values.filter(v => typeof v === 'number');
  if (nums.length < 2) throw new Error('Need at least 2 numeric values');
  const avg = average(nums);
  const squareDiffs = nums.map(x => Math.pow(x - avg, 2));
  return Math.sqrt(sum(squareDiffs) / (nums.length - 1));
}

function stdevp(values: any[]): number {
  const nums = values.filter(v => typeof v === 'number');
  if (nums.length < 1) throw new Error('Need at least 1 numeric value');
  const avg = average(nums);
  const squareDiffs = nums.map(x => Math.pow(x - avg, 2));
  return Math.sqrt(sum(squareDiffs) / nums.length);
}

function var_(values: any[]): number {
  const nums = values.filter(v => typeof v === 'number');
  if (nums.length < 2) throw new Error('Need at least 2 numeric values');
  const avg = average(nums);
  const squareDiffs = nums.map(x => Math.pow(x - avg, 2));
  return sum(squareDiffs) / (nums.length - 1);
}

function varp(values: any[]): number {
  const nums = values.filter(v => typeof v === 'number');
  if (nums.length < 1) throw new Error('Need at least 1 numeric value');
  const avg = average(nums);
  const squareDiffs = nums.map(x => Math.pow(x - avg, 2));
  return sum(squareDiffs) / nums.length;
}