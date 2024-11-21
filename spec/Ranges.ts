export interface RangeState {
  address: string;
  worksheet: string;
  type: 'cell' | 'row' | 'column' | 'rectangle' | 'multiple';
  dimension: {
    start: {
      row: number;
      column: number;
    };
    end: {
      row: number;
      column: number;
    };
  };
  values?: Array<Array<any>>;
  formulas?: Array<Array<string>>;
  styles?: Array<Array<StyleState>>;
  mergedCells?: Array<{
    start: { row: number; column: number };
    end: { row: number; column: number };
  }>;
  properties: {
    hidden?: boolean;
    autoFilter?: boolean;
    showFormulas?: boolean;
    showGridLines?: boolean;
    showRowColHeaders?: boolean;
    showZeros?: boolean;
  };
  validation?: ValidationState;
}

export interface RangeOperations {
  getValue(row: number, column: number): any;
  setValue(row: number, column: number, value: any): void;
  getFormula(row: number, column: number): string;
  setFormula(row: number, column: number, formula: string): void;
  getStyle(row: number, column: number): StyleState;
  setStyle(row: number, column: number, style: StyleState): void;
  clear(clearFlags?: {
    contents?: boolean;
    formats?: boolean;
    comments?: boolean;
    hyperlinks?: boolean;
  }): void;
  copy(destination: RangeState, options?: {
    values?: boolean;
    formulas?: boolean;
    styles?: boolean;
    validation?: boolean;
  }): void;
  insert(shiftDirection: 'down' | 'right'): void;
  delete(shiftDirection: 'up' | 'left'): void;
  offset(rowOffset: number, columnOffset: number): RangeState;
  resize(rows: number, columns: number): RangeState;
  autoFit(options?: {
    width?: boolean;
    height?: boolean;
    bestFit?: boolean;
  }): void;
}