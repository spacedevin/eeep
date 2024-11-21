import { FormulaError } from '../../errors';
import { Decimal } from 'decimal.js';
import { addDays, differenceInDays, isWithinInterval } from 'date-fns';
import * as financial from 'financial';

// Bond Functions
export function accrint(
  issue: Date,
  firstInterest: Date,
  settlement: Date,
  rate: number,
  par: number = 1000,
  frequency: number = 2,
  basis: number = 0
): number {
  try {
    if (rate <= 0 || par <= 0) {
      throw new Error('Rate and par must be positive');
    }

    if (frequency !== 1 && frequency !== 2 && frequency !== 4) {
      throw new Error('Frequency must be 1, 2, or 4');
    }

    if (basis < 0 || basis > 4) {
      throw new Error('Basis must be between 0 and 4');
    }

    if (settlement <= issue) {
      throw new Error('Settlement must be after issue date');
    }

    // Calculate accrued interest
    const daysPerYear = [360, 365, 360, 365, 360][basis];
    const days = differenceInDays(settlement, issue);
    const interest = (par * rate * days) / daysPerYear;

    return new Decimal(interest).toDecimalPlaces(10).toNumber();
  } catch (error) {
    throw new FormulaError('Error in ACCRINT function', error);
  }
}

// Payment Functions
export function cumipmt(
  rate: number,
  nper: number,
  pv: number,
  startPeriod: number,
  endPeriod: number,
  type: number = 0
): number {
  try {
    if (rate <= 0 || nper <= 0 || pv <= 0) {
      throw new Error('Rate, nper, and pv must be positive');
    }

    if (startPeriod < 1 || endPeriod < startPeriod || endPeriod > nper) {
      throw new Error('Invalid period range');
    }

    if (type !== 0 && type !== 1) {
      throw new Error('Type must be 0 or 1');
    }

    let totalInterest = 0;
    for (let period = startPeriod; period <= endPeriod; period++) {
      totalInterest += financial.ipmt(rate, period, nper, pv, 0, type);
    }

    return new Decimal(totalInterest).toDecimalPlaces(10).toNumber();
  } catch (error) {
    throw new FormulaError('Error in CUMIPMT function', error);
  }
}

export function cumprinc(
  rate: number,
  nper: number,
  pv: number,
  startPeriod: number,
  endPeriod: number,
  type: number = 0
): number {
  try {
    if (rate <= 0 || nper <= 0 || pv <= 0) {
      throw new Error('Rate, nper, and pv must be positive');
    }

    if (startPeriod < 1 || endPeriod < startPeriod || endPeriod > nper) {
      throw new Error('Invalid period range');
    }

    if (type !== 0 && type !== 1) {
      throw new Error('Type must be 0 or 1');
    }

    let totalPrincipal = 0;
    for (let period = startPeriod; period <= endPeriod; period++) {
      totalPrincipal += financial.ppmt(rate, period, nper, pv, 0, type);
    }

    return new Decimal(totalPrincipal).toDecimalPlaces(10).toNumber();
  } catch (error) {
    throw new FormulaError('Error in CUMPRINC function', error);
  }
}

export function dollarde(
  fractionalDollar: number,
  fraction: number
): number {
  try {
    if (fraction <= 0) {
      throw new Error('Fraction must be positive');
    }

    if (!Number.isInteger(fraction)) {
      throw new Error('Fraction must be an integer');
    }

    const wholePart = Math.floor(fractionalDollar);
    const fractionPart = fractionalDollar - wholePart;
    const decimalPart = fractionPart * (Math.pow(10, Math.ceil(Math.log10(fraction))) / fraction);

    return new Decimal(wholePart).plus(decimalPart).toNumber();
  } catch (error) {
    throw new FormulaError('Error in DOLLARDE function', error);
  }
}

