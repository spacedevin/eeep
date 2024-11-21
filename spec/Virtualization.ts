export interface VirtualizationState {
  data: {
    rows: {
      virtualSize: number;
      pageSize: number;
      loadedPages: Set<number>;
      cache: Map<number, any[]>;
    };
    columns: {
      virtualSize: number;
      pageSize: number;
      loadedPages: Set<number>;
      cache: Map<number, any[]>;
    };
    cells: Map<string, {
      value: any;
      loaded: boolean;
      dirty: boolean;
    }>;
  };

  view: {
    viewport: {
      top: number;
      left: number;
      width: number;
      height: number;
      zoom: number;
    };
    scroll: {
      position: { x: number; y: number };
      virtualHeight: number;
      virtualWidth: number;
      renderAhead: number;
    };
    selection: {
      active: string;
      ranges: string[];
      virtual: boolean;
    };
  };

  memory: {
    limits: {
      maxPages: number;
      maxCacheSize: number;
      maxLoadedCells: number;
    };
    cleanup: {
      strategy: 'lru' | 'lfu' | 'fifo';
      threshold: number;
      interval: number;
    };
  };

  performance: {
    throttle: {
      scroll: number;
      render: number;
      load: number;
    };
    async: {
      enabled: boolean;
      batchSize: number;
      timeout: number;
    };
  };
}