import { WebQueryState } from '../../spec/WebQueries';

export function createWebQuery(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE'): WebQueryState {
  return {
    queries: new Map([[url, {
      url,
      method,
      headers: {},
      params: {}
    }]]),
    settings: {
      timeout: 30000,
      retry: {
        count: 3,
        delay: 1000,
        backoff: 'exponential'
      },
      cache: {
        enabled: true,
        duration: 300000,
        size: 100
      }
    },
    processing: {
      extractors: new Map(),
      transforms: new Map(),
      validators: new Map()
    }
  };
}

export function addHeader(state: WebQueryState, url: string, name: string, value: string): WebQueryState {
  const query = state.queries.get(url);
  if (!query) {
    throw new Error(`Query for URL ${url} not found`);
  }

  const updatedQuery = {
    ...query,
    headers: { ...query.headers, [name]: value }
  };

  return {
    ...state,
    queries: new Map(state.queries).set(url, updatedQuery)
  };
}

export function addQueryParam(state: WebQueryState, url: string, name: string, value: string): WebQueryState {
  const query = state.queries.get(url);
  if (!query) {
    throw new Error(`Query for URL ${url} not found`);
  }

  const updatedQuery = {
    ...query,
    params: { ...query.params, [name]: value }
  };

  return {
    ...state,
    queries: new Map(state.queries).set(url, updatedQuery)
  };
}