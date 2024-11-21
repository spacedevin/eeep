export interface TemplatingState {
  templates: Map<string, {
    type: 'workbook' | 'worksheet' | 'range' | 'style';
    content: any;
    variables: Map<string, {
      type: string;
      default?: any;
      validation?: (value: any) => boolean;
    }>;
    placeholders: Array<{
      id: string;
      type: 'text' | 'value' | 'formula' | 'style';
      location: string;
      expression?: string;
    }>;
  }>;
  
  operations: {
    binding: {
      mode: 'static' | 'dynamic';
      refresh: 'manual' | 'auto';
      validation: boolean;
    };
    processing: {
      async: boolean;
      cache: boolean;
      timeout: number;
    };
  };
  
  customization: {
    functions: Map<string, (context: any) => any>;
    formatters: Map<string, (value: any) => string>;
    validators: Map<string, (value: any) => boolean>;
  };
}