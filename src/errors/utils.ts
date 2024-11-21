import { BaseError } from './index';
import { ERROR_CODES } from './constants';

export function createError(
  ErrorClass: typeof BaseError,
  code: string,
  message?: string,
  details?: any
): BaseError {
  return new ErrorClass(
    message || `Error occurred: ${code}`,
    code,
    details
  );
}

export function isBaseError(error: any): error is BaseError {
  return error instanceof BaseError;
}

export function formatErrorMessage(error: Error | BaseError): string {
  if (isBaseError(error)) {
    return `${error.name} (${error.code}): ${error.message}`;
  }
  return `Error: ${error.message}`;
}

export function getErrorCode(error: Error | BaseError): string | undefined {
  if (isBaseError(error)) {
    return error.code;
  }
  return undefined;
}

export function getErrorDetails(error: Error | BaseError): any | undefined {
  if (isBaseError(error)) {
    return error.details;
  }
  return undefined;
}

export function handleError<T extends BaseError>(
  error: unknown,
  ErrorClass: new (message: string, details?: any) => T,
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