import {
  bin2dec,
  bin2hex,
  bin2oct,
  dec2bin,
  dec2hex,
  dec2oct,
  hex2bin,
  hex2dec,
  hex2oct,
  oct2bin,
  oct2dec,
  oct2hex,
  imabs,
  imaginary,
  imreal,
  imsum,
  improduct,
  imdiv,
  impower
} from '../../formulas/engineering';
import { FormulaError } from '../../errors';

describe('Engineering Functions', () => {
  describe('Number Conversion Functions', () => {
    test('BIN2DEC function', () => {
      expect(bin2dec('1010')).toBe(10);
      expect(bin2dec('1111')).toBe(15);
      expect(() => bin2dec('12')).toThrow(FormulaError);
    });

    test('BIN2HEX function', () => {
      expect(bin2hex('1010')).toBe('A');
      expect(bin2hex('1111')).toBe('F');
      expect(() => bin2hex('12')).toThrow(FormulaError);
    });

    test('BIN2OCT function', () => {
      expect(bin2oct('1010')).toBe('12');
      expect(bin2oct('1111')).toBe('17');
      expect(() => bin2oct('12')).toThrow(FormulaError);
    });

    test('DEC2BIN function', () => {
      expect(dec2bin(10)).toBe('1010');
      expect(dec2bin(15)).toBe('1111');
      expect(() => dec2bin(512)).toThrow(FormulaError);
    });

    test('DEC2HEX function', () => {
      expect(dec2hex(10)).toBe('A');
      expect(dec2hex(15)).toBe('F');
      expect(dec2hex(255)).toBe('FF');
    });

    test('DEC2OCT function', () => {
      expect(dec2oct(10)).toBe('12');
      expect(dec2oct(15)).toBe('17');
      expect(dec2oct(64)).toBe('100');
    });

    test('HEX2BIN function', () => {
      expect(hex2bin('A')).toBe('1010');
      expect(hex2bin('F')).toBe('1111');
      expect(() => hex2bin('G')).toThrow(FormulaError);
    });

    test('HEX2DEC function', () => {
      expect(hex2dec('A')).toBe(10);
      expect(hex2dec('F')).toBe(15);
      expect(hex2dec('FF')).toBe(255);
    });

    test('HEX2OCT function', () => {
      expect(hex2oct('A')).toBe('12');
      expect(hex2oct('F')).toBe('17');
      expect(() => hex2oct('G')).toThrow(FormulaError);
    });

    test('OCT2BIN function', () => {
      expect(oct2bin('12')).toBe('1010');
      expect(oct2bin('17')).toBe('1111');
      expect(() => oct2bin('8')).toThrow(FormulaError);
    });

    test('OCT2DEC function', () => {
      expect(oct2dec('12')).toBe(10);
      expect(oct2dec('17')).toBe(15);
      expect(() => oct2dec('8')).toThrow(FormulaError);
    });

    test('OCT2HEX function', () => {
      expect(oct2hex('12')).toBe('A');
      expect(oct2hex('17')).toBe('F');
      expect(() => oct2hex('8')).toThrow(FormulaError);
    });
  });

  describe('Complex Number Functions', () => {
    test('IMABS function', () => {
      expect(imabs('3+4i')).toBe(5);
      expect(imabs('5')).toBe(5);
    });

    test('IMAGINARY function', () => {
      expect(imaginary('3+4i')).toBe(4);
      expect(imaginary('5')).toBe(0);
    });

    test('IMREAL function', () => {
      expect(imreal('3+4i')).toBe(3);
      expect(imreal('5')).toBe(5);
    });

    test('IMSUM function', () => {
      expect(imsum('3+4i', '2-i')).toBe('5+3i');
      expect(imsum('1+i', '2+2i', '3+3i')).toBe('6+6i');
    });

    test('IMPRODUCT function', () => {
      expect(improduct('3+4i', '2-i')).toBe('10+5i');
      expect(improduct('1+i', '2+2i')).toBe('0+4i');
    });

    test('IMDIV function', () => {
      expect(imdiv('3+4i', '2-i')).toBe('0.4+2.2i');
      expect(() => imdiv('1+i', '0')).toThrow(FormulaError);
    });

    test('IMPOWER function', () => {
      expect(impower('1+i', 2)).toBe('0+2i');
      expect(impower('2+3i', 1)).toBe('2+3i');
    });
  });

  describe('Error Handling', () => {
    test('handles invalid binary numbers', () => {
      expect(() => bin2dec('102')).toThrow(FormulaError);
      expect(() => bin2hex('102')).toThrow(FormulaError);
      expect(() => bin2oct('102')).toThrow(FormulaError);
    });

    test('handles invalid decimal numbers', () => {
      expect(() => dec2bin(-513)).toThrow(FormulaError);
      expect(() => dec2hex(-513)).toThrow(FormulaError);
      expect(() => dec2oct(-513)).toThrow(FormulaError);
    });

    test('handles invalid hex numbers', () => {
      expect(() => hex2bin('GG')).toThrow(FormulaError);
      expect(() => hex2dec('GG')).toThrow(FormulaError);
      expect(() => hex2oct('GG')).toThrow(FormulaError);
    });

    test('handles invalid octal numbers', () => {
      expect(() => oct2bin('8')).toThrow(Formula Error);
      expect(() => oct2dec('8')).toThrow(FormulaError);
      expect(() => oct2hex('8')).toThrow(FormulaError);
    });

    test('handles invalid complex numbers', () => {
      expect(() => imabs('invalid')).toThrow(FormulaError);
      expect(() => imaginary('invalid')).toThrow(FormulaError);
      expect(() => imreal('invalid')).toThrow(FormulaError);
      expect(() => imsum('invalid', '1+i')).toThrow(FormulaError);
      expect(() => improduct('invalid', '1+i')).toThrow(FormulaError);
      expect(() => imdiv('1+i', '0')).toThrow(FormulaError);
      expect(() => impower('invalid', 2)).toThrow(FormulaError);
    });
  });
});