import { FormulaError } from '../errors';
import * as formulajs from '@formulajs/formulajs';

export function dAverage(
  database: any[][],
  field: string | number,
  criteria: any[][]
): number {
  try {
    return formulajs.DAVERAGE(database, field, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in DAVERAGE function', error);
  }
}

export function dCount(
  database: any[][],
  field: string | number,
  criteria: any[][]
): number {
  try {
    return formulajs.DCOUNT(database, field, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in DCOUNT function', error);
  }
}

export function dCountA(
  database: any[][],
  field: string | number,
  criteria: any[][]
): number {
  try {
    return formulajs.DCOUNTA(database, field, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in DCOUNTA function', error);
  }
}

export function dGet(
  database: any[][],
  field: string | number,
  criteria: any[][]
): any {
  try {
    return formulajs.DGET(database, field, criteria);
  } catch (error) {
    throw new FormulaError('Error in DGET function', error);
  }
}

export function dMax(
  database: any[][],
  field: string | number,
  criteria: any[][]
): number {
  try {
    return formulajs.DMAX(database, field, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in DMAX function', error);
  }
}

export function dMin(
  database: any[][],
  field: string | number,
  criteria: any[][]
): number {
  try {
    return formulajs.DMIN(database, field, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in DMIN function', error);
  }
}

export function dProduct(
  database: any[][],
  field: string | number,
  criteria: any[][]
): number {
  try {
    return formulajs.DPRODUCT(database, field, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in DPRODUCT function', error);
  }
}

export function dStDev(
  database: any[][],
  field: string | number,
  criteria: any[][]
): number {
  try {
    return formulajs.DSTDEV(database, field, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in DSTDEV function', error);
  }
}

export function dStDevP(
  database: any[][],
  field: string | number,
  criteria: any[][]
): number {
  try {
    return formulajs.DSTDEVP(database, field, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in DSTDEVP function', error);
  }
}

export function dSum(
  database: any[][],
  field: string | number,
  criteria: any[][]
): number {
  try {
    return formulajs.DSUM(database, field, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in DSUM function', error);
  }
}

export function dVar(
  database: any[][],
  field: string | number,
  criteria: any[][]
): number {
  try {
    return formulajs.DVAR(database, field, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in DVAR function', error);
  }
}

export function dVarP(
  database: any[][],
  field: string | number,
  criteria: any[][]
): number {
  try {
    return formulajs.DVARP(database, field, criteria) as number;
  } catch (error) {
    throw new FormulaError('Error in DVARP function', error);
  }
}