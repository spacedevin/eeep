export interface PivotTableState {
  name: string;
  sourceRange: string;
  targetCell: string;
  refreshOnLoad: boolean;
  fields: {
    rows: Array<{
      sourceField: string;
      name?: string;
      subtotals?: boolean;
      showBlankItems?: boolean;
      sort?: {
        order: 'ascending' | 'descending';
        customList?: string[];
      };
      grouping?: {
        type: 'date' | 'number' | 'text';
        start?: number | Date;
        end?: number | Date;
        interval?: number;
        items?: string[];
      };
    }>;
    columns: Array<{
      sourceField: string;
      name?: string;
      subtotals?: boolean;
      showBlankItems?: boolean;
      sort?: {
        order: 'ascending' | 'descending';
        customList?: string[];
      };
    }>;
    values: Array<{
      sourceField: string;
      name?: string;
      calculation: 'sum' | 'count' | 'average' | 'max' | 'min' | 'product' | 'countNums' | 'stdDev' | 'stdDevP' | 'var' | 'varP';
      showAs?: {
        type: 'normal' | 'percentOfTotal' | 'percentOfRow' | 'percentOfCol' | 'percentOfParentRow' | 'percentOfParentCol' | 'difference' | 'percentDifference' | 'runningTotal' | 'rank';
        baseField?: string;
        baseItem?: string;
      };
      numberFormat?: string;
    }>;
    filters: Array<{
      sourceField: string;
      name?: string;
      filterType: 'value' | 'label' | 'date' | 'custom';
      criteria?: Array<{
        operator: string;
        value: any;
        conjunction?: 'and' | 'or';
      }>;
      items?: string[];
      exclude?: boolean;
    }>;
    pages?: Array<{
      sourceField: string;
      name?: string;
      selectedItem?: string;
    }>;
  };
  options: {
    layout: {
      form: 'compact' | 'outline' | 'tabular';
      indentRows?: number;
      preserveFormatting?: boolean;
      showEmptyRows?: boolean;
      showEmptyColumns?: boolean;
      repeatLabels?: boolean;
    };
    totals: {
      rows: {
        show?: boolean;
        position?: 'top' | 'bottom';
      };
      columns: {
        show?: boolean;
        position?: 'left' | 'right';
      };
      grand: {
        rows?: boolean;
        columns?: boolean;
      };
    };
    display: {
      fieldHeaders?: boolean;
      fieldButtons?: boolean;
      emptyDisplay?: string;
      errorDisplay?: string;
      missingDisplay?: string;
    };
    style?: {
      name?: string;
      showRowHeaders?: boolean;
      showColumnHeaders?: boolean;
      showRowStripes?: boolean;
      showColumnStripes?: boolean;
    };
  };
  cache?: {
    refreshDate?: Date;
    backgroundQuery?: boolean;
    memoryUsed?: number;
    recordCount?: number;
  };
}