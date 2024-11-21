import { BaseError } from '../errors/base';
import { ErrorDetails } from '../types';

export function handleError<T extends BaseError>(
  error: unknown,
  ErrorClass: new (message: string, details?: ErrorDetails) => T,
  defaultMessage: string
): never {
  if (error instanceof Error) {
    throw new ErrorClass(defaultMessage, {
      message: error.message,
      stack: error.stack,
      cause: error
    });
  }
  throw new ErrorClass(defaultMessage, { cause: error });
}

export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export function logError(error: unknown, context?: Record<string, any>): void {
  // In a real implementation, this would log to a proper logging system
  console.error('Error:', formatErrorMessage(error), 'Context:', context);
}

export function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const attempt = async (retryCount: number) => {
      try {
        const result = await operation();
        resolve(result);
      } catch (error) {
        if (retryCount < maxRetries) {
          setTimeout(() => attempt(retryCount + 1), delay);
        } else {
          reject(error);
        }
      }
    };
    attempt(0);
  });
}
