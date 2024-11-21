import {
  vlookup,
  hlookup,
  lookup,
  match,
  index,
  transpose,
  sort,
  unique,
  filter,
  sequence,
  column,
  columns,
  row,
  rows
} from '../../formulas/lookup';
import { FormulaError } from '../../errors';

describe('Lookup Functions', () => {
  describe('Basic Lookup Functions', () => {
    const sampleData = [
      ['ID', 'Name', 'Value'],
      [1, 'John', 100],
      [2, 'Jane', 200],
      [3, 'Bob', 300]
    ];

    test('VLOOKUP function', () => {
      expect(vlookup(2, sampleData, 2)).toBe('Jane');
      expect(vlookup(3, sampleData, 3)).toBe(300);
      expect(() => vlookup(4, sampleData, 2)).toThrow(FormulaError);
    });

    test('HLOOKUP function', () => {
      const data = transpose(sampleData);
      expect(hlookup('Name', data, 2)).toBe('John');
      expect(hlookup('Value', data, 3)).toBe(300);
      expect(() => hlookup('Age', data, 2)).toThrow(FormulaError);
    });

    test('LOOKUP function', () => {
      const vector = [1, 2, 3];
      const result = [100, 200, 300];
      expect(lookup(2, vector, result)).toBe(200);
      expect(() => lookup(4, vector, result)).toThrow(FormulaError);
    });

    test('MATCH function', () => {
      const array = [1, 2, 3, 4, 5];
      expect(match(3, array)).toBe(3);
      expect(() => match(6, array)).toThrow(FormulaError);
    });

    test('INDEX function', () => {
      expect(index(sampleData, 2, 2)).toBe('Jane');
      expect(index(['a', 'b', 'c'], 2)).toBe('b');
    });
  });

  describe('Array Functions', () => {
    test('TRANSPOSE function', () => {
      const array = [[1, 2], [3, 4]];
      const result = transpose(array);
      expect(result).toEqual([[1, 3], [2, 4]]);
    });

    test('SORT function', () => {
      const array = [3, 1, 4, 1, 5];
      expect(sort(array)).toEqual([1, 1, 3, 4, 5]);
      expect(sort(array, undefined, false)).toEqual([5, 4, 3, 1, 1]);
      
      const multiArray = [[1, 'b'], [2, 'a'], [3, 'c']];
      expect(sort(multiArray, 1)).toEqual([[2, 'a'], [1, 'b'], [3, 'c']]);
    });

    test('UNIQUE function', () => {
      const array = [1, 2, 2, 3, 3, 4];
      expect(unique(array)).toEqual([1, 2, 3, 4]);
    });

    test('FILTER function', () => {
      const array = [1, 2, 3, 4, 5];
      expect(filter(array, x => x > 3)).toEqual([4, 5]);
    });

    test('SEQUENCE function', () => {
      expect(sequence(2, 2)).toEqual([[1, 2], [3, 4]]);
      expect(sequence(3, 1, 0, 2)).toEqual([[0], [2], [4]]);
    });
  });

  describe('Reference Functions', () => {
    test('COLUMN function', () => {
      expect(column('B1')).toBe(2);
      expect(column('AA1')).toBe(27);
      expect(() => column('invalid')).toThrow(FormulaError);
    });

    test('COLUMNS function', () => {
      expect(columns('A1:C1')).toBe(3);
      expect(columns('B1')).toBe(1);
      expect(() => columns('invalid')).toThrow(FormulaError);
    });

    test('ROW function', () => {
      expect(row('A2')).toBe(2);
      expect(row('B10')).toBe(10);
      expect(() => row('invalid')).toThrow(FormulaError);
    });

    test('ROWS function', () => {
      expect(rows('A1:A3')).toBe(3);
      expect(rows('B1')).toBe(1);
      expect(() => rows('invalid')).toThrow(FormulaError);
    });
  });

  describe('Error Handling', () => {
    test('handles invalid input', () => {
      expect(() => vlookup(1, [], 1)).toThrow(FormulaError);
      expect(() => hlookup(1, [], 1)).toThrow(FormulaError);
      expect(() => lookup(1, [])).toThrow(FormulaError);
      expect(() => match(1, [])).toThrow(FormulaError);
      expect(() => index([], 1)).toThrow(FormulaError);
    });

    test('handles invalid array operations', () => {
      expect(() => transpose([])).toThrow(FormulaError);
      expect(() => sequence(0)).toThrow(FormulaError);
      expect(() => sequence(-1)).toThrow(FormulaError);
    });

    test('handles invalid references', () => {
      expect(() => column('123')).toThrow(FormulaError);
      expect(() => row('ABC')).toThrow(FormulaError);
      expect(() => columns('invalid:ref')).toThrow(FormulaError);
      expect(() => rows('invalid:ref')).toThrow(FormulaError);
    });
  });
});