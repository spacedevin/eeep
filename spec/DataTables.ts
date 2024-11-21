export interface DataTableState {
  type: 'single' | 'multiple';
  
  inputs: {
    row?: {
      cell: string;
      values: any[];
      format?: string;
    };
    column?: {
      cell: string;
      values: any[];
      format?: string;
    };
    validation?: {
      rules: Array<{
        type: string;
        params: any[];
        message: string;
      }>;
    };
  };

  formula: {
    cell: string;
    expression: string;
    dependencies: string[];
    isVolatile: boolean;
  };

  results: {
    range: string;
    format?: string;
    validation?: {
      enabled: boolean;
      rules: Array<{
        condition: string;
        style?: any;
      }>;
    };
  };

  calculation: {
    mode: 'auto' | 'manual';
    order: number;
    dependencies: Set<string>;
    cache?: {
      enabled: boolean;
      timeout: number;
    };
  };
}