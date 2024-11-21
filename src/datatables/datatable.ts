import { DataTableState } from '../../spec/DataTables';

export function createDataTable(formulaCell: string): DataTableState {
  return {
    type: 'single',
    inputs: {},
    formula: {
      cell: formulaCell,
      expression: '',
      dependencies: [],
      isVolatile: false
    },
    results: {
      range: '',
      validation: {
        enabled: true,
        rules: []
      }
    },
    calculation: {
      mode: 'auto',
      order: 0,
      dependencies: new Set()
    }
  };
}

export function setRowInput(state: DataTableState, cell: string, values: any[]): DataTableState {
  return {
    ...state,
    type: 'single',
    inputs: {
      ...state.inputs,
      row: {
        cell,
        values,
        format: undefined
      }
    }
  };
}

export function setColumnInput(state: DataTableState, cell: string, values: any[]): DataTableState {
  return {
    ...state,
    type: 'single',
    inputs: {
      ...state.inputs,
      column: {
        cell,
        values,
        format: undefined
      }
    }
  };
}