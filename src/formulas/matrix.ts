import { FormulaError } from '../errors';
import { Matrix, createMatrix, multiplyMatrix, inverseMatrix } from '../analysis/solver/matrix';

export function mdeterm(array: number[][]): number {
  try {
    const matrix = createMatrix(array.length, array[0].length);
    matrix.data = array;
    
    // Calculate determinant using LU decomposition
    const { L, U } = decomposeMatrix(matrix);
    let det = 1;
    for (let i = 0; i < matrix.rows; i++) {
      det *= U.data[i][i];
    }
    return det;
  } catch (error) {
    throw new FormulaError('Error in MDETERM function', error);
  }
}

export function minverse(array: number[][]): number[][] {
  try {
    const matrix = createMatrix(array.length, array[0].length);
    matrix.data = array;
    const inverse = inverseMatrix(matrix);
    return inverse.data;
  } catch (error) {
    throw new FormulaError('Error in MINVERSE function', error);
  }
}

export function mmult(array1: number[][], array2: number[][]): number[][] {
  try {
    const matrix1 = createMatrix(array1.length, array1[0].length);
    matrix1.data = array1;
    const matrix2 = createMatrix(array2.length, array2[0].length);
    matrix2.data = array2;
    
    const result = multiplyMatrix(matrix1, matrix2);
    return result.data;
  } catch (error) {
    throw new FormulaError('Error in MMULT function', error);
  }
}

// Helper function for LU decomposition
function decomposeMatrix(matrix: Matrix): { L: Matrix; U: Matrix } {
  const n = matrix.rows;
  const L = createMatrix(n, n);
  const U = createMatrix(n, n);

  // Initialize L's diagonal to 1
  for (let i = 0; i < n; i++) {
    L.data[i][i] = 1;
  }

  // Copy first row of A to U
  for (let j = 0; j < n; j++) {
    U.data[0][j] = matrix.data[0][j];
  }

  // Calculate first column of L
  for (let i = 1; i < n; i++) {
    L.data[i][0] = matrix.data[i][0] / U.data[0][0];
  }

  // Calculate remaining elements
  for (let k = 1; k < n; k++) {
    // Calculate row k of U
    for (let j = k; j < n; j++) {
      let sum = 0;
      for (let s = 0; s < k; s++) {
        sum += L.data[k][s] * U.data[s][j];
      }
      U.data[k][j] = matrix.data[k][j] - sum;
    }

    // Calculate column k of L
    for (let i = k + 1; i < n; i++) {
      let sum = 0;
      for (let s = 0; s < k; s++) {
        sum += L.data[i][s] * U.data[s][k];
      }
      L.data[i][k] = (matrix.data[i][k] - sum) / U.data[k][k];
    }
  }

  return { L, U };
}