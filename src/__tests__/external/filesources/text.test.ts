import { parseTextFile } from '../../../external/filesources/text';
import { createFileSource, addFileSource } from '../../../external';
import { TransformationError } from '../../../external/errors';

describe('Text File Parser', () => {
  test('parses text file into lines', () => {
    let state = createFileSource('text');
    state = addFileSource(state, 'test', 'data.txt', 'text');

    const content = 'Line 1\nLine 2\nLine 3';
    const result = parseTextFile(state, 'test', content);

    expect(result).toHaveLength(3);
    expect(result[0]).toBe('Line 1');
    expect(result[1]).toBe('Line 2');
    expect(result[2]).toBe('Line 3');
  });

  test('trims whitespace from lines', () => {
    let state = createFileSource('text');
    state = addFileSource(state, 'test', 'data.txt', 'text');

    const content = '  Line 1  \n  Line 2  \n  Line 3  ';
    const result = parseTextFile(state, 'test', content);

    expect(result[0]).toBe('Line 1');
    expect(result[1]).toBe('Line 2');
    expect(result[2]).toBe('Line 3');
  });

  test('filters empty lines', () => {
    let state = createFileSource('text');
    state = addFileSource(state, 'test', 'data.txt', 'text');

    const content = 'Line 1\n\n\nLine 2\n\nLine 3';
    const result = parseTextFile(state, 'test', content);

    expect(result).toHaveLength(3);
    expect(result[0]).toBe('Line 1');
    expect(result[1]).toBe('Line 2');
    expect(result[2]).toBe('Line 3');
  });

  test('throws error for invalid source', () => {
    const state = createFileSource('text');
    expect(() => parseTextFile(state, 'invalid', '')).toThrow(TransformationError);
  });
});