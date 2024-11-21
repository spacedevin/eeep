import {
  ValidationError,
  TransformationError,
  ConnectionError,
  QueryError
} from '../../errors';

import { createError, isBaseError, formatErrorMessage } from '../../errors/utils';
import { ERROR_CODES } from '../../errors/constants';

describe('Error System', () => {
  test('creates validation error', () => {
    const error = new ValidationError('Invalid input');
    expect(error.name).toBe('ValidationError');
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.message).toBe('Invalid input');
  });

  test('creates error with details', () => {
    const error = new TransformationError('Transform failed', {
      source: 'test.csv',
      line: 10
    });
    expect(error.details).toEqual({
      source: 'test.csv',
      line: 10
    });
  });

  test('creates error with utility', () => {
    const error = createError(
      ValidationError,
      ERROR_CODES.validation.INVALID_NAME,
      'Invalid name format'
    );
    expect(error.code).toBe(ERROR_CODES.validation.INVALID_NAME);
  });

  test('identifies base errors', () => {
    const baseError = new ValidationError('test');
    const standardError = new Error('test');
    
    expect(isBaseError(baseError)).toBe(true);
    expect(isBaseError(standardError)).toBe(false);
  });

  test('formats error messages', () => {
    const error = new ConnectionError('Connection failed');
    const formatted = formatErrorMessage(error);
    expect(formatted).toContain('ConnectionError');
    expect(formatted).toContain('CONNECTION_ERROR');
  });
});