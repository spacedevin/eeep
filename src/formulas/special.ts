import { FormulaError } from '../errors';

export function aggregate(
  functionNum: number,
  options: number,
  ref: any[],
  ...refs: any[]
): number {
  try {
    // Validate function number (1-19)
    if (functionNum < 1 || functionNum > 19) {
      throw new Error('Invalid function number');
    }

    // Combine all references
    const allValues = [...ref, ...refs.flat()];

    // Filter values based on options
    const values = allValues.filter(value => {
      if (options & 0) return true; // Include hidden values
      if (options & 1) return false; // Ignore hidden values
      if (options & 2) return true; // Include error values
      if (options & 3) return false; // Ignore error values
      if (options & 4) return true; // Include empty cells
      if (options & 5) return false; // Ignore empty cells
      return true;
    });

    // Apply selected function
    switch (functionNum) {
      case 1: return Math.min(...values);
      case 2: return Math.max(...values);
      case 3: return values.reduce((a, b) => a + b, 0) / values.length;
      case 4: return values.reduce((a, b) => a + b, 0);
      case 5: return values.reduce((a, b) => a * b, 1);
      case 6: return values.reduce((a, b) => a + b * b, 0) / values.length;
      case 7: return Math.sqrt(values.reduce((a, b) => a + b * b, 0) / values.length);
      case 8: return values.reduce((a, b) => a + b * b, 0);
      case 9: return values.reduce((a, b) => a + b, 0);
      // Add more functions as needed
      default:
        throw new Error('Function not implemented');
    }
  } catch (error) {
    throw new FormulaError('Error in AGGREGATE function', error);
  }
}

export function arabic(romanNumber: string): number {
  try {
    const romanNumerals: { [key: string]: number } = {
      'M': 1000,
      'CM': 900,
      'D': 500,
      'CD': 400,
      'C': 100,
      'XC': 90,
      'L': 50,
      'XL': 40,
      'X': 10,
      'IX': 9,
      'V': 5,
      'IV': 4,
      'I': 1
    };

    // Validate roman numeral
    if (!/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(romanNumber)) {
      throw new Error('Invalid roman numeral');
    }

    let result = 0;
    let i = 0;
    const upperRoman = romanNumber.toUpperCase();

    while (i < upperRoman.length) {
      // Check for two-character numerals first
      if (i + 1 < upperRoman.length) {
        const twoChar = upperRoman.substr(i, 2);
        if (romanNumerals[twoChar]) {
          result += romanNumerals[twoChar];
          i += 2;
          continue;
        }
      }
      // Handle single character numerals
      result += romanNumerals[upperRoman[i]];
      i++;
    }

    return result;
  } catch (error) {
    throw new FormulaError('Error in ARABIC function', error);
  }
}

export function roman(number: number, form: boolean = true): string {
  try {
    if (number <= 0 || number >= 4000) {
      throw new Error('Number must be between 1 and 3999');
    }

    const romanNumerals = form ? 
      // Classic form
      [
        ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
        ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
        ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
      ] as const :
      // Simplified form
      [
        ['M', 1000], ['D', 500], ['C', 100],
        ['L', 50], ['X', 10], ['V', 5], ['I', 1]
      ] as const;

    let result = '';
    let remaining = number;

    for (const [numeral, value] of romanNumerals) {
      while (remaining >= value) {
        result += numeral;
        remaining -= value;
      }
    }

    return result;
  } catch (error) {
    throw new FormulaError('Error in ROMAN function', error);
  }
}

export function base(number: number, radix: number, minLength: number = 0): string {
  try {
    // Validate parameters
    if (radix < 2 || radix > 36) {
      throw new Error('Radix must be between 2 and 36');
    }
    if (minLength < 0 || minLength > 255) {
      throw new Error('Minimum length must be between 0 and 255');
    }

    // Convert number to specified base
    let result = Math.abs(Math.floor(number)).toString(radix).toUpperCase();

    // Pad with zeros if necessary
    while (result.length < minLength) {
      result = '0' + result;
    }

    return result;
  } catch (error) {
    throw new FormulaError('Error in BASE function', error);
  }
}