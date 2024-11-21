export interface PowerQueryState {
  queries: Map<string, {
    name: string;
    type: 'source' | 'transform' | 'merge' | 'append';
    steps: Array<{
      id: string;
      type: string;
      parameters: any;
      enabled: boolean;
    }>;
    formula: string;
    metadata: {
      dependencies: string[];
      refreshTime?: Date;
      loadEnabled: boolean;
    };
  }>;

  transformations: {
    filters: Array<{
      column: string;
      operator: string;
      value: any;
      dynamic?: boolean;
    }>;
    sorts: Array<{
      column: string;
      order: 'ascending' | 'descending';
      nullsPosition: 'first' | 'last';
    }>;
    groups: Array<{
      keys: string[];
      aggregations: Array<{
        column: string;
        function: string;
        alias?: string;
      }>;
    }>;
  };

  shaping: {
    pivot: {
      rows: string[];
      columns: string[];
      values: Array<{
        column: string;
        function: string;
      }>;
    };
    merge: {
      type: 'inner' | 'left' | 'right' | 'full';
      keys: Array<{
        left: string;
        right: string;
      }>;
    };
  };

  management: {
    parameters: Map<string, {
      name: string;
      type: string;
      value: any;
      required: boolean;
    }>;
    refresh: {
      mode: 'manual' | 'auto';
      interval?: number;
      dependencies: boolean;
    };
    folding: {
      enabled: boolean;
      threshold: number;
    };
  };
}