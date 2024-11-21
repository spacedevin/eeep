export interface DiagnosticsState {
  enabled: boolean;
  
  metrics: {
    performance: {
      executionTime: Map<string, number>;
      memoryUsage: Map<string, number>;
      cpuUsage: Map<string, number>;
      ioOperations: Map<string, number>;
    };
    errors: Array<{
      id: string;
      type: string;
      message: string;
      stack?: string;
      timestamp: Date;
      context?: any;
    }>;
    usage: Map<string, {
      count: number;
      duration: number;
      lastUsed: Date;
      patterns?: any[];
    }>;
  };
  
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    targets: Array<{
      type: 'console' | 'file' | 'custom';
      options: any;
    }>;
    filters: Array<{
      field: string;
      value: any;
      operation: 'include' | 'exclude';
    }>;
  };
  
  monitoring: {
    enabled: boolean;
    interval: number;
    thresholds: Map<string, {
      warning: number;
      error: number;
      action?: () => void;
    }>;
  };
}