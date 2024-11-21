import {
  validateConnectionString,
  validateUrl,
  validateTransformation
} from '../../external/validation';

describe('External Data Validation', () => {
  describe('Connection String Validation', () => {
    test('validates valid connection string', () => {
      expect(validateConnectionString('Server=localhost;Database=test')).toBe(true);
    });

    test('throws error for empty connection string', () => {
      expect(() => validateConnectionString('')).toThrow();
    });

    test('throws error for non-string connection string', () => {
      expect(() => validateConnectionString(123 as any)).toThrow();
    });
  });

  describe('URL Validation', () => {
    test('validates valid URL', () => {
      expect(validateUrl('https://api.example.com')).toBe(true);
    });

    test('throws error for invalid URL', () => {
      expect(() => validateUrl('not-a-url')).toThrow();
    });
  });

  describe('Transformation Validation', () => {
    test('validates valid transformation', () => {
      expect(validateTransformation({
        source: 'sourceField',
        target: 'targetField',
        transform: (value) => value.toString()
      })).toBe(true);
    });

    test('throws error for missing source/target', () => {
      expect(() => validateTransformation({
        source: '',
        target: 'targetField'
      })).toThrow();
    });

    test('throws error for invalid transform function', () => {
      expect(() => validateTransformation({
        source: 'sourceField',
        target: 'targetField',
        transform: 'not-a-function' as any
      })).toThrow();
    });

    test('validates transformation with validation rules', () => {
      expect(validateTransformation({
        source: 'sourceField',
        target: 'targetField',
        validation: [
          {
            rule: (value) => value > 0,
            message: 'Value must be positive'
          }
        ]
      })).toBe(true);
    });
  });
});