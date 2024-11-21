import {
  createMatrix,
  multiplyMatrix,
  inverseMatrix,
  decomposeMatrix
} from '../../../analysis/solver/matrix';

describe('Matrix Operations', () => {
  test('creates matrix', () => {
    const matrix = createMatrix(2, 3, 1);
    expect(matrix.rows).toBe(2);
    expect(matrix.cols).toBe(3);
    expect(matrix.data[0][0]).toBe(1);
  });

  test('multiplies matrices', () => {
    const a = createMatrix(2, 2);
    a.data = [[1, 2], [3, 4]];
    
    const b = createMatrix(2, 2);
    b.data = [[2, 0], [1, 2]];
    
    const result = multiplyMatrix(a, b);
    expect(result.data).toEqual([[4, 4], [10, 8]]);
  });

  test('throws error for invalid multiplication dimensions', () => {
    const a = createMatrix(2, 3);
    const b = createMatrix(2, 2);
    expect(() => multiplyMatrix(a, b)).toThrow();
  });

  test('inverts matrix', () => {
    const matrix = createMatrix(2, 2);
    matrix.data = [[4, 7], [2, 6]];
    
    const inverse = inverseMatrix(matrix);
    
    // Verify inverse by multiplying with original
    const identity = multiplyMatrix(matrix, inverse);
    expect(identity.data[0][0]).toBeCloseTo(1, 5);
    expect(identity.data[0][1]).toBeCloseTo(0, 5);
    expect(identity.data[1][0]).toBeCloseTo(0, 5);
    expect(identity.data[1][1]).toBeCloseTo(1, 5);
  });

  test('throws error for singular matrix inversion', () => {
    const matrix = createMatrix(2, 2);
    matrix.data = [[1, 1], [1, 1]];
    expect(() => inverseMatrix(matrix)).toThrow();
  });

  test('decomposes matrix into LU', () => {
    const matrix = createMatrix(3, 3);
    matrix.data = [
      [2, -1, 0],
      [-1, 2, -1],
      [0, -1, 2]
    ];
    
    const { L, U } = decomposeMatrix(matrix);
    
    // Verify L is lower triangular
    expect(L.data[0][1]).toBe(0);
    expect(L.data[0][2]).toBe(0);
    expect(L.data[1][2]).toBe(0);
    
    // Verify U is upper triangular
    expect(U.data[1][0]).toBe(0);
    expect(U.data[2][0]).toBe(0);
    expect(U.data[2][1]).toBe(0);
    
    // Verify L * U = A
    const product = multiplyMatrix(L, U);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        expect(product.data[i][j]).toBeCloseTo(matrix.data[i][j], 5);
      }
    }
  });
});