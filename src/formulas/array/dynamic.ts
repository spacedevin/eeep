import { FormulaError } from '../../errors';

export function sortby(array: any[], ...sortControls: any[][]): any[] {
  try {
    if (!Array.isArray(array)) {
      throw new Error('First argument must be an array');
    }

    if (sortControls.length === 0) {
      throw new Error('At least one sort control array is required');
    }

    const indices = array.map((_, index) => index);
    indices.sort((a, b) => {
      for (let i = 0; i < sortControls.length; i += 2) {
        const byArray = sortControls[i];
        const sortOrder = sortControls[i + 1];
        const ascending = sortOrder === undefined || Number(sortOrder) > 0;
        const comparison = compare(byArray[a], byArray[b]);
        if (comparison !== 0) {
          return ascending ? comparison : -comparison;
        }
      }
      return 0;
    });

    return indices.map(i => array[i]);
  } catch (error) {
    throw new FormulaError('Error in SORTBY function', error);
  }
}

function compare(a: any, b: any): number {
  if (a === b) return 0;
  if (a === null || a === undefined) return 1;
  if (b === null || b === undefined) return -1;
  return a < b ? -1 : 1;
}