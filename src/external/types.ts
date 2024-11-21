export interface FileSourceOptions {
  encoding?: BufferEncoding;
  delimiter?: string;
  hasHeader?: boolean;
  schema?: any;
  customParser?: string;
  parserOptions?: Record<string, any>;
  dateFormat?: string;
}

export interface ParserOptions {
  encoding?: BufferEncoding;
  delimiter?: string;
  hasHeader?: boolean;
  schema?: any;
  customParser?: string;
  parserOptions?: Record<string, any>;
  streaming?: boolean;
  compression?: boolean;
  chunkSize?: number;
  maxSize?: number;
  dateFormat?: string;
}

export interface ConnectionSettings {
  connectionString: string;
  timeout: number;
  pooling: boolean;
  maxPoolSize?: number;
}

export type DatabaseType = 'sqlserver' | 'oracle' | 'mysql' | 'postgresql' | 'sqlite';
export type FileSourceType = 'csv' | 'xml' | 'json' | 'text' | 'xlsx' | 'xls';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type AuthType = 'basic' | 'bearer' | 'oauth' | 'token' | 'windows';

export interface ErrorDetails {
  code?: string;
  message?: string;
  stack?: string;
  cause?: unknown;
}