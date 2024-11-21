import { ValidationError } from './errors/base';

export function validateFile(filePath: string): void {
  if (!filePath || typeof filePath !== 'string') {
    throw new ValidationError('File path must be a non-empty string');
  }
}

export function validateUrl(url: string): void {
  try {
    new URL(url);
  } catch {
    throw new ValidationError('Invalid URL format');
  }
}

export function validateConnectionString(connectionString: string): void {
  if (!connectionString || typeof connectionString !== 'string') {
    throw new ValidationError('Connection string must be a non-empty string');
  }
}

export function validateTransformation(source: string, target: string): void {
  if (!source || !target) {
    throw new ValidationError('Source and target fields are required for transformation');
  }
}