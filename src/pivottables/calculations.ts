import { PivotTableState } from '../../spec/PivotTables';

export function calculateShowAs(
  state: PivotTableState,
  fieldIndex: number,
  type: 'percentOfTotal' | 'percentOfRow' | 'percentOfCol' | 'percentOfParentRow' | 'percentOfParentCol' | 'difference' | 'percentDifference' | 'runningTotal' | 'rank',
  baseField?: string,
  baseItem?: string
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
          showAs: {
            type,
            baseField,
            baseItem
          }
        } : f
      )
    }
  };
}

export function calculatePercentage(values: number[], total: number): number[] {
  return values.map(value => (value / total) * 100);
}

export function calculateDifference(
  values: number[],
  baseValue: number
): number[] {
  return values.map(value => value - baseValue);
}

export function calculatePercentDifference(
  values: number[],
  baseValue: number
): number[] {
  return values.map(value => ((value - baseValue) / baseValue) * 100);
}

export function calculateRunningTotal(values: number[]): number[] {
  let total = 0;
  return values.map(value => total += value);
}

export function calculateRank(values: number[]): number[] {
  const sorted = [...values].sort((a, b) => b - a);
  return values.map(value => sorted.indexOf(value) + 1);
}

export function calculateParentPercentage(
  values: number[],
  parentValues: number[]
): number[] {
  return values.map((value, i) => 
    parentValues[i] ? (value / parentValues[i]) * 100 : 0
  );
}

export function updateCalculations(state: PivotTableState): PivotTableState {
  const newValues = state.fields.values.map(field => {
    if (!field.showAs) {
      return field;
    }

    // Placeholder for actual calculation logic
    // In a real implementation, this would:
    // 1. Get the raw values
    // 2. Apply the appropriate calculation
    // 3. Update the results
    return field;
  });

  return {
    ...state,
    fields: {
      ...state.fields,
      values: newValues
    }
  };
}