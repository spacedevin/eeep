export class CacheManager {
  private cache: Map<string, any> = new Map();
  private maxSize: number = 100;
  private ttl: number = 60000; // 1 minute default TTL

  constructor(maxSize?: number, ttl?: number) {
    if (maxSize) this.maxSize = maxSize;
    if (ttl) this.ttl = ttl;
  }

  set(key: string, value: any, ttl?: number): void {
    // Clear old entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = Array.from(this.cache.keys())[0];
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.ttl
    });
  }

  get(key: string): any {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
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
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }
}