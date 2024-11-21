export interface FormulaState {
  type: 'basic' | 'array' | 'r1c1' | 'dynamic';
  formula: string;
  references: Array<{
    type: 'cell' | 'range' | 'name' | 'external';
    address: string;
    isAbsolute?: boolean;
    sheet?: string;
    workbook?: string;
  }>;
  operators: Array<{
    type: 'arithmetic' | 'comparison' | 'text' | 'range';
    operator: string;
    position: number;
  }>;
  functions: Array<{
    name: string;
    arguments: Array<{
      type: 'value' | 'reference' | 'array' | 'function';
      value: any;
    }>;
  }>;
  result?: {
    type: 'value' | 'array' | 'error';
    value: any;
    isVolatile?: boolean;
    isDirty?: boolean;
  };
}

export interface CalculationChainState {
  cells: Array<{
    cell: string;
    sheet: string;
    priority: number;
    dependencies: string[];
  }>;
  volatileCells: Set<string>;
  dirtyNodes: Set<string>;
  circularReferences: Array<{
    start: string;
    path: string[];
  }>;
}