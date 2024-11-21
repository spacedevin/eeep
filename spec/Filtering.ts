export interface FilteringState {
  active: boolean;
  range: string;
  
  filters: Map<number, {
    type: 'value' | 'text' | 'number' | 'date' | 'custom';
    criteria: Array<{
      operator: string;
      value: any;
      andOr?: 'and' | 'or';
    }>;
    dynamic?: {
      type: string;
      parameters: any;
    };
    custom?: {
      formula: string;
      evaluation: (value: any) => boolean;
    };
  }>;

  operations: {
    showFilteredRows: boolean;
    preserveSort: boolean;
    reapplyOnChange: boolean;
    caseSensitive: boolean;
  };

  results: {
    filteredRows: Set<number>;
    hiddenRows: Set<number>;
    lastApplied: Date;
    filterHistory: Array<{
      column: number;
      criteria: any;
      timestamp: Date;
    }>;
  };

  events: {
    onBeforeFilter?: (column: number) => boolean;
    onAfterFilter?: (column: number) => void;
    onClearFilter?: (column: number) => void;
  };
}