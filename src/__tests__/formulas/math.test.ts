import {
  sum,
  product,
  quotient,
  mod,
  power,
  sqrt,
  abs,
  ceiling,
  floor,
  round,
  roundDown,
  roundUp,
  trunc
} from '../../formulas/math';
import { FormulaError } from '../../errors';

describe('Math Functions', () => {
  describe('Basic Arithmetic', () => {
    test('calculates sum', () => {
      expect(sum(1, 2, 3)).toBe(6);
      expect(sum(-1, 1)).toBe(0);
      expect(sum()).toBe(0);
    });

    test('calculates product', () => {
      expect(product(2, 3, 4)).toBe(24);
      expect(product(-2, 3)).toBe(-6);
      expect(product()).toBe(0);
    });

    test('calculates quotient', () => {
      expect(quotient(5, 2)).toBe(2);
      expect(quotient(-5, 2)).toBe(-2);
      expect(() => quotient(1, 0)).toThrow(FormulaError);
    });

    test('calculates modulo', () => {
      expect(mod(5, 2)).toBe(1);
      expect(mod(-5, 2)).toBe(1);
      expect(() => mod(1, 0)).toThrow(FormulaError);
    });

    test('calculates power', () => {
      expect(power(2, 3)).toBe(8);
      expect(power(2, -1)).toBe(0.5);
      expect(power(2, 0)).toBe(1);
    });

    test('calculates square root', () => {
      expect(sqrt(4)).toBe(2);
      expect(sqrt(0)).toBe(0);
      expect(() => sqrt(-1)).toThrow(FormulaError);
    });

    test('calculates absolute value', () => {
      expect(abs(-5)).toBe(5);
      expect(abs(5)).toBe(5);
      expect(abs(0)).toBe(0);
    });
  });

  describe('Advanced Math', () => {
    test('calculates ceiling', () => {
      expect(ceiling(2.5, 1)).toBe(3);
      expect(ceiling(-2.5, 1)).toBe(-2);
      expect(ceiling(2.5, 0.5)).toBe(2.5);
    });

    test('calculates floor', () => {
      expect(floor(2.5, 1)).toBe(2);
      expect(floor(-2.5, 1)).toBe(-3);
      expect(floor(2.5, 0.5)).toBe(2.5);
    });

    test('rounds numbers', () => {
      expect(round(2.5)).toBe(3);
      expect(round(2.4)).toBe(2);
      expect(round(2.449, 1)).toBe(2.4);
      expect(round(2.449, 2)).toBe(2.45);
    });

    test('rounds down numbers', () => {
      expect(roundDown(2.9)).toBe(2);
      expect(roundDown(2.99, 1)).toBe(2.9);
      expect(roundDown(-2.9)).toBe(-2);
    });

    test('rounds up numbers', () => {
      expect(roundUp(2.1)).toBe(3);
      expect(roundUp(2.01, 1)).toBe(2.1);
      expect(roundUp(-2.1)).toBe(-3);
    });

    test('truncates numbers', () => {
      expect(trunc(2.9)).toBe(2);
      expect(trunc(-2.9)).toBe(-2);
      expect(trunc(2.934, 2)).toBe(2.93);
    });
  });
});