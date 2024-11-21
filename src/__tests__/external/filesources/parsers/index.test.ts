import { parseFileContent } from '../../../../external/filesources/parsers';
import { createFileSource, addFileSource } from '../../../../external';
import { compressContent } from '../../../../external/filesources/compression';
import { TransformationError } from '../../../../external/errors';

describe('File Content Parser', () => {
  test('parses uncompressed content', async () => {
    let state = createFileSource('csv');
    state = addFileSource(state, 'test', 'data.csv', 'csv');

    const content = 'name,age\nJohn,30';
    const result = await parseFileContent(state, 'test', content);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('John');
  });

  test('parses compressed content', async () => {
    let state = createFileSource('csv');
    state = addFileSource(state, 'test', 'data.csv', 'csv');

    const content = 'name,age\nJohn,30';
    const compressed = await compressContent(content);
    const result = await parseFileContent(state, 'test', compressed, {
      compression: true
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('John');
  });

  test('handles streaming content', async () => {
    let state = createFileSource('text');
    state = addFileSource(state, 'test', 'data.txt', 'text');

    const content = 'Line 1\nLine 2\nLine 3';
    const result = await parseFileContent(state, 'test', content, {
      streaming: true,
      chunkSize: 10
    });

    expect(result).toHaveLength(3);
    expect(result[0]).toBe('Line 1');
  });

  test('handles custom parser', async () => {
    let state = createFileSource('text');
    state = addFileSource(state, 'test', 'data.custom', 'text', {
      customParser: 'test-parser'
    });

    // Register a test parser
    const parser = {
      name: 'test-parser',
      parse: (content: string) => ({ parsed: content })
    };
    require('../../../../external/filesources/custom').registerCustomParser(parser);

    const content = 'test content';
    const result = await parseFileContent(state, 'test', content);
    expect(result.parsed).toBe('test content');
  });

  test('throws error for invalid source', async () => {
    const state = createFileSource('csv');
    await expect(parseFileContent(state, 'invalid', ''))
      .rejects.toThrow(TransformationError);
  });

  test('throws error for unsupported file type', async () => {
    let state = createFileSource('csv');
    state = addFileSource(state, 'test', 'data.unknown', 'text' as any);
    
    await expect(parseFileContent(state, 'test', ''))
      .rejects.toThrow(TransformationError);
  });
});