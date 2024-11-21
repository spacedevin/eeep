import { FormulaError } from '../../errors';
import * as formulajs from '@formulajs/formulajs';

export function tDistribution(x: number, degreesOfFreedom: number): number {
  try {
    return formulajs.T.DIST(x, degreesOfFreedom, false) as number;
  } catch (error) {
    throw new FormulaError('Error calculating t-distribution', error);
  }
}

export function betaDistribution(x: number, alpha: number, beta: number, cumulative: boolean): number {
  try {
    return formulajs.BETA.DIST(x, alpha, beta, cumulative, 0, 1) as number;
  } catch (error) {
    throw new FormulaError('Error calculating beta distribution', error);
  }
}

export function betaInverse(probability: number, alpha: number, beta: number): number {
  try {
    return formulajs.BETA.INV(probability, alpha, beta, 0, 1) as number;
  } catch (error) {
    throw new FormulaError('Error calculating inverse beta distribution', error);
  }
}