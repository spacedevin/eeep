import { ValidationState } from '../../spec/DataValidation';
import { FormulaError } from '../errors';

export function validateList(value: any, list: string[] | string): boolean {
  try {
    const values = Array.isArray(list) ? list : list.split(',').map(v => v.trim());
    return values.includes(value);
  } catch (error) {
    throw new FormulaError('Error validating list', error);
  }
}

export function validateRange(
  value: number,
  operator: 'between' | 'notBetween' | 'equal' | 'notEqual' | 'greaterThan' | 'lessThan' | 'greaterOrEqual' | 'lessOrEqual',
  value1: number,
  value2?: number
): boolean {
  try {
    switch (operator) {
      case 'between':
        return value >= value1 && value <= (value2 ?? value1);
      case 'notBetween':
        return value < value1 || value > (value2 ?? value1);
      case 'equal':
        return value === value1;
      case 'notEqual':
        return value !== value1;
      case 'greaterThan':
        return value > value1;
      case 'lessThan':
        return value < value1;
      case 'greaterOrEqual':
        return value >= value1;
      case 'lessOrEqual':
        return value <= value1;
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  } catch (error) {
    throw new FormulaError('Error validating range', error);
  }
}

export function validateDate(
  value: Date,
  operator: 'between' | 'notBetween' | 'equal' | 'notEqual' | 'greaterThan' | 'lessThan' | 'greaterOrEqual' | 'lessOrEqual',
  date1: Date,
  date2?: Date
): boolean {
  try {
    const valueTime = value.getTime();
    const date1Time = date1.getTime();
    const date2Time = date2?.getTime() ?? date1Time;

    switch (operator) {
      case 'between':
        return valueTime >= date1Time && valueTime <= date2Time;
      case 'notBetween':
        return valueTime < date1Time || valueTime > date2Time;
      case 'equal':
        return valueTime === date1Time;
      case 'notEqual':
        return valueTime !== date1Time;
      case 'greaterThan':
        return valueTime > date1Time;
      case 'lessThan':
        return valueTime < date1Time;
      case 'greaterOrEqual':
        return valueTime >= date1Time;
      case 'lessOrEqual':
        return valueTime <= date1Time;
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  } catch (error) {
    throw new FormulaError('Error validating date', error);
  }
}

export function validateTextLength(
  value: string,
  operator: 'between' | 'notBetween' | 'equal' | 'notEqual' | 'greaterThan' | 'lessThan' | 'greaterOrEqual' | 'lessOrEqual',
  length1: number,
  length2?: number
): boolean {
  try {
    const textLength = value.length;
    return validateRange(textLength, operator, length1, length2);
  } catch (error) {
    throw new FormulaError('Error validating text length', error);
  }
}

export function validateCustom(
  value: any,
  formula: string,
  context?: Record<string, any>
): boolean {
  try {
    // TODO: Implement formula evaluation
    // For now, return true if formula exists
    return !!formula;
  } catch (error) {
    throw new FormulaError('Error validating custom formula', error);
  }
}
