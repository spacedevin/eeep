import { PivotTableState } from '../../spec/PivotTables';

export function createPivotTable(
  name: string,
  sourceRange: string,
  targetCell: string
): PivotTableState {
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
  field: any
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