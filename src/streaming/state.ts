import { StreamState } from '../../spec/Streaming';

export function createStreamState(): StreamState {
  return {
    mode: 'read',
    options: {
      bufferSize: 8192,
      cacheSize: 1024 * 1024,
      memoryLimit: 1024 * 1024 * 1024,
      compression: true,
      async: true,
      parallel: true
    },
    status: {
      position: 0,
      rowCount: 0,
      cellCount: 0,
      memoryUsed: 0,
      isOpen: false
    },
    cache: {
      strings: new Map(),
      styles: new Map(),
      formulas: new Map()
    }
  };
}

export function setStreamOptions(state: StreamState, options: Partial<StreamState['options']>): StreamState {
  return {
    ...state,
    options: {
      ...state.options,
      ...options
    }
  };
}

export function updateStreamStatus(state: StreamState, status: Partial<StreamState['status']>): StreamState {
  return {
    ...state,
    status: {
      ...state.status,
      ...status
    }
  };
}