export function dollarfr(
  decimalDollar: number,
  fraction: number
): number {
  try {
    if (fraction <= 0) {
      throw new Error('Fraction must be positive');
    }

    if (!Number.isInteger(fraction)) {
      throw new Error('Fraction must be an integer');
    }

    const wholePart = Math.floor(decimalDollar);
    const decimalPart = decimalDollar - wholePart;
    const fractionPart = decimalPart / (Math.pow(10, Math.ceil(Math.log10(fraction))) / fraction);

    return new Decimal(wholePart).plus(fractionPart).toNumber();
  } catch (error) {
    throw new FormulaError('Error in DOLLARFR function', error);
  }
}

// Depreciation Functions
export function amorlinc(
  cost: number,
  datePurchased: Date,
  firstPeriod: Date,
  salvage: number,
  period: number,
  rate: number,
  basis: number = 0
): number {
  try {
    if (cost <= 0 || salvage < 0 || period < 0 || rate <= 0) {
      throw new Error('Invalid input parameters');
    }

    if (basis < 0 || basis > 4) {
      throw new Error('Basis must be between 0 and 4');
    }

    const daysPerYear = [360, 365, 360, 365, 360][basis];
    const days = differenceInDays(firstPeriod, datePurchased);
    const months = Math.floor(days / (daysPerYear / 12));
    
    if (months > period * 12) {
      return 0;
    }

    const depreciation = (cost - salvage) * rate / 12;
    const firstYearDepreciation = depreciation * (12 - (months % 12)) / 12;
    
    if (period === 0) {
      return firstYearDepreciation;
    }

    return depreciation;
  } catch (error) {
    throw new FormulaError('Error in AMORLINC function', error);
  }
}

export function amordegrc(
  cost: number,
  datePurchased: Date,
  firstPeriod: Date,
  salvage: number,
  period: number,
  rate: number,
  basis: number = 0
): number {
  try {
    if (cost <= 0 || salvage < 0 || period < 0 || rate <= 0) {
      throw new Error('Invalid input parameters');
    }

    if (basis < 0 || basis > 4) {
      throw new Error('Basis must be between 0 and 4');
    }

    // Get depreciation coefficient based on asset life
    const life = 1 / rate;
    let coefficient = 2.5;
    
    if (life < 3) coefficient = 1;
    else if (life < 5) coefficient = 1.5;
    else if (life <= 6) coefficient = 2;
    
    rate *= coefficient;
    
    const daysPerYear = [360, 365, 360, 365, 360][basis];
    const days = differenceInDays(firstPeriod, datePurchased);
    const months = Math.floor(days / (daysPerYear / 12));
    
    if (months > period * 12) {
      return 0;
    }

    let currentValue = cost;
    let totalDepreciation = 0;
    
    for (let i = 0; i <= period; i++) {
      const depreciation = i === 0
        ? (currentValue * rate * (12 - (months % 12))) / 12
        : currentValue * rate;
        
      currentValue -= depreciation;
      totalDepreciation += depreciation;
      
      if (currentValue < salvage) {
        return depreciation - (currentValue - salvage);
      }
    }

    return 0;
  } catch (error) {
    throw new FormulaError('Error in AMORDEGRC function', error);
  }
}

// Helper functions
function validateCouponDates(
  settlement: Date,
  maturity: Date,
  frequency: number,
  basis: number
): void {
  if (frequency !== 1 && frequency !== 2 && frequency !== 4) {
    throw new Error('Frequency must be 1, 2, or 4');
  }

  if (basis < 0 || basis > 4) {
    throw new Error('Basis must be between 0 and 4');
  }

  if (settlement >= maturity) {
    throw new Error('Settlement must be before maturity');
  }
}

function getNextCouponDate(
  settlement: Date,
  maturity: Date,
  frequency: number
): Date {
  const monthsPerPeriod = 12 / frequency;
  let date = new Date(settlement);

  while (date <= settlement || !isWithinInterval(date, { start: settlement, end: maturity })) {
    date = addDays(date, monthsPerPeriod * 30);
  }

  return date;
}

function getPreviousCouponDate(
  settlement: Date,
  maturity: Date,
  frequency: number
): Date {
  const monthsPerPeriod = 12 / frequency;
  let date = new Date(settlement);

  while (date >= settlement || !isWithinInterval(date, { start: new Date(0), end: settlement })) {
    date = addDays(date, -monthsPerPeriod * 30);
  }

  return date;
}