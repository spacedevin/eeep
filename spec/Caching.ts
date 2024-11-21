export interface CacheState {
  values: {
    calculated: Map<string, {
      value: any;
      timestamp: number;
      expires?: number;
    }>;
    shared: Map<string, {
      value: string;
      count: number;
    }>;
    formulas: Map<string, {
      result: any;
      dependencies: string[];
      isVolatile: boolean;
    }>;
  };
  
  memory: {
    buffer: {
      size: number;
      used: number;
      items: Map<string, {
        data: any;
        size: number;
        priority: number;
      }>;
    };
    objects: {
      maxSize: number;
      current: number;
      items: Map<string, {
        object: any;
        size: number;
        lastAccess: number;
      }>;
    };
  };
  
  policies: {
    expiration: {
      default: number;
      maximum: number;
      sliding: boolean;
    };
    size: {
      maxItems: number;
      maxMemory: number;
      maxPerCategory: number;
    };
    eviction: {
      policy: 'lru' | 'lfu' | 'fifo' | 'priority';
      threshold: number;
    };
  };
  
  statistics: {
    hits: number;
    misses: number;
    evictions: number;
    size: number;
    lastCleanup: number;
  };
}