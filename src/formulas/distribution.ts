import { FormulaError } from '../errors';
import * as formulajs from '@formulajs/formulajs';

export function normDist(x: number, mean: number, standardDev: number, cumulative: boolean): number {
  try {
    return formulajs.NORM.DIST(x, mean, standardDev, cumulative) as number;
  } catch (error) {
    throw new FormulaError('Error in NORMDIST function', error);
  }
}

export function normInv(probability: number, mean: number, standardDev: number): number {
  try {
    return formulajs.NORM.INV(probability, mean, standardDev) as number;
  } catch (error) {
    throw new FormulaError('Error in NORMINV function', error);
  }
}

export function normSDist(z: number): number {
  try {
    return formulajs.NORM.S.DIST(z, true) as number;
  } catch (error) {
    throw new FormulaError('Error in NORMSDIST function', error);
  }
}

export function normSInv(probability: number): number {
  try {
    return formulajs.NORM.S.INV(probability) as number;
  } catch (error) {
    throw new FormulaError('Error in NORMSINV function', error);
  }
}

export function tDist(x: number, degFreedom: number, cumulative: boolean): number {
  try {
    return formulajs.T.DIST(x, degFreedom, cumulative) as number;
  } catch (error) {
    throw new FormulaError('Error in TDIST function', error);
  }
}

export function tInv(probability: number, degFreedom: number): number {
  try {
    return formulajs.T.INV(probability, degFreedom) as number;
  } catch (error) {
    throw new FormulaError('Error in TINV function', error);
  }
}

export function fDist(x: number, degFreedom1: number, degFreedom2: number): number {
  try {
    return formulajs.F.DIST(x, degFreedom1, degFreedom2, true) as number;
  } catch (error) {
    throw new FormulaError('Error in FDIST function', error);
  }
}

export function fInv(probability: number, degFreedom1: number, degFreedom2: number): number {
  try {
    return formulajs.F.INV(probability, degFreedom1, degFreedom2) as number;
  } catch (error) {
    throw new FormulaError('Error in FINV function', error);
  }
}

export function chiDist(x: number, degFreedom: number): number {
  try {
    return formulajs.CHISQ.DIST(x, degFreedom, false) as number;
  } catch (error) {
    throw new FormulaError('Error in CHIDIST function', error);
  }
}

export function chiInv(probability: number, degFreedom: number): number {
  try {
    return formulajs.CHISQ.INV(probability, degFreedom) as number;
  } catch (error) {
    throw new FormulaError('Error in CHIINV function', error);
  }
}