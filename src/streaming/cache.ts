import { StreamState } from '../../spec/Streaming';

export function clearStreamCache(state: StreamState): StreamState {
  return {
    ...state,
    cache: {
      strings: new Map(),
      styles: new Map(),
      formulas: new Map()
    },
    status: {
      ...state.status,
      memoryUsed: 0
    }
  };
}

export function addToCacheString(state: StreamState, index: number, value: string): StreamState {
  const newStrings = new Map(state.cache.strings);
  newStrings.set(index, value);
  
  return {
    ...state,
    cache: {
      ...state.cache,
      strings: newStrings
    }
  };
}

export function addToCacheStyle(state: StreamState, index: number, style: any): StreamState {
  const newStyles = new Map(state.cache.styles);
  newStyles.set(index, style);
  
  return {
    ...state,
    cache: {
      ...state.cache,
      styles: newStyles
    }
  };
}

export function addToCacheFormula(state: StreamState, cell: string, formula: string): StreamState {
  const newFormulas = new Map(state.cache.formulas);
  newFormulas.set(cell, formula);
  
  return {
    ...state,
    cache: {
      ...state.cache,
      formulas: newFormulas
    }
  };
}