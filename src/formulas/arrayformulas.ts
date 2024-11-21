import { ArrayFormulaState } from '../../spec/ArrayFormulas';

export function createArrayFormula(expression: string, range: string): ArrayFormulaState {
  return {
    type: 'dynamic',
    formula: {
      expression,
      range,
      isDynamic: true,
      isVolatile: false,
      dependencies: []
    },
    spill: {
      isBlocked: false,
      blockingCells: [],
      behavior: {
        allowPartial: false,
        resizeWithData: true,
        clearOnError: true
      }
    },
    calculation: {
      mode: 'automatic',
      order: 0
    },
    operations: {
      expansion: {
        direction: 'both'
      },
      combination: {
        operators: new Set(['+', '-', '*', '/', '&']),
        dimensionMatch: true
      }
    }
  };
}

export function setSpillBehavior(
  state: ArrayFormulaState,
  behavior: ArrayFormulaState['spill']['behavior']
): ArrayFormulaState {
  return {
    ...state,
    spill: {
      ...state.spill,
      behavior: {
        ...state.spill.behavior,
        ...behavior
      }
    }
  };
}