import { TableStyleState } from '../../spec/Tables';

export function createTableStyle(name: string): TableStyleState {
  return {
    name,
    pivot: false,
    table: true,
    elements: [],
    showFirstColumn: false,
    showLastColumn: false,
    showRowStripes: true,
    showColumnStripes: false
  };
}

export function addStyleElement(
  style: TableStyleState,
  type: 'wholeTable' | 'headerRow' | 'totalRow' | 'firstColumn' | 'lastColumn' | 'firstRowStripe' | 'secondRowStripe' | 'firstColumnStripe' | 'secondColumnStripe' | 'firstHeaderCell' | 'lastHeaderCell' | 'firstTotalCell' | 'lastTotalCell',
  elementStyle: any,
  size?: number
): TableStyleState {
  return {
    ...style,
    elements: [
      ...style.elements,
      {
        type,
        style: elementStyle,
        size
      }
    ]
  };
}

export function setTableStyleOptions(
  style: TableStyleState,
  options: {
    showFirstColumn?: boolean;
    showLastColumn?: boolean;
    showRowStripes?: boolean;
    showColumnStripes?: boolean;
  }
): TableStyleState {
  return {
    ...style,
    ...options
  };
}

export function setPivotStyle(style: TableStyleState, isPivot: boolean): TableStyleState {
  return {
    ...style,
    pivot: isPivot,
    table: !isPivot
  };
}