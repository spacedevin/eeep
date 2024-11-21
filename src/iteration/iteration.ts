import { IterationState } from '../../spec/Iteration';

export function createIteration(
  type: IterationState['type'],
  start: { row: number; col: number },
  end: { row: number; col: number }
): IterationState {
  return {
    type,
    control: {
      direction: 'forward',
      position: {
        start,
        end,
        current: start
      },
      step: {
        rows: 1,
        cols: 1,
        skipEmpty: false,
        skipHidden: false
      }
    },
    filters: [],
    performance: {
      lazy: true,
      batchSize: 1000,
      cacheResults: false
    },
    state: {
      isComplete: false,
      itemsProcessed: 0,
      currentBatch: 0,
      errors: []
    }
  };
}

export function addIterationFilter(
  state: IterationState,
  type: 'value' | 'formula' | 'style' | 'custom',
  predicate: (cell: any) => boolean
): IterationState {
  return {
    ...state,
    filters: [...state.filters, { type, predicate }]
  };
}

export function setIterationPattern(
  state: IterationState,
  pattern: IterationState['control']['pattern']
): IterationState {
  return {
    ...state,
    control: {
      ...state.control,
      pattern
    }
  };
}

export function updateIterationPosition(
  state: IterationState,
  position: { row: number; col: number }
): IterationState {
  return {
    ...state,
    control: {
      ...state.control,
      position: {
        ...state.control.position,
        current: position
      }
    },
    state: {
      ...state.state,
      itemsProcessed: state.state.itemsProcessed + 1
    }
  };
}