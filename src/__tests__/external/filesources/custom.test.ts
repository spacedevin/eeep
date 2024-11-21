import {
  registerCustomParser,
  unregisterCustomParser,
  parseWithCustomParser
} from '../../../external/filesources/custom';
import { createFileSource, addFileSource } from '../../../external';
import { TransformationError } from '../../../external/errors';

describe('Custom Parser', () => {
  beforeEach(() => {
    // Clear any registered parsers
    try {
      unregisterCustomParser('test-parser');
    } catch {}
  });

  test('registers custom parser', () => {
    const parser = {
      name: 'test-parser',
      parse: (content: string) => ({ parsed: content }),
      validate: (content: string) => content.length > 0
    };

    expect(() => registerCustomParser(parser)).not.toThrow();
  });

  test('throws error for duplicate parser', () => {
    const parser = {
      name: 'test-parser',
      parse: (content: string) => ({ parsed: content })
    };

    registerCustomParser(parser);
    expect(() => registerCustomParser(parser)).toThrow(TransformationError);
  });

  test('parses content with custom parser', () => {
    const parser = {
      name: 'test-parser',
      parse: (content: string) => ({ parsed: content })
    };
    registerCustomParser(parser);

    let state = createFileSource('text');
    state = addFileSource(state, 'test', 'data.custom', 'text', {
      customParser: 'test-parser'
    });

    const result = parseWithCustomParser(state, 'test', 'test content');
    expect(result.parsed).toBe('test content');
  });

  test('validates content before parsing', () => {
    const parser = {
      name: 'test-parser',
      parse: (content: string) => ({ parsed: content }),
      validate: (content: string) => content.startsWith('valid')
    };
    registerCustomParser(parser);

    let state = createFileSource('text');
    state = addFileSource(state, 'test', 'data.custom', 'text', {
      customParser: 'test-parser'
    });

    expect(() => parseWithCustomParser(state, 'test', 'invalid content'))
      .toThrow(TransformationError);
  });

  test('handles parser options', () => {
    const parser = {
      name: 'test-parser',
      parse: (content: string, options: any) => ({
        parsed: content,
        uppercase: options?.uppercase
      })
    };
    registerCustomParser(parser);

    let state = createFileSource('text');
    state = addFileSource(state, 'test', 'data.custom', 'text', {
      customParser: 'test-parser',
      parserOptions: { uppercase: true }
    });

    const result = parseWithCustomParser(state, 'test', 'test content');
    expect(result.uppercase).toBe(true);
  });
});