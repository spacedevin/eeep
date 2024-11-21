export interface SynchronizationState {
  mode: 'manual' | 'auto' | 'batch';
  
  data: {
    cells: Map<string, {
      value: any;
      version: number;
      lastSync: Date;
      dirty: boolean;
    }>;
    ranges: Map<string, {
      values: any[][];
      version: number;
      lastSync: Date;
      conflicts: boolean;
    }>;
  };

  state: {
    selection: {
      ranges: string[];
      timestamp: Date;
      user: string;
    };
    view: {
      scroll: { x: number; y: number };
      zoom: number;
      activeSheet: string;
    };
  };

  control: {
    auto: {
      enabled: boolean;
      interval: number;
      retryCount: number;
    };
    batch: {
      size: number;
      timeout: number;
      maxRetries: number;
    };
    delta: {
      enabled: boolean;
      compression: boolean;
      maxSize: number;
    };
  };

  conflicts: {
    resolution: 'lastWrite' | 'merge' | 'custom';
    strategy: Map<string, {
      handler: (local: any, remote: any) => any;
      priority: number;
    }>;
    history: Array<{
      timestamp: Date;
      type: string;
      resolution: string;
    }>;
  };
}