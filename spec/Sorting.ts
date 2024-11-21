export interface SortState {
  active: boolean;
  range: string;

  levels: Array<{
    column: number;
    order: 'ascending' | 'descending';
    type: 'text' | 'number' | 'date' | 'custom';
    customList?: string[];
    sortBy?: {
      type: 'values' | 'cellColor' | 'fontColor' | 'icon';
      colors?: string[];
      icons?: string[];
    };
  }>;

  options: {
    hasHeaders: boolean;
    caseSensitive: boolean;
    orientation: 'rows' | 'columns';
    sortByRows: boolean;
  };

  custom: {
    lists: Map<string, string[]>;
    comparators: Map<string, (a: any, b: any) => number>;
    formatters: Map<string, (value: any) => any>;
  };

  state: {
    originalOrder: number[];
    lastSorted: Date;
    history: Array<{
      levels: any[];
      timestamp: Date;
    }>;
  };
}