import { FormulaError } from '../errors';
import * as formulajs from '@formulajs/formulajs';
import { addDays, addMonths, differenceInDays, format } from 'date-fns';

// Basic Date Functions
export function date(year: number, month: number, day: number): Date {
  try {
    const result = formulajs.DATE(year, month, day);
    if (result instanceof Error) throw result;
    return new Date(result);
  } catch (error) {
    throw new FormulaError('Error in DATE function', error);
  }
}

export function day(date: Date): number {
  try {
    return formulajs.DAY(date) as number;
  } catch (error) {
    throw new FormulaError('Error in DAY function', error);
  }
}

export function month(date: Date): number {
  try {
    return formulajs.MONTH(date) as number;
  } catch (error) {
    throw new FormulaError('Error in MONTH function', error);
  }
}

export function year(date: Date): number {
  try {
    return formulajs.YEAR(date) as number;
  } catch (error) {
    throw new FormulaError('Error in YEAR function', error);
  }
}

export function today(): Date {
  try {
    const result = formulajs.TODAY();
    if (result instanceof Error) throw result;
    return new Date(result);
  } catch (error) {
    throw new FormulaError('Error in TODAY function', error);
  }
}

export function now(): Date {
  try {
    const result = formulajs.NOW();
    if (result instanceof Error) throw result;
    return new Date(result);
  } catch (error) {
    throw new FormulaError('Error in NOW function', error);
  }
}

// Date Calculations
export function dateDif(startDate: Date, endDate: Date, unit: string): number {
  try {
    const result = formulajs.DATEDIF(startDate, endDate, unit);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in DATEDIF function', error);
  }
}

export function dateValue(dateString: string): Date {
  try {
    const result = formulajs.DATEVALUE(dateString);
    if (result instanceof Error) throw result;
    return new Date(result);
  } catch (error) {
    throw new FormulaError('Error in DATEVALUE function', error);
  }
}

export function days(endDate: Date, startDate: Date): number {
  try {
    return differenceInDays(endDate, startDate);
  } catch (error) {
    throw new FormulaError('Error in DAYS function', error);
  }
}

export function edate(startDate: Date, months: number): Date {
  try {
    return addMonths(startDate, months);
  } catch (error) {
    throw new FormulaError('Error in EDATE function', error);
  }
}

export function eomonth(startDate: Date, months: number): Date {
  try {
    const date = addMonths(startDate, months);
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  } catch (error) {
    throw new FormulaError('Error in EOMONTH function', error);
  }
}

// Time Functions
export function hour(date: Date): number {
  try {
    return formulajs.HOUR(date) as number;
  } catch (error) {
    throw new FormulaError('Error in HOUR function', error);
  }
}

export function minute(date: Date): number {
  try {
    return formulajs.MINUTE(date) as number;
  } catch (error) {
    throw new FormulaError('Error in MINUTE function', error);
  }
}

export function second(date: Date): number {
  try {
    return formulajs.SECOND(date) as number;
  } catch (error) {
    throw new FormulaError('Error in SECOND function', error);
  }
}

export function time(hours: number, minutes: number, seconds: number): Date {
  try {
    const result = formulajs.TIME(hours, minutes, seconds);
    if (result instanceof Error) throw result;
    return new Date(result);
  } catch (error) {
    throw new FormulaError('Error in TIME function', error);
  }
}

export function timeValue(timeString: string): Date {
  try {
    const result = formulajs.TIMEVALUE(timeString);
    if (result instanceof Error) throw result;
    return new Date(result);
  } catch (error) {
    throw new FormulaError('Error in TIMEVALUE function', error);
  }
}