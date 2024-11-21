import { readFile, validateFile } from '../../../external/handlers/filesources';
import { createFileSource, addFileSource } from '../../../external';
import { TransformationError } from '../../../external/errors';

describe('File Source Handlers', () => {
  describe('File Reading', () => {
    test('reads file', async () => {
      let state = createFileSource('csv');
      state = addFileSource(state, 'file1', '/path/to/data.csv', 'csv');

      const data = await readFile(state, 'file1');
      expect(Array.isArray(data)).toBe(true);
    });

    test('throws error for invalid source', async () => {
      const state = createFileSource('csv');
      await expect(readFile(state, 'invalid')).rejects.toThrow(TransformationError);
    });
  });

  describe('File Validation', () => {
    test('validates file', async () => {
      let state = createFileSource('csv');
      state = addFileSource(state, 'file1', '/path/to/data.csv', 'csv');

      const result = await validateFile(state, 'file1');
      expect(result).toBe(true);
    });

    test('throws error for invalid source', async () => {
      const state = createFileSource('csv');
      await expect(validateFile(state, 'invalid')).rejects.toThrow(TransformationError);
    });
  });
});