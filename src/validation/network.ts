import { ValidationError } from '../errors';
import { ERROR_CODES } from '../errors/constants';
import { createError } from '../errors/utils';

export function validateUrl(url: string): void {
  try {
    new URL(url);
  } catch {
    throw createError(ValidationError, ERROR_CODES.validation.INVALID_URL, 'Invalid URL format');
  }
}

// Rest of the network validation functions...