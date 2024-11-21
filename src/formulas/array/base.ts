import { FormulaError } from '../../errors';
import { DynamicArrayManager } from '../../arrays/memory';

const arrayManager = new DynamicArrayManager();

export function frequency(data: number[], bins: number[]): number[] {
  try {
    if (!Array.isArray(data) || !Array.isArray(bins)) {
      throw new Error('Data and bins must be arrays');
    }

    // Sort bins to ensure correct counting
    const sortedBins = [...bins].sort((a, b) => a - b);
    const frequencies = new Array(sortedBins.length + 1).fill(0);

    // Count frequencies
    data.forEach(value => {
      let binIndex = sortedBins.findIndex(bin => value <= bin);
      if (binIndex === -1) binIndex = sortedBins.length;
      frequencies[binIndex]++;
    });

    return frequencies;
  } catch (error) {
    throw new FormulaError('Error in FREQUENCY function', error);
  }
}

export function mdeterm(array: number[][]): number {
  try {
    const n = array.length;
    if (n !== array[0].length) {
      throw new Error('Matrix must be square');
    }

    // For 2x2 matrix
    if (n === 2) {
      return array[0][0] * array[1][1] - array[0][1] * array[1][0];
    }

    // For larger matrices, use expansion by minors
    let det = 0;
    for (let j = 0; j < n; j++) {
      det += array[0][j] * cofactor(array, 0, j);
    }
    return det;
  } catch (error) {
    throw new FormulaError('Error in MDETERM function', error);
  }
}

export function minverse(array: number[][]): number[][] {
  try {
    const n = array.length;
    if (n !== array[0].length) {
      throw new Error('Matrix must be square');
    }

    const det = mdeterm(array);
    if (Math.abs(det) < 1e-10) {
      throw new Error('Matrix is singular');
    }

    const adjugate = Array(n).fill(0).map(() => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        adjugate[j][i] = cofactor(array, i, j) / det;
      }
    }

    return adjugate;
  } catch (error) {
    throw new FormulaError('Error in MINVERSE function', error);
  }
}

export function mmult(array1: number[][], array2: number[][]): number[][] {
  try {
    const m = array1.length;
    const n = array2[0].length;
    const p = array2.length;

    if (array1[0].length !== p) {
      throw new Error('Invalid matrix dimensions for multiplication');
    }

    const result = Array(m).fill(0).map(() => Array(n).fill(0));
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        for (let k = 0; k < p; k++) {
          result[i][j] += array1[i][k] * array2[k][j];
        }
      }
    }

    return result;
  } catch (error) {
    throw new FormulaError('Error in MMULT function', error);
  }
}

export function sumproduct(...arrays: number[][]): number {
  try {
    if (arrays.length === 0) {
      throw new Error('At least one array is required');
    }

    const length = arrays[0].length;
    if (!arrays.every(arr => arr.length === length)) {
      throw new Error('All arrays must have the same length');
    }

    let sum = 0;
    for (let i = 0; i < length; i++) {
      let product = 1;
      for (let j = 0; j < arrays.length; j++) {
        product *= arrays[j][i];
      }
      sum += product;
    }

    return sum;
  } catch (error) {
    throw new FormulaError('Error in SUMPRODUCT function', error);
  }
}

// Helper functions
function cofactor(matrix: number[][], row: number, col: number): number {
  return ((row + col) % 2 ? -1 : 1) * minor(matrix, row, col);
}

function minor(matrix: number[][], row: number, col: number): number {
  const subMatrix = matrix
    .filter((_, index) => index !== row)
    .map(row => row.filter((_, index) => index !== col));
  return mdeterm(subMatrix);
}