export interface OptimizationState {
  memory: {
    pooling: {
      enabled: boolean;
      maxSize: number;
      growthFactor: number;
      shrinkThreshold: number;
    };
    caching: {
      enabled: boolean;
      maxItems: number;
      timeout: number;
      strategy: 'lru' | 'lfu' | 'fifo';
    };
    limits: {
      maxMemory: number;
      warningThreshold: number;
      cleanupThreshold: number;
    };
  };
  
  performance: {
    calculation: {
      parallel: boolean;
      maxThreads: number;
      chunkSize: number;
      cacheResults: boolean;
    };
    operations: {
      batchSize: number;
      asyncEnabled: boolean;
      queueSize: number;
      timeout: number;
    };
    io: {
      bufferSize: number;
      compression: boolean;
      async: boolean;
      maxConcurrent: number;
    };
  };
  
  monitoring: {
    enabled: boolean;
    interval: number;
    metrics: Set<'memory' | 'cpu' | 'io' | 'cache'>;
    thresholds: Map<string, {
      warning: number;
      critical: number;
      action?: () => void;
    }>;
  };
}