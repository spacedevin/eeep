import { PivotTableState } from '../../spec/PivotTables';
import { validateName } from '../validation';

export function createPivotTable(
  name: string,
  sourceRange: string,
  targetCell: string
): PivotTableState {
  validateName(name);

  return {
    name,
    sourceRange,
    targetCell,
    refreshOnLoad: true,
    fields: {
      rows: [],
      columns: [],
      values: [],
      filters: [],
      pages: []
    },
    options: {
      layout: {
        form: 'compact',
        indentRows: 1,
        preserveFormatting: true,
        showEmptyRows: false,
        showEmptyColumns: false,
        repeatLabels: false
      },
      totals: {
        rows: {
          show: true,
          position: 'bottom'
        },
        columns: {
          show: true,
          position: 'right'
        },
        grand: {
          rows: true,
          columns: true
        }
      },
      display: {
        fieldHeaders: true,
        fieldButtons: true,
        emptyDisplay: '',
        errorDisplay: '#N/A',
        missingDisplay: ''
      },
      style: {
        name: 'PivotStyleMedium2',
        showRowHeaders: true,
        showColumnHeaders: true,
        showRowStripes: false,
        showColumnStripes: false
      }
    }
  };
}

export function addPivotField(
  pivotTable: PivotTableState,
  fieldType: keyof PivotTableState['fields'],
  field: {
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
  }
): PivotTableState {
  const fields = pivotTable.fields[fieldType];
  if (!Array.isArray(fields)) {
    throw new Error(`Invalid field type: ${fieldType}`);
  }

  return {
    ...pivotTable,
    fields: {
      ...pivotTable.fields,
      [fieldType]: [...fields, field]
    }
  };
}

export function setPivotTableOptions(
  pivotTable: PivotTableState,
  options: Partial<PivotTableState['options']>
): PivotTableState {
  return {
    ...pivotTable,
    options: {
      ...pivotTable.options,
      ...options,
      layout: {
        ...pivotTable.options.layout,
        ...options.layout
      },
      totals: {
        ...pivotTable.options.totals,
        ...options.totals
      },
      display: {
        ...pivotTable.options.display,
        ...options.display
      },
      style: {
        ...pivotTable.options.style,
        ...options.style
      }
    }
  };
}

export function addCalculatedField(
  pivotTable: PivotTableState,
  name: string,
  formula: string,
  options?: {
    showAs?: {
      type: 'normal' | 'percentOfTotal' | 'percentOfRow' | 'percentOfCol' | 'percentOfParentRow' | 'percentOfParentCol' | 'difference' | 'percentDifference' | 'runningTotal' | 'rank';
      baseField?: string;
      baseItem?: string;
    };
    numberFormat?: string;
  }
): PivotTableState {
  validateName(name);

  return addPivotField(pivotTable, 'values', {
    sourceField: name,
    name,
    calculation: 'custom',
    showAs: options?.showAs,
    numberFormat: options?.numberFormat
  } as any);
}

export function refreshPivotTable(pivotTable: PivotTableState): PivotTableState {
  return {
    ...pivotTable,
    cache: {
      refreshDate: new Date(),
      backgroundQuery: false,
      memoryUsed: 0,
      recordCount: 0
    }
  };
}