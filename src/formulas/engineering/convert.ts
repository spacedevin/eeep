import { FormulaError } from '../../errors';
import convertUnits from 'convert-units';

interface UnitMapping {
  category: string;
  unit: string;
}

export function convert(number: number, fromUnit: string, toUnit: string): number {
  try {
    // Parse units to get category and unit type
    const fromParts = parseUnit(fromUnit);
    const toParts = parseUnit(toUnit);

    if (fromParts.category !== toParts.category) {
      throw new Error('Units must be in the same category');
    }

    // Convert value using convert-units
    return convertUnits(number)
      .from(fromParts.unit)
      .to(toParts.unit);
  } catch (error) {
    throw new FormulaError('Error in CONVERT function', error);
  }
}

export function delta(number1: number, number2: number = 0): number {
  try {
    return number1 === number2 ? 1 : 0;
  } catch (error) {
    throw new FormulaError('Error in DELTA function', error);
  }
}

export function erf(x: number): number {
  try {
    // Approximation of error function
    const t = 1 / (1 + 0.5 * Math.abs(x));
    const tau = t * Math.exp(
      -x * x - 1.26551223 +
      1.00002368 * t +
      0.37409196 * t * t +
      0.09678418 * Math.pow(t, 3) -
      0.18628806 * Math.pow(t, 4) +
      0.27886807 * Math.pow(t, 5) -
      1.13520398 * Math.pow(t, 6) +
      1.48851587 * Math.pow(t, 7) -
      0.82215223 * Math.pow(t, 8) +
      0.17087277 * Math.pow(t, 9)
    );
    return x >= 0 ? 1 - tau : tau - 1;
  } catch (error) {
    throw new FormulaError('Error in ERF function', error);
  }
}

export function erfc(x: number): number {
  try {
    return 1 - erf(x);
  } catch (error) {
    throw new FormulaError('Error in ERFC function', error);
  }
}

export function gestep(number: number, step: number = 0): number {
  try {
    return number >= step ? 1 : 0;
  } catch (error) {
    throw new FormulaError('Error in GESTEP function', error);
  }
}

// Helper functions
function parseUnit(unit: string): UnitMapping {
  // Map Excel unit codes to convert-units unit codes
  const unitMap: { [key: string]: UnitMapping } = {
    // Length
    'ft': { category: 'length', unit: 'ft' },
    'm': { category: 'length', unit: 'm' },
    'mi': { category: 'length', unit: 'mi' },
    'km': { category: 'length', unit: 'km' },
    // Weight
    'kg': { category: 'mass', unit: 'kg' },
    'lbs': { category: 'mass', unit: 'lb' },
    'g': { category: 'mass', unit: 'g' },
    // Temperature
    'C': { category: 'temperature', unit: 'C' },
    'F': { category: 'temperature', unit: 'F' },
    'K': { category: 'temperature', unit: 'K' }
  };

  const mapping = unitMap[unit];
  if (!mapping) {
    throw new Error(`Unsupported unit: ${unit}`);
  }

  return mapping;
}