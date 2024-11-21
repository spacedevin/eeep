// src/spec/ArrayFormulas.ts
export interface ArrayFormulaState {
  type: 'dynamic' | 'legacy' | 'constant';
  formula: {
    expression: string;
    range: string;
    isDynamic: boolean;
    isVolatile: boolean;
    dependencies: string[];
  };
  spill: {
    range?: string;
    isBlocked: boolean;
    blockingCells: string[];
    reference?: string;
    behavior: {
      allowPartial: boolean;
      resizeWithData: boolean;
      clearOnError: boolean;
    };
  };
  calculation: {
    mode: 'automatic' | 'manual';
    order: number;
    cache?: {
      enabled: boolean;
      key: string;
      value: any[][];
    };
    error?: {
      type: string;
      message: string;
      position?: { row: number; col: number };
    };
  };
  operations: {
    expansion: {
      direction: 'both' | 'horizontal' | 'vertical';
      limits?: {
        maxRows?: number;
        maxCols?: number;
      };
    };
    combination: {
      operators: Set<'+' | '-' | '*' | '/' | '&'>;
      dimensionMatch: boolean;
    };
  };
}
