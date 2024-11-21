import { ERROR_CODES } from './constants';

export abstract class BaseError extends Error {
  constructor(
    message: string,
    public code: string = ERROR_CODES.unknown,
    public details?: any
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, ERROR_CODES.validation.INVALID_INPUT, details);
  }
}

export class TransformationError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, ERROR_CODES.transformation.PARSE_ERROR, details);
  }
}

export class ConnectionError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, ERROR_CODES.connection.CONNECTION_FAILED, details);
  }
}

export class QueryError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, ERROR_CODES.query.EXECUTION_FAILED, details);
  }
}