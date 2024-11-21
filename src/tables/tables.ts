import { TableState, TableStyleElement } from '../../spec/Tables';
import { AutoFilterState } from '../../spec/AutoFilter';
import { ValidationState } from '../../spec/DataValidation';

export function createTable(name: string, range: string): TableState {
  return {
    name,
    range,
    displayName: name,
    showHeaders: true,
    showTotals: false,
    style: {
      name: 'TableStyleMedium2',
      showFirstColumn: false,
      showLastColumn: false,
      showRowStripes: true,
      showColumnStripes: false
    },
    columns: []
  };
}

export function addTableColumn(
  table: TableState,
  name: string,
  options?: {
    totalsRowFunction?: 'sum' | 'average' | 'count' | 'custom' | 'none';
    totalsRowFormula?: string;
    totalsRowLabel?: string;
    calculatedColumnFormula?: string;
    dataValidation?: ValidationState;
    style?: TableStyleElement;
  }
): TableState {
  return {
    ...table,
    columns: [
      ...table.columns,
      {
        name,
        ...options
      }
    ]
  };
}

export function setTableStyle(
  table: TableState,
  style: {
    name: string;
    showFirstColumn?: boolean;
    showLastColumn?: boolean;
    showRowStripes?: boolean;
    showColumnStripes?: boolean;
    headerRowStyle?: TableStyleElement;
    totalRowStyle?: TableStyleElement;
    firstColumnStyle?: TableStyleElement;
    lastColumnStyle?: TableStyleElement;
    rowStripeStyle?: TableStyleElement;
    columnStripeStyle?: TableStyleElement;
  }
): TableState {
  return {
    ...table,
    style: {
      ...table.style,
      ...style
    }
  };
}