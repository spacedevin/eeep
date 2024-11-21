export interface QueryState {
  type: 'range' | 'cell' | 'sheet' | 'workbook' | 'formula' | 'style' | 'name' | 'protection';
  
  builder: {
    select: string[];
    from: string;
    where?: string;
    orderBy?: string[];
    groupBy?: string[];
    having?: string;
    parameters?: Map<string, any>;
  };
  
  execution: {
    plan: {
      steps: Array<{
        type: string;
        operation: string;
        cost: number;
      }>;
      estimated: {
        rows: number;
        cost: number;
      };
    };
    cache: {
      enabled: boolean;
      duration: number;
      key: string;
    };
    batch: {
      size: number;
      parallel: boolean;
    };
  };
  
  results: {
    data: any[];
    metadata: {
      count: number;
      timestamp: number;
      source: string;
    };
  };
}