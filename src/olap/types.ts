export interface OLAPConfig {
  server: string;
  port: number;
  database: string;
  username: string;
  password: string;
  options?: {
    encrypt?: boolean;
    trustServerCertificate?: boolean;
    connectionTimeout?: number;
    requestTimeout?: number;
  };
}

export interface MDXQuery {
  cube: string;
  dimensions: string[];
  measures: string[];
  filters?: Record<string, any>;
  orderBy?: string;
}

export interface OLAPResult {
  data: any[][];
  metadata: {
    dimensions: string[];
    measures: string[];
    timestamp: number;
  };
}

export interface OLAPError extends Error {
  code: string;
  details?: any;
}

export type CacheKey = string;
export type CacheValue = any;

export interface CacheEntry {
  value: CacheValue;
  timestamp: number;
  ttl: number;
}