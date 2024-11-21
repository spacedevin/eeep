import { FormulaParser } from '../../formulas/parser';
import { FormulaError } from '../../errors';

describe('Formula Parser', () => {
  let parser: FormulaParser;

  beforeEach(() => {
    parser = new FormulaParser();
  });

  describe('Tokenization', () => {
    test('tokenizes numbers', () => {
      const ast = parser.parse('1 + 2.5');
      expect(ast.type).toBe('operator');
      expect(ast.value).toBe('+');
      expect(ast.children?.[0].type).toBe('number');
      expect(ast.children?.[0].value).toBe('1');
      expect(ast.children?.[1].value).toBe('2.5');
    });

    test('tokenizes strings', () => {
      const ast = parser.parse('"Hello" & "World"');
      expect(ast.type).toBe('operator');
      expect(ast.value).toBe('&');
      expect(ast.children?.[0].type).toBe('string');
      expect(ast.children?.[0].value).toBe('Hello');
    });

    test('tokenizes operators', () => {
      const ast = parser.parse('1 + 2 * 3');
      expect(ast.type).toBe('operator');
      expect(ast.value).toBe('+');
      expect(ast.children?.[1].type).toBe('operator');
      expect(ast.children?.[1].value).toBe('*');
    });

    test('tokenizes functions', () => {
      const ast = parser.parse('SUM(1, 2, 3)');
      expect(ast.type).toBe('function');
      expect(ast.value).toBe('SUM');
      expect(ast.children).toHaveLength(3);
    });

    test('tokenizes references', () => {
      const ast = parser.parse('A1 + B2');
      expect(ast.type).toBe('operator');
      expect(ast.children?.[0].type).toBe('reference');
      expect(ast.children?.[0].value).toBe('A1');
    });
  });

  describe('AST Building', () => {
    test('builds AST for simple arithmetic', () => {
      const ast = parser.parse('1 + 2 * 3');
      expect(ast.type).toBe('operator');
      expect(ast.value).toBe('+');
      expect(ast.children).toHaveLength(2);
      expect(ast.children?.[1].type).toBe('operator');
      expect(ast.children?.[1].value).toBe('*');
    });

    test('builds AST for function calls', () => {
      const ast = parser.parse('SUM(A1:A10, B1)');
      expect(ast.type).toBe('function');
      expect(ast.value).toBe('SUM');
      expect(ast.children).toBeDefined();
      expect(ast.children?.[0].type).toBe('reference');
    });

    test('builds AST for nested expressions', () => {
      const ast = parser.parse('(1 + 2) * 3');
      expect(ast.type).toBe('operator');
      expect(ast.value).toBe('*');
      expect(ast.children?.[0].type).toBe('operator');
      expect(ast.children?.[0].value).toBe('+');
    });
  });

  describe('Error Handling', () => {
    test('handles invalid formulas', () => {
      expect(() => parser.parse('1 +')).toThrow(FormulaError);
      expect(() => parser.parse('SUM(1,)')).toThrow(FormulaError);
      expect(() => parser.parse('1 2')).toThrow(FormulaError);
    });

    test('handles invalid characters', () => {
      expect(() => parser.parse('1 # 2')).toThrow(FormulaError);
    });

    test('handles unclosed strings', () => {
      expect(() => parser.parse('"Hello')).toThrow(FormulaError);
    });

    test('handles unclosed parentheses', () => {
      expect(() => parser.parse('(1 + 2')).toThrow(FormulaError);
    });
  });
});