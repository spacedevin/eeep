import { FormulaEvaluator } from '../../formulas/evaluator';
import { FormulaParser } from '../../formulas/parser';
import { FormulaError } from '../../errors';

describe('Formula Evaluator', () => {
  let evaluator: FormulaEvaluator;
  let parser: FormulaParser;

  beforeEach(() => {
    evaluator = new FormulaEvaluator();
    parser = new FormulaParser();
  });

  describe('Basic Arithmetic', () => {
    test('evaluates addition', () => {
      const ast = parser.parse('1 + 2');
      expect(evaluator.evaluate(ast)).toBe(3);
    });

    test('evaluates subtraction', () => {
      const ast = parser.parse('5 - 3');
      expect(evaluator.evaluate(ast)).toBe(2);
    });

    test('evaluates multiplication', () => {
      const ast = parser.parse('4 * 3');
      expect(evaluator.evaluate(ast)).toBe(12);
    });

    test('evaluates division', () => {
      const ast = parser.parse('10 / 2');
      expect(evaluator.evaluate(ast)).toBe(5);
    });

    test('handles division by zero', () => {
      const ast = parser.parse('1 / 0');
      expect(() => evaluator.evaluate(ast)).toThrow(FormulaError);
    });
  });

  describe('Function Evaluation', () => {
    test('evaluates SUM function', () => {
      const ast = parser.parse('SUM(1, 2, 3)');
      expect(evaluator.evaluate(ast)).toBe(6);
    });

    test('evaluates AVERAGE function', () => {
      const ast = parser.parse('AVERAGE(2, 4, 6)');
      expect(evaluator.evaluate(ast)).toBe(4);
    });

    test('evaluates nested functions', () => {
      const ast = parser.parse('SUM(1, AVERAGE(2, 4), 3)');
      expect(evaluator.evaluate(ast)).toBe(7);
    });
  });

  describe('Context and References', () => {
    test('resolves cell references', () => {
      const ast = parser.parse('A1 + B1');
      const context = { A1: 10, B1: 20 };
      expect(evaluator.evaluate(ast, context)).toBe(30);
    });

    test('handles missing references', () => {
      const ast = parser.parse('A1 + C1');
      const context = { A1: 10 };
      expect(() => evaluator.evaluate(ast, context)).toThrow(FormulaError);
    });
  });

  describe('String Operations', () => {
    test('concatenates strings', () => {
      const ast = parser.parse('"Hello" & " " & "World"');
      expect(evaluator.evaluate(ast)).toBe('Hello World');
    });

    test('converts numbers to strings', () => {
      const ast = parser.parse('"Value: " & 123');
      expect(evaluator.evaluate(ast)).toBe('Value: 123');
    });
  });

  describe('Comparison Operators', () => {
    test('evaluates equality', () => {
      const ast = parser.parse('1 = 1');
      expect(evaluator.evaluate(ast)).toBe(true);
    });

    test('evaluates greater than', () => {
      const ast = parser.parse('5 > 3');
      expect(evaluator.evaluate(ast)).toBe(true);
    });

    test('evaluates less than or equal', () => {
      const ast = parser.parse('4 <= 4');
      expect(evaluator.evaluate(ast)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    test('handles invalid functions', () => {
      const ast = parser.parse('INVALID(1, 2)');
      expect(() => evaluator.evaluate(ast)).toThrow(FormulaError);
    });

    test('handles invalid operators', () => {
      const ast = {
        type: 'operator',
        value: '?',
        children: [
          { type: 'number', value: '1' },
          { type: 'number', value: '2' }
        ]
      };
      expect(() => evaluator.evaluate(ast)).toThrow(FormulaError);
    });
  });

  describe('Cache Management', () => {
    test('caches function results', () => {
      const ast = parser.parse('SUM(1, 2, 3)');
      const result1 = evaluator.evaluate(ast);
      const result2 = evaluator.evaluate(ast);
      expect(result1).toBe(result2);
    });

    test('clears cache', () => {
      const ast = parser.parse('SUM(1, 2, 3)');
      evaluator.evaluate(ast);
      evaluator.clearCache();
      // Cache should be empty now
      expect(() => evaluator.evaluate(ast)).not.toThrow();
    });
  });
});