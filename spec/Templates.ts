export interface TemplateState {
  type: 'workbook' | 'worksheet' | 'range' | 'style';
  
  content: {
    static: {
      layout: any;
      styles: any;
      formulas: any;
      validation: any;
    };
    dynamic: {
      placeholders: Map<string, {
        type: string;
        default?: any;
        validation?: (value: any) => boolean;
      }>;
      bindings: Map<string, {
        source: string;
        target: string;
        transform?: (value: any) => any;
      }>;
    };
  };

  elements: {
    variables: Map<string, {
      type: string;
      default?: any;
      required: boolean;
      validation?: (value: any) => boolean;
    }>;
    loops: Array<{
      range: string;
      collection: string;
      template: any;
    }>;
    conditions: Array<{
      target: string;
      expression: string;
      trueValue: any;
      falseValue?: any;
    }>;
  };

  operations: {
    load: {
      source: string;
      validate: boolean;
      preserveExisting: boolean;
    };
    apply: {
      target: string;
      clearExisting: boolean;
      validateData: boolean;
    };
    save: {
      format: 'xltx' | 'xltm' | 'custom';
      protect: boolean;
      metadata?: any;
    };
  };
}