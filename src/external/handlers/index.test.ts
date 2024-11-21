import {
  executeQuery,
  testConnection,
  executeRequest,
  validateEndpoint,
  readFile,
  validateFile
} from './index';

import {
  createDatabaseConnection,
  createWebQuery,
  createFileSource
} from '../index';

describe('External Data Handlers', () => {
  describe('Database Handlers', () => {
    test('exports database handlers', () => {
      expect(executeQuery).toBeDefined();
      expect(testConnection).toBeDefined();
    });

    test('handlers work with database state', async () => {
      const state = createDatabaseConnection('sqlserver');
      await expect(testConnection(state, 'test')).resolves.toBeDefined();
    });
  });

  describe('Web Service Handlers', () => {
    test('exports web service handlers', () => {
      expect(executeRequest).toBeDefined();
      expect(validateEndpoint).toBeDefined();
    });

    test('handlers work with web query state', async () => {
      const state = createWebQuery('https://api.example.com', 'GET');
      await expect(executeRequest(state, 'https://api.example.com')).resolves.toBeDefined();
    });
  });

  describe('File Source Handlers', () => {
    test('exports file source handlers', () => {
      expect(readFile).toBeDefined();
      expect(validateFile).toBeDefined();
    });

    test('handlers work with file source state', async () => {
      const state = createFileSource('csv');
      await expect(validateFile(state, 'test')).resolves.toBeDefined();
    });
  });
});