export interface IterationState {
  type: 'cell' | 'range' | 'custom';
  
  control: {
    direction: 'forward' | 'reverse' | 'custom';
    pattern?: {
      type: 'rowWise' | 'columnWise' | 'areaWise' | 'custom';
      customPath?: Array<{x: number; y: number}>;
    };
    position: {
      start: { row: number; col: number };
      end: { row: number; col: number };
      current: { row: number; col: number };
    };
    step: {
      rows: number;
      cols: number;
      skipEmpty?: boolean;
      skipHidden?: boolean;
    };
  };

  filters: Array<{
    type: 'value' | 'formula' | 'style' | 'custom';
    predicate: (cell: any) => boolean;
  }>;

  performance: {
    lazy: boolean;
    batchSize: number;
    cacheResults: boolean;
    maxMemory?: number;
  };

  state: {
    isComplete: boolean;
    itemsProcessed: number;
    currentBatch: number;
    errors: Array<{
      position: { row: number; col: number };
      error: string;
    }>;
  };
}