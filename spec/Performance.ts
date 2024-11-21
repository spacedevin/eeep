export interface PerformanceState {
  memory: {
    maxBufferSize: number;
    cacheSize: number;
    poolSize: number;
    gcThreshold: number;
    virtualization: {
      enabled: boolean;
      pageSize: number;
      maxPages: number;
    };
  };
  
  processing: {
    parallel: {
      enabled: boolean;
      maxThreads: number;
      minBatchSize: number;
    };
    calculation: {
      mode: 'auto' | 'manual' | 'lazy';
      cacheFormulas: boolean;
      maxIterations: number;
      tolerance: number;
    };
    batch: {
      size: number;
      timeout: number;
      retryCount: number;
    };
  };
  
  resources: {
    files: {
      tempPath: string;
      maxSize: number;
      compression: boolean;
      cleanupInterval: number;
    };
    connections: {
      poolSize: number;
      timeout: number;
      retryInterval: number;
      maxRetries: number;
    };
  };
  
  monitoring: {
    enabled: boolean;
    metrics: {
      memory: boolean;
      cpu: boolean;
      io: boolean;
      timing: boolean;
    };
    thresholds: {
      memoryWarning: number;
      memoryError: number;
      cpuWarning: number;
      cpuError: number;
    };
  };
}