import { PivotTableState } from '../../spec/PivotTables';

export function calculatePivotAggregation(
  state: PivotTableState,
  fieldIndex: number,
  calculation: 'sum' | 'count' | 'average' | 'max' | 'min' | 'product' | 'countNums' | 'stdDev' | 'stdDevP' | 'var' | 'varP'
): PivotTableState {
  const field = state.fields.values[fieldIndex];
  if (!field) {
    throw new Error(`Value field at index ${fieldIndex} not found`);
  }

  return {
    ...state,
    fields: {
      ...state.fields,
      values: state.fields.values.map((f, i) => 
        i === fieldIndex ? {
          ...f,
          calculation
        } : f
      )
    }
  };
}

export function aggregateValues(
  values: number[],
  calculation: 'sum' | 'count' | 'average' | 'max' | 'min' | 'product' | 'countNums' | 'stdDev' | 'stdDevP' | 'var' | 'varP'
): number {
  switch (calculation) {
    case 'sum':
      return values.reduce((sum, val) => sum + val, 0);
    case 'count':
      return values.length;
    case 'average':
      return values.reduce((sum, val) => sum + val, 0) / values.length;
    case 'max':
      return Math.max(...values);
    case 'min':
      return Math.min(...values);
    case 'product':
      return values.reduce((prod, val) => prod * val, 1);
    case 'countNums':
      return values.filter(val => typeof val === 'number').length;
    case 'stdDev':
    case 'stdDevP':
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const squareDiffs = values.map(val => Math.pow(val - avg, 2));
      const variance = squareDiffs.reduce((sum, val) => sum + val, 0) / 
        (calculation === 'stdDev' ? values.length - 1 : values.length);
      return Math.sqrt(variance);
    case 'var':
    case 'varP':
      const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
      const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
      return squaredDiffs.reduce((sum, val) => sum + val, 0) / 
        (calculation === 'var' ? values.length - 1 : values.length);
    default:
      throw new Error(`Unsupported calculation type: ${calculation}`);
  }
}
