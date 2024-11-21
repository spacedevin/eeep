import {
  mdeterm,
  minverse,
  mmult,
  transpose
} from '../../formulas/matrix';
import { FormulaError } from '../../errors';

describe('Matrix Functions', () => {
  test('MDETERM function', () => {
    const matrix = [
      [1, 2],
      [3, 4]
    ];
    expect(mdeterm(matrix)).toBeCloseTo(-2, 10);
  });

  test('MINVERSE function', () => {
    const matrix = [
      [4, 7],
      [2, 6]
    ];
    const inverse = minverse(matrix);
    
    // Verify inverse by multiplying with original
    const identity = mmult(matrix, inverse);
    expect(identity[0][0]).toBeCloseTo(1, 10);
    expect(identity[0][1]).toBeCloseTo(0, 10);
    expect(identity[1][0]).toBeCloseTo(0, 10);
    expect(identity[1][1]).toBeCloseTo(1, 10);
  });

  test('MMULT function', () => {
    const matrix1 = [
      [1, 2],
      [3, 4]
    ];
    const matrix2 = [
      [2, 0],
      [1, 2]
    ];
    const result = mmult(matrix1, matrix2);
    expect(result).toEqual([
      [4, 4],
      [10, 8]
    ]);
  });

  test('TRANSPOSE function', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    const result = transpose(matrix);
    expect(result).toEqual([
      [1, 4],
      [2, 5],
      [3, 6]
    ]);
  });

  describe('Error Handling', () => {
    test('handles singular matrices', () => {
      const singular = [
        [1, 1],
        [1, 1]
      ];
      expect(() => minverse(singular)).toThrow(FormulaError);
    });

    test('handles incompatible dimensions', () => {
      const m1 = [[1, 2]];
      const m2 = [[1], [2], [3]];
      expect(() => mmult(m1, m2)).toThrow(FormulaError);
    });

    test('handles empty matrices', () => {
      expect(() => mdeterm([])).toThrow(FormulaError);
      expect(() => minverse([])).toThrow(FormulaError);
      expect(() => mmult([], [])).toThrow(FormulaError);
      expect(() => transpose([])).toThrow(FormulaError);
    });
  });
});