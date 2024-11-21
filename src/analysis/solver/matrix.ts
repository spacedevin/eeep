import { SolverState } from '../../../spec/Solver';

export interface Matrix {
  rows: number;
  cols: number;
  data: number[][];
}

export function createMatrix(rows: number, cols: number, initialValue = 0): Matrix {
  return {
    rows,
    cols,
    data: Array(rows).fill(0).map(() => Array(cols).fill(initialValue))
  };
}

export function multiplyMatrix(a: Matrix, b: Matrix): Matrix {
  if (a.cols !== b.rows) {
    throw new Error('Invalid matrix dimensions for multiplication');
  }

  const result = createMatrix(a.rows, b.cols);
  for (let i = 0; i < a.rows; i++) {
    for (let j = 0; j < b.cols; j++) {
      let sum = 0;
      for (let k = 0; k < a.cols; k++) {
        sum += a.data[i][k] * b.data[k][j];
      }
      result.data[i][j] = sum;
    }
  }
  return result;
}

export function inverseMatrix(matrix: Matrix): Matrix {
  if (matrix.rows !== matrix.cols) {
    throw new Error('Matrix must be square for inversion');
  }

  const n = matrix.rows;
  const augmented = createMatrix(n, 2 * n);

  // Create augmented matrix [A|I]
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      augmented.data[i][j] = matrix.data[i][j];
      augmented.data[i][j + n] = i === j ? 1 : 0;
    }
  }

  // Gaussian elimination
  for (let i = 0; i < n; i++) {
    let pivot = augmented.data[i][i];
    if (Math.abs(pivot) < 1e-10) {
      throw new Error('Matrix is singular');
    }

    // Scale row i
    for (let j = 0; j < 2 * n; j++) {
      augmented.data[i][j] /= pivot;
    }

    // Eliminate column i
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const factor = augmented.data[j][i];
        for (let k = 0; k < 2 * n; k++) {
          augmented.data[j][k] -= factor * augmented.data[i][k];
        }
      }
    }
  }

  // Extract inverse from augmented matrix
  const inverse = createMatrix(n, n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      inverse.data[i][j] = augmented.data[i][j + n];
    }
  }

  return inverse;
}

export function decomposeMatrix(matrix: Matrix): {
  L: Matrix;
  U: Matrix;
} {
  if (matrix.rows !== matrix.cols) {
    throw new Error('Matrix must be square for LU decomposition');
  }

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