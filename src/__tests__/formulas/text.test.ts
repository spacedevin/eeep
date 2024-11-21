import {
  concatenate,
  left,
  right,
  mid,
  len,
  lower,
  upper,
  proper,
  replace,
  substitute,
  trim,
  value,
  text
} from '../../formulas/text';
import { FormulaError } from '../../errors';

describe('Text Functions', () => {
  describe('Basic Text Functions', () => {
    test('CONCATENATE function', () => {
      expect(concatenate('Hello', ' ', 'World')).toBe('Hello World');
      expect(concatenate('A', 'B', 'C')).toBe('ABC');
      expect(concatenate('')).toBe('');
    });

    test('LEFT function', () => {
      expect(left('Hello', 2)).toBe('He');
      expect(left('Hello')).toBe('H');
      expect(left('', 2)).toBe('');
    });

    test('RIGHT function', () => {
      expect(right('Hello', 2)).toBe('lo');
      expect(right('Hello')).toBe('o');
      expect(right('', 2)).toBe('');
    });

    test('MID function', () => {
      expect(mid('Hello', 2, 2)).toBe('el');
      expect(mid('Hello', 1, 5)).toBe('Hello');
      expect(mid('', 1, 1)).toBe('');
    });

    test('LEN function', () => {
      expect(len('Hello')).toBe(5);
      expect(len('')).toBe(0);
      expect(len(' ')).toBe(1);
    });

    test('LOWER function', () => {
      expect(lower('HELLO')).toBe('hello');
      expect(lower('Hello World')).toBe('hello world');
      expect(lower('')).toBe('');
    });

    test('UPPER function', () => {
      expect(upper('hello')).toBe('HELLO');
      expect(upper('Hello World')).toBe('HELLO WORLD');
      expect(upper('')).toBe('');
    });

    test('PROPER function', () => {
      expect(proper('hello world')).toBe('Hello World');
      expect(proper('HELLO WORLD')).toBe('Hello World');
      expect(proper('')).toBe('');
    });
  });

  describe('Advanced Text Functions', () => {
    test('REPLACE function', () => {
      expect(replace('Hello World', 7, 5, 'Earth')).toBe('Hello Earth');
      expect(replace('Hello', 1, 2, 'i')).toBe('illo');
    });

    test('SUBSTITUTE function', () => {
      expect(substitute('Hello World World', 'World', 'Earth')).toBe('Hello Earth Earth');
      expect(substitute('Hello World World', 'World', 'Earth', 2)).toBe('Hello World Earth');
    });

    test('TRIM function', () => {
      expect(trim('  Hello  World  ')).toBe('Hello World');
      expect(trim('')).toBe('');
    });

    test('VALUE function', () => {
      expect(value('123')).toBe(123);
      expect(value('-123.45')).toBe(-123.45);
      expect(() => value('abc')).toThrow(FormulaError);
    });

    test('TEXT function', () => {
      expect(text(1234.567, '0.00')).toBe('1234.57');
      expect(text(1234.567, '0')).toBe('1235');
    });
  });

  describe('Error Handling', () => {
    test('handles invalid arguments', () => {
      expect(() => left(123 as any)).toThrow(FormulaError);
      expect(() => right(123 as any)).toThrow(FormulaError);
      expect(() => mid('text', -1, 1)).toThrow(FormulaError);
    });

    test('handles empty or invalid input', () => {
      expect(() => value('abc')).toThrow(FormulaError);
      expect(() => text('abc' as any, '0.00')).toThrow(FormulaError);
    });
  });
});