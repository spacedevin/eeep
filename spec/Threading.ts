export interface ThreadingState {
  enabled: boolean;
  
  pool: {
    minThreads: number;
    maxThreads: number;
    idleTimeout: number;
    priority: 'low' | 'normal' | 'high';
  };
  
  calculation: {
    parallel: boolean;
    maxDegree: number;
    chunkSize: number;
    volatileSync: boolean;
  };
  
  operations: {
    batchSize: number;
    timeout: number;
    retryCount: number;
    cancelOnError: boolean;
  };
  
  synchronization: {
    timeout: number;
    deadlockTimeout: number;
    maxRetries: number;
    isolationLevel: 'read' | 'write' | 'none';
  };
  
  monitoring: {
    enabled: boolean;
    interval: number;
    thresholds: {
      cpu: number;
      memory: number;
      threads: number;
    };
  };
}