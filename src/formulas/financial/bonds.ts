import { FormulaError } from '../../errors';
import { Decimal } from 'decimal.js';
import { addDays, differenceInDays, isWithinInterval } from 'date-fns';
import * as financial from 'financial';

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

    const daysPerYear = [360, 365, 360, 365, 360][basis];
    const days = differenceInDays(settlement, issue);
    const interest = (par * rate * days) / daysPerYear;

    return new Decimal(interest).toDecimalPlaces(10).toNumber();
  } catch (error) {
    throw new FormulaError('Error in ACCRINT function', error);
  }
}

export function accrintm(
  issue: Date,
  settlement: Date,
  rate: number,
  par: number = 1000,
  basis: number = 0
): number {
  try {
    if (rate <= 0 || par <= 0) {
      throw new Error('Rate and par must be positive');
    }

    if (basis < 0 || basis > 4) {
      throw new Error('Basis must be between 0 and 4');
    }

    if (settlement <= issue) {
      throw new Error('Settlement must be after issue date');
    }

    const daysPerYear = [360, 365, 360, 365, 360][basis];
    const days = differenceInDays(settlement, issue);
    return (par * rate * days) / daysPerYear;
  } catch (error) {
    throw new FormulaError('Error in ACCRINTM function', error);
  }
}

export function coupdaybs(
  settlement: Date,
  maturity: Date,
  frequency: number = 2,
  basis: number = 0
): number {
  try {
    validateCouponDates(settlement, maturity, frequency, basis);
    const previousCouponDate = getPreviousCouponDate(settlement, maturity, frequency);
    return differenceInDays(settlement, previousCouponDate);
  } catch (error) {
    throw new FormulaError('Error in COUPDAYBS function', error);
  }
}

export function coupdays(
  settlement: Date,
  maturity: Date,
  frequency: number = 2,
  basis: number = 0
): number {
  try {
    validateCouponDates(settlement, maturity, frequency, basis);
    const daysPerYear = [360, 365, 360, 365, 360][basis];
    return daysPerYear / frequency;
  } catch (error) {
    throw new FormulaError('Error in COUPDAYS function', error);
  }
}

export function coupdaysnc(
  settlement: Date,
  maturity: Date,
  frequency: number = 2,
  basis: number = 0
): number {
  try {
    validateCouponDates(settlement, maturity, frequency, basis);
    const nextCouponDate = getNextCouponDate(settlement, maturity, frequency);
    return differenceInDays(nextCouponDate, settlement);
  } catch (error) {
    throw new FormulaError('Error in COUPDAYSNC function', error);
  }
}

export function coupncd(
  settlement: Date,
  maturity: Date,
  frequency: number = 2,
  basis: number = 0
): Date {
  try {
    validateCouponDates(settlement, maturity, frequency, basis);
    return getNextCouponDate(settlement, maturity, frequency);
  } catch (error) {
    throw new FormulaError('Error in COUPNCD function', error);
  }
}

export function coupnum(
  settlement: Date,
  maturity: Date,
  frequency: number = 2,
  basis: number = 0
): number {
  try {
    validateCouponDates(settlement, maturity, frequency, basis);
    const monthsBetween = differenceInDays(maturity, settlement) / (365.25 / 12);
    return Math.ceil(monthsBetween * frequency / 12);
  } catch (error) {
    throw new FormulaError('Error in COUPNUM function', error);
  }
}

export function couppcd(
  settlement: Date,
  maturity: Date,
  frequency: number = 2,
  basis: number = 0
): Date {
  try {
    validateCouponDates(settlement, maturity, frequency, basis);
    return getPreviousCouponDate(settlement, maturity, frequency);
  } catch (error) {
    throw new FormulaError('Error in COUPPCD function', error);
  }
}

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

export function disc(
  settlement: Date,
  maturity: Date,
  price: number,
  redemption: number,
  basis: number = 0
): number {
  try {
    if (price <= 0 || redemption <= 0) {
      throw new Error('Price and redemption must be positive');
    }

    if (basis < 0 || basis > 4) {
      throw new Error('Basis must be between 0 and 4');
    }

    if (settlement >= maturity) {
      throw new Error('Settlement must be before maturity');
    }

    const daysPerYear = [360, 365, 360, 365, 360][basis];
    const days = differenceInDays(maturity, settlement);
    return ((redemption - price) / redemption) * (daysPerYear / days);
  } catch (error) {
    throw new FormulaError('Error in DISC function', error);
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