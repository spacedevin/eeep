import {
  createDatabaseConnection,
  addConnection,
  addQuery
} from '../../external/database';
import { ConnectionError, ValidationError } from '../../external/errors';

describe('Database Connection', () => {
  test('creates database connection state', () => {
    const state = createDatabaseConnection('sqlserver');
    expect(state.connections.size).toBe(0);
    expect(state.queries.size).toBe(0);
    expect(state.error.retry.enabled).toBe(true);
  });

  test('adds connection', () => {
    let state = createDatabaseConnection('sqlserver');
    state = addConnection(
      state,
      'conn1',
      'Server=localhost;Database=test;',
      'sqlserver'
    );
    
    const conn = state.connections.get('conn1');
    expect(conn).toBeDefined();
    expect(conn?.type).toBe('sqlserver');
    expect(conn?.settings.connectionString).toBe('Server=localhost;Database=test;');
  });

  test('throws error for invalid connection string', () => {
    const state = createDatabaseConnection('sqlserver');
    expect(() => addConnection(
      state,
      'conn1',
      '',
      'sqlserver'
    )).toThrow(ValidationError);
  });

  test('adds query', () => {
    let state = createDatabaseConnection('sqlserver');
    state = addQuery(
      state,
      'query1',
      'SELECT * FROM Users',
      'sql'
    );
    
    const query = state.queries.get('query1');
    expect(query).toBeDefined();
    expect(query?.type).toBe('sql');
    expect(query?.text).toBe('SELECT * FROM Users');
  });

  test('throws error for invalid query', () => {
    const state = createDatabaseConnection('sqlserver');
    expect(() => addQuery(
      state,
      'query1',
      '',
      'sql'
    )).toThrow(ValidationError);
  });
});