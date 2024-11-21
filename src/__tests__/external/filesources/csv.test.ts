import { parseCsvFile } from '../../../external/filesources/csv';
import { createFileSource, addFileSource } from '../../../external';
import { TransformationError } from '../../../external/errors';

describe('CSV File Parser', () => {
  test('parses CSV with headers', () => {
    let state = createFileSource('csv');
    state = addFileSource(state, 'test', 'data.csv', 'csv', {
      delimiter: ',',
      hasHeader: true
    });

    const content = 'name,age\nJohn,30\nJane,25';
    const result = parseCsvFile(state, 'test', content);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('John');
    expect(result[0].age).toBe('30');
  });

  test('parses CSV without headers', () => {
    let state = createFileSource('csv');
    state = addFileSource(state, 'test', 'data.csv', 'csv', {
      delimiter: ',',
      hasHeader: false
    });

    const content = 'John,30\nJane,25';
    const result = parseCsvFile(state, 'test', content);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(['John', '30']);
  });

  test('handles custom delimiters', () => {
    let state = createFileSource('csv');
    state = addFileSource(state, 'test', 'data.csv', 'csv', {
      delimiter: ';',
      hasHeader: true
    });

    const content = 'name;age\nJohn;30\nJane;25';
    const result = parseCsvFile(state, 'test', content);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('John');
    expect(result[0].age).toBe('30');
  });

  test('throws error for invalid source', () => {
    const state = createFileSource('csv');
    expect(() => parseCsvFile(state, 'invalid', '')).toThrow(TransformationError);
  });

  test('handles empty content', () => {
    let state = createFileSource('csv');
    state = addFileSource(state, 'test', 'data.csv', 'csv');

    const result = parseCsvFile(state, 'test', '');
    expect(result).toHaveLength(0);
  });
});