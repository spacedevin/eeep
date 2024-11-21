import { FormulaEngine } from '../../formulas/engine';
import { FormulaError } from '../../errors';

describe('Formula Engine', () => {
  let engine: FormulaEngine;

  beforeEach(() => {
    engine = new FormulaEngine();
  });

  test('evaluates simple formula', () => {
    const result = engine.evaluate('=1+1');
    expect(result).toBe(2);
  });

  test('evaluates formula with context', () => {
    const result = engine.evaluate('=A1+B1', {
      A1: 1,
      B1: 2
    });
    expect(result).toBe(3);
  });

  test('evaluates batch of formulas', () => {
    const formulas = ['=1+1', '=2*3', '=10/2'];
    const results = engine.batch(formulas);
    expect(results).toEqual([2, 6, 5]);
  });

  test('registers custom function', () => {
    engine.registerFunction('DOUBLE', (x: number) => x * 2);
    const result = engine.evaluate('=DOUBLE(2)');
    expect(result).toBe(4);
  });

  test('throws error for invalid formula', () => {
    expect(() => engine.evaluate('=1+')).toThrow(FormulaError);
  });

  test('clears cache', () => {
    engine.evaluate('=1+1');
    expect(() => engine.clearCache()).not.toThrow();
  });
});