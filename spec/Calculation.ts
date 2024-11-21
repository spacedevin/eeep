export interface CalculationState {
  mode: 'automatic' | 'manual' | 'manualExceptTables';
  settings: {
    enabled: boolean;
    maxIterations: number;
    maxChange: number;
    fullPrecision: boolean;
    calculateOnSave: boolean;
  };
  
  dependencies: {
    precedents: Map<string, Set<string>>;
    dependents: Map<string, Set<string>>;
    chain: string[];
    circular: Array<{
      start: string;
      path: string[];
    }>;
  };
  
  cache: {
    formulas: Map<string, {
      result: any;
      timestamp: number;
      isVolatile: boolean;
    }>;
    arrays: Map<string, {
      range: string;
      result: any[][];
      dependencies: string[];
    }>;
  };
  
  performance: {
    parallel: boolean;
    maxThreads: number;
    chunkSize: number;
    cacheTimeout: number;
  };
}