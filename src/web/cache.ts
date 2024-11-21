import { FormulaError } from '../errors';

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  etag?: string;
  lastModified?: string;
}

export class WebCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private maxSize: number;
  private defaultTTL: number;

  constructor(maxSize: number = 100, defaultTTL: number = 300000) { // 5 minutes default TTL
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  set<T>(key: string, data: T, options?: {
    ttl?: number;
    etag?: string;
    lastModified?: string;
  }): void {
    // Clear old entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = Array.from(this.cache.keys())[0];
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      etag: options?.etag,
      lastModified: options?.lastModified
    });
  }

  get<T>(key: string, maxAge?: number): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    const age = Date.now() - entry.timestamp;
    if (age > (maxAge || this.defaultTTL)) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.data as T;
  }

  getMetadata(key: string): {
    etag?: string;
    lastModified?: string;
  } | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    return {
      etag: entry.etag,
      lastModified: entry.lastModified
    };
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.defaultTTL) {
        this.cache.delete(key);
      }
    }
  }

  setMaxSize(size: number): void {
    this.maxSize = size;
    this.cleanup();
  }

  setDefaultTTL(ttl: number): void {
    this.defaultTTL = ttl;
  }

  getSize(): number {
    return this.cache.size;
  }

  getMaxSize(): number {
    return this.maxSize;
  }

  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }
}