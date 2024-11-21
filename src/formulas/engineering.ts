import { FormulaError } from '../errors';
import * as formulajs from '@formulajs/formulajs';

// Number Conversion Functions
export function bin2dec(binary: string): number {
  try {
    return formulajs.BIN2DEC(binary) as number;
  } catch (error) {
    throw new FormulaError('Error in BIN2DEC function', error);
  }
}

export function bin2hex(binary: string, places?: number): string {
  try {
    return formulajs.BIN2HEX(binary, places) as string;
  } catch (error) {
    throw new FormulaError('Error in BIN2HEX function', error);
  }
}

export function bin2oct(binary: string, places?: number): string {
  try {
    return formulajs.BIN2OCT(binary, places) as string;
  } catch (error) {
    throw new FormulaError('Error in BIN2OCT function', error);
  }
}

export function dec2bin(decimal: number, places?: number): string {
  try {
    return formulajs.DEC2BIN(decimal, places) as string;
  } catch (error) {
    throw new FormulaError('Error in DEC2BIN function', error);
  }
}

export function dec2hex(decimal: number, places?: number): string {
  try {
    return formulajs.DEC2HEX(decimal, places) as string;
  } catch (error) {
    throw new FormulaError('Error in DEC2HEX function', error);
  }
}

export function dec2oct(decimal: number, places?: number): string {
  try {
    return formulajs.DEC2OCT(decimal, places) as string;
  } catch (error) {
    throw new FormulaError('Error in DEC2OCT function', error);
  }
}

export function hex2bin(hex: string, places?: number): string {
  try {
    return formulajs.HEX2BIN(hex, places) as string;
  } catch (error) {
    throw new FormulaError('Error in HEX2BIN function', error);
  }
}

export function hex2dec(hex: string): number {
  try {
    return formulajs.HEX2DEC(hex) as number;
  } catch (error) {
    throw new FormulaError('Error in HEX2DEC function', error);
  }
}

export function hex2oct(hex: string, places?: number): string {
  try {
    return formulajs.HEX2OCT(hex, places) as string;
  } catch (error) {
    throw new FormulaError('Error in HEX2OCT function', error);
  }
}

export function oct2bin(octal: string, places?: number): string {
  try {
    return formulajs.OCT2BIN(octal, places) as string;
  } catch (error) {
    throw new FormulaError('Error in OCT2BIN function', error);
  }
}

export function oct2dec(octal: string): number {
  try {
    const result = formulajs.OCT2DEC(octal);
    if (result instanceof Error) throw result;
    return result;
  } catch (error) {
    throw new FormulaError('Error in OCT2DEC function', error);
  }
}

export function oct2hex(octal: string, places?: number): string {
  try {
    const result = formulajs.OCT2HEX(octal, places);
    if (result instanceof Error) throw result;
    return result;
  } catch (error) {
    throw new FormulaError('Error in OCT2HEX function', error);
  }
}

// Complex Number Functions
export function imabs(inumber: string): number {
  try {
    const result = formulajs.IMABS(inumber);
    if (result instanceof Error) throw result;
    return result;
  } catch (error) {
    throw new FormulaError('Error in IMABS function', error);
  }
}

export function imaginary(inumber: string): number {
  try {
    return formulajs.IMAGINARY(inumber) as number;
  } catch (error) {
    throw new FormulaError('Error in IMAGINARY function', error);
  }
}

export function imreal(inumber: string): number {
  try {
    return formulajs.IMREAL(inumber) as number;
  } catch (error) {
    throw new FormulaError('Error in IMREAL function', error);
  }
}

export function imsum(...args: string[]): string {
  try {
    return formulajs.IMSUM(...args) as string;
  } catch (error) {
    throw new FormulaError('Error in IMSUM function', error);
  }
}

export function improduct(...args: string[]): string {
  try {
    return formulajs.IMPRODUCT(...args) as string;
  } catch (error) {
    throw new FormulaError('Error in IMPRODUCT function', error);
  }
}

export function imdiv(inumber1: string, inumber2: string): string {
  try {
    return formulajs.IMDIV(inumber1, inumber2) as string;
  } catch (error) {
    throw new FormulaError('Error in IMDIV function', error);
  }
}

export function impower(inumber: string, number: number): string {
  try {
    return formulajs.IMPOWER(inumber, number) as string;
  } catch (error) {
    throw new FormulaError('Error in IMPOWER function', error);
  }
}