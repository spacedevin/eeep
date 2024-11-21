export interface PersistenceState {
  storage: {
    type: 'file' | 'memory' | 'stream' | 'custom';
    
    file?: {
      path: string;
      mode: 'read' | 'write' | 'readwrite';
      share: boolean;
      backup: {
        enabled: boolean;
        interval: number;
        copies: number;
      };
    };
    
    memory?: {
      maxSize: number;
      persistent: boolean;
      cache: {
        enabled: boolean;
        size: number;
        policy: 'lru' | 'fifo' | 'lfu';
      };
    };
  };
  
  resources: {
    connections: {
      pool: {
        size: number;
        timeout: number;
        retry: number;
      };
      active: Map<string, {
        id: string;
        type: string;
        created: Date;
        lastUsed: Date;
      }>;
    };
    
    cleanup: {
      enabled: boolean;
      interval: number;
      threshold: number;
      handlers: Map<string, () => void>;
    };
  };
  
  versioning: {
    enabled: boolean;
    maxVersions: number;
    strategy: 'timestamp' | 'increment' | 'hash';
    metadata: Map<string, {
      version: string;
      timestamp: Date;
      author: string;
    }>;
  };
}