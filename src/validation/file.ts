import { ValidationError } from '../errors';
import { ERROR_CODES } from '../errors/constants';
import { createError } from '../errors/utils';

export function validateFile(filePath: string): void {
  if (!filePath || typeof filePath !== 'string') {
    throw createError(ValidationError, ERROR_CODES.validation.INVALID_FILE, 'File path must be a non-empty string');
  }
}

// Rest of the file validation functions...