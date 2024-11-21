export class BaseError extends Error {
  constructor(message: string, public code: string, public details?: any) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
  }
}

export class TransformationError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'TRANSFORMATION_ERROR', details);
  }
}

export class FormulaError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'FORMULA_ERROR', details);
  }
}

export class StreamError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'STREAM_ERROR', details);
  }
}

export class SecurityError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'SECURITY_ERROR', details);
  }
}

export class FileError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'FILE_ERROR', details);
  }
}

export class NetworkError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'NETWORK_ERROR', details);
  }
}

export class DataError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'DATA_ERROR', details);
  }
}

export class ConnectionError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'CONNECTION_ERROR', details);
  }
}

export class QueryError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'QUERY_ERROR', details);
  }
}

export class ConfigurationError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, 'CONFIGURATION_ERROR', details);
  }
}