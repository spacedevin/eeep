import { AutoFilterState } from './AutoFilter';
import { ValidationState } from './DataValidation';

export interface TableStyleState {
  name: string;
  pivot: boolean;
  table: boolean;
  elements: Array<{
    type: 'wholeTable' | 'headerRow' | 'totalRow' | 'firstColumn' | 'lastColumn' | 'firstRowStripe' | 'secondRowStripe' | 'firstColumnStripe' | 'secondColumnStripe' | 'firstHeaderCell' | 'lastHeaderCell' | 'firstTotalCell' | 'lastTotalCell';
    style: any;
    size?: number;
  }>;
  showFirstColumn: boolean;
  showLastColumn: boolean;
  showRowStripes: boolean;
  showColumnStripes: boolean;
}

export interface TableState {
  name: string;
  range: string;
  displayName?: string;
  showHeaders: boolean;
  showTotals: boolean;
  style: {
    name: string;
    showFirstColumn: boolean;
    showLastColumn: boolean;
    showRowStripes: boolean;
    showColumnStripes: boolean;
    headerRowStyle?: TableStyleElement;
    totalRowStyle?: TableStyleElement;
    firstColumnStyle?: TableStyleElement;
    lastColumnStyle?: TableStyleElement;
    rowStripeStyle?: TableStyleElement;
    columnStripeStyle?: TableStyleElement;
  };
  columns: Array<{
    name: string;
    totalsRowFunction?: 'sum' | 'average' | 'count' | 'custom' | 'none';
    totalsRowFormula?: string;
    totalsRowLabel?: string;
    calculatedColumnFormula?: string;
    dataValidation?: ValidationState;
    style?: TableStyleElement;
  }>;
  autoFilter?: AutoFilterState;
  sort?: {
    range: string;
    keys: Array<{
      column: number;
      ascending: boolean;
      sortBy?: 'value' | 'cellColor' | 'fontColor' | 'icon';
      customList?: string[];
    }>;
  };
}

export interface TableStyleElement {
  font?: {
    name?: string;
    size?: number;
    bold?: boolean;
    italic?: boolean;
    color?: string;
  };
  fill?: {
    type: 'pattern' | 'gradient';
    color?: string;
    pattern?: string;
  };
  border?: {
    top?: BorderElement;
    right?: BorderElement;
    bottom?: BorderElement;
    left?: BorderElement;
  };
  alignment?: {
    horizontal?: 'left' | 'center' | 'right';
    vertical?: 'top' | 'middle' | 'bottom';
    wrapText?: boolean;
  };
}

export interface BorderElement {
  style: 'thin' | 'medium' | 'thick' | 'double';
  color: string;
}