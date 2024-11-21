export interface FilterState {
  type: 'auto' | 'advanced' | 'custom';
  range: string;
  
  columns: Map<number, {
    filterType: 'value' | 'text' | 'date' | 'custom';
    criteria: Array<{
      operator: string;
      value: any;
      andOr?: 'and' | 'or';
    }>;
    dynamicType?: {
      type: string;
      dynamic: boolean;
    };
    top10?: {
      type: 'items' | 'percent';
      value: number;
      top: boolean;
    };
  }>;

  advanced?: {
    criteriaRange: string;
    copyToRange?: string;
    unique: boolean;
    onlyVisibleCells: boolean;
  };

  custom?: {
    formula: string;
    reapplyOnChange: boolean;
  };

  options: {
    caseSensitive: boolean;
    evaluateFormulas: boolean;
    skipBlanks: boolean;
  };
}