import {
  createDatabaseConnection,
  createWebQuery,
  createFileSource
} from '../../external';

describe('External Data Module', () => {
  describe('Database Connection', () => {
    test('creates database connection', () => {
      const conn = createDatabaseConnection('sqlserver');
      expect(conn).toBeDefined();
      expect(conn.connections.size).toBe(0);
      expect(conn.operations.import.mode).toBe('bulk');
    });
  });

  describe('Web Query', () => {
    test('creates web query', () => {
      const query = createWebQuery('https://api.example.com', 'GET');
      expect(query).toBeDefined();
      expect(query.queries.size).toBe(1);
      expect(query.settings.timeout).toBe(30000);
    });
  });

  describe('File Source', () => {
    test('creates file source', () => {
      const source = createFileSource('csv');
      expect(source).toBeDefined();
      expect(source.sources.file.size).toBe(0);
      expect(source.processing.cache.enabled).toBe(true);
    });
  });
});