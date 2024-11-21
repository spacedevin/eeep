export interface ValidationState {
  type: 'list' | 'whole' | 'decimal' | 'date' | 'time' | 'textLength' | 'custom';
  operator?: 'between' | 'notBetween' | 'equal' | 'notEqual' | 'greaterThan' | 'lessThan' | 'greaterOrEqual' | 'lessOrEqual';
  formula1?: string;
  formula2?: string;
  value1?: any;
  value2?: any;
  list?: string[] | string;
  allowBlank?: boolean;
  showInputMessage?: boolean;
  showErrorMessage?: boolean;
  errorStyle?: 'stop' | 'warning' | 'information';
  errorTitle?: string;
  error?: string;
  promptTitle?: string;
  prompt?: string;
  showDropDown?: boolean;
  inCellDropdown?: boolean;
  inputTitle?: string;
  inputMessage?: string;
  ignoreBlank?: boolean;
  ranges?: string[];
  customValidation?: {
    formula: string;
    errorMessage?: string;
    inputMessage?: string;
  };
}

export interface ValidationCollection {
  validations: Map<string, ValidationState>;
  defaultErrorStyle?: 'stop' | 'warning' | 'information';
  defaultShowInputMessage?: boolean;
  defaultShowErrorMessage?: boolean;
  defaultAllowBlank?: boolean;
}