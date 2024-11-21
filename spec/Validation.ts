export interface ValidationState {
  rules: Map<string, {
    type: 'list' | 'range' | 'formula' | 'custom';
    operator?: 'between' | 'notBetween' | 'equal' | 'notEqual' | 'greaterThan' | 'lessThan';
    formula1?: string;
    formula2?: string;
    value1?: any;
    value2?: any;
    list?: string[] | string;
    allowBlank: boolean;
    showInputMessage: boolean;
    showErrorMessage: boolean;
    errorStyle: 'stop' | 'warning' | 'information';
    errorTitle?: string;
    error?: string;
    promptTitle?: string;
    prompt?: string;
  }>;
  
  input: {
    required: Set<string>;
    formats: Map<string, {
      pattern: string;
      message?: string;
    }>;
    ranges: Map<string, {
      min?: number | Date;
      max?: number | Date;
      message?: string;
    }>;
  };
  
  errors: {
    style: 'stop' | 'warning' | 'information';
    showMessage: boolean;
    showCircle: boolean;
    defaultTitle: string;
    defaultMessage: string;
  };
}