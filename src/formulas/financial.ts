import { FormulaError } from '../errors';
import * as formulajs from '@formulajs/formulajs';

// Basic Financial Functions
export function fv(rate: number, nper: number, pmt: number, pv: number = 0, type: number = 0): number {
  try {
    const result = formulajs.FV(rate, nper, pmt, pv, type);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in FV function', error);
  }
}

export function pv(rate: number, nper: number, pmt: number, fv: number = 0, type: number = 0): number {
  try {
    const result = formulajs.PV(rate, nper, pmt, fv, type);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in PV function', error);
  }
}

export function pmt(rate: number, nper: number, pv: number, fv: number = 0, type: number = 0): number {
  try {
    const result = formulajs.PMT(rate, nper, pv, fv, type);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in PMT function', error);
  }
}

export function nper(rate: number, pmt: number, pv: number, fv: number = 0, type: number = 0): number {
  try {
    const result = formulajs.NPER(rate, pmt, pv, fv, type);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in NPER function', error);
  }
}

export function rate(nper: number, pmt: number, pv: number, fv: number = 0, type: number = 0, guess: number = 0.1): number {
  try {
    const result = formulajs.RATE(nper, pmt, pv, fv, type, guess);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in RATE function', error);
  }
}

// Investment Functions
export function irr(values: number[], guess: number = 0.1): number {
  try {
    const result = formulajs.IRR(values, guess);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in IRR function', error);
  }
}

export function xirr(values: number[], dates: Date[], guess: number = 0.1): number {
  try {
    const result = formulajs.XIRR(values, dates, guess);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in XIRR function', error);
  }
}

export function npv(rate: number, values: number[]): number {
  try {
    const result = formulajs.NPV(rate, values);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in NPV function', error);
  }
}

export function xnpv(rate: number, values: number[], dates: Date[]): number {
  try {
    const result = formulajs.XNPV(rate, values, dates);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in XNPV function', error);
  }
}

export function mirr(values: number[], financeRate: number, reinvestRate: number): number {
  try {
    const result = formulajs.MIRR(values, financeRate, reinvestRate);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in MIRR function', error);
  }
}

// Depreciation Functions
export function db(cost: number, salvage: number, life: number, period: number, month: number = 12): number {
  try {
    const result = formulajs.DB(cost, salvage, life, period, month);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in DB function', error);
  }
}

export function ddb(cost: number, salvage: number, life: number, period: number, factor: number = 2): number {
  try {
    const result = formulajs.DDB(cost, salvage, life, period, factor);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in DDB function', error);
  }
}

export function sln(cost: number, salvage: number, life: number): number {
  try {
    const result = formulajs.SLN(cost, salvage, life);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in SLN function', error);
  }
}

export function syd(cost: number, salvage: number, life: number, period: number): number {
  try {
    const result = formulajs.SYD(cost, salvage, life, period);
    if (result instanceof Error) throw result;
    return result as number;
  } catch (error) {
    throw new FormulaError('Error in SYD function', error);
  }
}

export function vdb(
  cost: number,
  salvage: number,
  life: number,
  startPeriod: number,
  endPeriod: number,
  factor: number = 2,
  noSwitch: boolean = false
): number {
  try {
    // Calculate VDB using DDB and SLN
    let totalDepreciation = 0;
    for (let period = startPeriod; period <= endPeriod; period++) {
      const ddbValue = ddb(cost, salvage, life, period, factor);
      const slnValue = sln(cost, salvage, life);
      
      if (!noSwitch && ddbValue < slnValue) {
        totalDepreciation += slnValue;
      } else {
        totalDepreciation += ddbValue;
      }
    }
    return totalDepreciation;
  } catch (error) {
    throw new FormulaError('Error in VDB function', error);
  }
}