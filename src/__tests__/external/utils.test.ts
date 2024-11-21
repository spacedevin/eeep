import {
  buildConnectionString,
  parseConnectionString,
  buildFileOptions,
  formatQueryParams
} from '../../external/utils';

describe('External Data Utils', () => {
  describe('Connection String Utils', () => {
    test('builds connection string', () => {
      const settings = {
        connectionString: 'Server=localhost;Database=test',
        timeout: 30000,
        pooling: true
      };

      const result = buildConnectionString(settings);
      expect(result).toContain('Server=localhost');
      expect(result).toContain('Database=test');
    });

    test('parses connection string', () => {
      const connStr = 'Server=localhost;Database=test;Timeout=30000';
      const settings = parseConnectionString(connStr);
      
      expect(settings.connectionString).toBe('Server=localhost;Database=test;Timeout=30000');
      expect(settings.timeout).toBe(30000);
      expect(settings.pooling).toBe(true);
    });
  });

  describe('File Options Utils', () => {
    test('builds file options with defaults', () => {
      const options = buildFileOptions();
      
      expect(options.encoding).toBe('utf8');
      expect(options.delimiter).toBe(',');
      expect(options.hasHeader).toBe(true);
    });

    test('builds file options with custom values', () => {
      const options = buildFileOptions({
        encoding: 'ascii',
        delimiter: '|',
        hasHeader: false
      });
      
      expect(options.encoding).toBe('ascii');
      expect(options.delimiter).toBe('|');
      expect(options.hasHeader).toBe(false);
    });
  });

  describe('Query Parameter Utils', () => {
    test('formats query parameters', () => {
      const params = {
        page: '1',
        size: '10',
        sort: 'name'
      };

      const result = formatQueryParams(params);
      expect(result).toBe('page=1&size=10&sort=name');
    });

    test('encodes special characters', () => {
      const params = {
        q: 'test query',
        filter: 'name=John Doe'
      };

      const result = formatQueryParams(params);
      expect(result).toBe('q=test%20query&filter=name%3DJohn%20Doe');
    });
  });
});