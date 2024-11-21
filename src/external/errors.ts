export class ExternalDataError extends Error {
  constructor(message: string, public code: string, public details?: any) {
    super(message);
    this.name = 'ExternalDataError';
  }
}

export class ConnectionError extends ExternalDataError {
  constructor(message: string, details?: any) {
    super(message, 'CONNECTION_ERROR', details);
    this.name = 'ConnectionError';
  }
}

export class QueryError extends ExternalDataError {
  constructor(message: string, details?: any) {
    super(message, 'QUERY_ERROR', details);
    this.name = 'QueryError';
  }
}

export class ValidationError extends ExternalDataError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class TransformationError extends ExternalDataError {
  constructor(message: string, details?: any) {
    super(message, 'TRANSFORMATION_ERROR', details);
    this.name = 'TransformationError';
  }
}