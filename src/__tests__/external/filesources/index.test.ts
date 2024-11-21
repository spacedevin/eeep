import { parseFile } from '../../../external/filesources';
import { createFileSource, addFileSource } from '../../../external';
import { TransformationError } from '../../../external/errors';

describe('File Parser Factory', () => {
  test('selects correct parser for CSV', () => {
    let state = createFileSource('csv');
    state = addFileSource(state, 'test', 'data.csv', 'csv');

    const content = 'name,age\nJohn,30';
    const result = parseFile(state, 'test', content);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('John');
  });

  test('selects correct parser for XML', () => {
    let state = createFileSource('xml');
    state = addFileSource(state, 'test', 'data.xml', 'xml');

    const content = '<root><name>John</name></root>';
    const result = parseFile(state, 'test', content);

    expect(result.root.name).toBe('John');
  });

  test('selects correct parser for JSON', () => {
    let state = createFileSource('json');
    state = addFileSource(state, 'test', 'data.json', 'json');

    const content = '{"name":"John"}';
    const result = parseFile(state, 'test', content);

    expect(result.name).toBe('John');
  });

  test('selects correct parser for text', () => {
    let state = createFileSource('text');
    state = addFileSource(state, 'test', 'data.txt', 'text');

    const content = 'Line 1\nLine 2';
    const result = parseFile(state, 'test', content);

    expect(result).toHaveLength(2);
    expect(result[0]).toBe('Line 1');
  });

  test('throws error for invalid source', () => {
    const state = createFileSource('csv');
    expect(() => parseFile(state, 'invalid', '')).toThrow(TransformationError);
  });

  test('throws error for unsupported file type', () => {
    let state = createFileSource('csv');
    state = addFileSource(state, 'test', 'data.unknown', 'text' as any);
    
    expect(() => parseFile(state, 'test', '')).toThrow(TransformationError);
  });
});