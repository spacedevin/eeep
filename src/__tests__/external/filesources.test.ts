import {
  createFileSource,
  addFileSource,
  addTransformationMapping
} from '../../external/filesources';
import { ValidationError } from '../../external/errors';

describe('File Sources', () => {
  test('creates file source', () => {
    const state = createFileSource('csv');
    expect(state.sources.file.size).toBe(0);
    expect(state.processing.cache.enabled).toBe(true);
  });

  test('adds file source', () => {
    let state = createFileSource('csv');
    state = addFileSource(
      state,
      'file1',
      '/path/to/data.csv',
      'csv',
      {
        delimiter: ',',
        hasHeader: true
      }
    );
    
    const source = state.sources.file.get('file1');
    expect(source).toBeDefined();
    expect(source?.type).toBe('csv');
    expect(source?.options.delimiter).toBe(',');
  });

  test('throws error for invalid file path', () => {
    const state = createFileSource('csv');
    expect(() => addFileSource(
      state,
      'file1',
      '',
      'csv'
    )).toThrow(ValidationError);
  });

  test('adds transformation mapping', () => {
    let state = createFileSource('csv');
    state = addTransformationMapping(
      state,
      'sourceField',
      'targetField',
      (value) => value.toString().toUpperCase()
    );
    
    const mapping = state.transformation.mappings.get('sourceField');
    expect(mapping).toBeDefined();
    expect(mapping?.source).toBe('sourceField');
    expect(mapping?.target).toBe('targetField');
    expect(mapping?.transform).toBeDefined();
  });

  test('throws error for invalid transformation', () => {
    const state = createFileSource('csv');
    expect(() => addTransformationMapping(
      state,
      '',
      'targetField'
    )).toThrow(ValidationError);
  });
});