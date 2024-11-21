import { executeRequest, validateEndpoint } from '../../../external/handlers/webservices';
import { createWebQuery } from '../../../external';
import { QueryError } from '../../../external/errors';

describe('Web Service Handlers', () => {
  describe('Request Execution', () => {
    test('executes request', async () => {
      const url = 'https://api.example.com';
      const state = createWebQuery(url, 'GET');

      const response = await executeRequest(state, url);
      expect(response).toBeDefined();
    });

    test('throws error for invalid URL', async () => {
      const state = createWebQuery('https://api.example.com', 'GET');
      await expect(executeRequest(state, 'invalid-url')).rejects.toThrow(QueryError);
    });
  });

  describe('Endpoint Validation', () => {
    test('validates endpoint', async () => {
      const result = await validateEndpoint('https://api.example.com');
      expect(result).toBe(true);
    });

    test('throws error for invalid endpoint', async () => {
      await expect(validateEndpoint('not-a-url')).rejects.toThrow(QueryError);
    });
  });
});