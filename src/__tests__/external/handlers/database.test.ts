import { executeQuery, testConnection } from '../../../external/handlers/database';
import { createDatabaseConnection, addConnection, addQuery } from '../../../external';
import { ConnectionError, QueryError } from '../../../external/errors';

describe('Database Handlers', () => {
  describe('Query Execution', () => {
    test('executes query', async () => {
      let state = createDatabaseConnection('sqlserver');
      state = addConnection(state, 'conn1', 'Server=localhost;Database=test', 'sqlserver');
      state = addQuery(state, 'query1', 'SELECT * FROM Users', 'sql');

      const results = await executeQuery(state, 'query1');
      expect(Array.isArray(results)).toBe(true);
    });

    test('throws error for invalid query', async () => {
      const state = createDatabaseConnection('sqlserver');
      await expect(executeQuery(state, 'invalid')).rejects.toThrow(QueryError);
    });
  });

  describe('Connection Testing', () => {
    test('tests connection', async () => {
      let state = createDatabaseConnection('sqlserver');
      state = addConnection(state, 'conn1', 'Server=localhost;Database=test', 'sqlserver');

      const result = await testConnection(state, 'conn1');
      expect(result).toBe(true);
    });

    test('throws error for invalid connection', async () => {
      const state = createDatabaseConnection('sqlserver');
      await expect(testConnection(state, 'invalid')).rejects.toThrow(ConnectionError);
    });
  });
});