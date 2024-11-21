import { StreamState } from '../../spec/Streaming';

export function isMemoryWithinLimit(state: StreamState, additionalBytes: number): boolean {
  return (state.status.memoryUsed + additionalBytes) <= state.options.memoryLimit;
}

export function calculateMemoryUsage(state: StreamState): number {
  // Calculate memory usage from strings (2 bytes per character)
  const stringsSize = Array.from(state.cache.strings.values())
    .reduce((total, str) => total + str.length * 2, 0);
  
  // Estimate style objects at 100 bytes each
  const stylesSize = state.cache.styles.size * 100;
  
  // Calculate formula strings (2 bytes per character)
  const formulasSize = Array.from(state.cache.formulas.values())
    .reduce((total, formula) => total + formula.length * 2, 0);
  
  return stringsSize + stylesSize + formulasSize;
}

export function updateMemoryUsage(state: StreamState): StreamState {
  return {
    ...state,
    status: {
      ...state.status,
      memoryUsed: calculateMemoryUsage(state)
    }
  };
}

export function checkMemoryThreshold(state: StreamState): boolean {
  const usagePercent = (state.status.memoryUsed / state.options.memoryLimit) * 100;
  return usagePercent >= 90; // Return true if using 90% or more of memory limit
}