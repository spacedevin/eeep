import {
  createWebQuery,
  addHeader,
  addQueryParam
} from '../../external/webservices';
import { ValidationError } from '../../external/errors';

describe('Web Services', () => {
  test('creates web query', () => {
    const state = createWebQuery('https://api.example.com', 'GET');
    expect(state.queries.size).toBe(1);
    expect(state.settings.timeout).toBe(30000);
  });

  test('throws error for invalid URL', () => {
    expect(() => createWebQuery('not-a-url', 'GET')).toThrow(ValidationError);
  });

  test('adds header', () => {
    const url = 'https://api.example.com';
    let state = createWebQuery(url, 'GET');
    state = addHeader(state, url, 'Authorization', 'Bearer token123');
    
    const query = state.queries.get(url);
    expect(query?.headers?.Authorization).toBe('Bearer token123');
  });

  test('adds query parameter', () => {
    const url = 'https://api.example.com';
    let state = createWebQuery(url, 'GET');
    state = addQueryParam(state, url, 'page', '1');
    
    const query = state.queries.get(url);
    expect(query?.params?.page).toBe('1');
  });

  test('throws error for invalid URL when adding header', () => {
    const state = createWebQuery('https://api.example.com', 'GET');
    expect(() => addHeader(state, 'invalid-url', 'test', 'value')).toThrow(ValidationError);
  });

  test('throws error for invalid URL when adding parameter', () => {
    const state = createWebQuery('https://api.example.com', 'GET');
    expect(() => addQueryParam(state, 'invalid-url', 'test', 'value')).toThrow(ValidationError);
  });
});