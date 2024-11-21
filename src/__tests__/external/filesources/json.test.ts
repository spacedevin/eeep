import { parseJsonFile } from '../../../external/filesources/json';
import { createFileSource, addFileSource } from '../../../external';
import { TransformationError } from '../../../external/errors';

describe('JSON File Parser', () => {
  test('parses valid JSON', () => {
    let state = createFileSource('json');
    state = addFileSource(state, 'test', 'data.json', 'json');

    const content = JSON.stringify({
      people: [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 }
      ]
    });

    const result = parseJsonFile(state, 'test', content);
    expect(result.people).toHaveLength(2);
    expect(result.people[0].name).toBe('John');
  });

  test('validates against schema', () => {
    let state = createFileSource('json');
    state = addFileSource(state, 'test', 'data.json', 'json', {
      schema: {
        type: 'object',
        required: ['name', 'age'],
        properties: {
          name: { type: 'string' },
          age: { type: 'number' }
        }
      }
    });

    const validContent = JSON.stringify({ name: 'John', age: 30 });
    expect(() => parseJsonFile(state, 'test', validContent)).not.toThrow();

    const invalidContent = JSON.stringify({ name: 'John' });
    expect(() => parseJsonFile(state, 'test', invalidContent)).toThrow();
  });

  test('throws error for invalid JSON', () => {
    let state = createFileSource('json');
    state = addFileSource(state, 'test', 'data.json', 'json');

    const content = '{ invalid json }';
    expect(() => parseJsonFile(state, 'test', content)).toThrow();
  });

  test('throws error for invalid source', () => {
    const state = createFileSource('json');
    expect(() => parseJsonFile(state, 'invalid', '')).toThrow(TransformationError);
  });
});