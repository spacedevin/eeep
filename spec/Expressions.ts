export interface ExpressionState {
  type: 'formula' | 'conditional' | 'custom';
  
  syntax: {
    tree: {
      type: string;
      value?: any;
      children?: Array<any>;
    };
    tokens: Array<{
      type: string;
      value: any;
      position: number;
    }>;
    validation: {
      rules: Map<string, (expr: any) => boolean>;
      errors: string[];
    };
  };
  
  evaluation: {
    context: Map<string, any>;
    bindings: Map<string, {
      type: string;
      value: any;
    }>;
    cache: {
      enabled: boolean;
      key: string;
      value: any;
      expires?: number;
    };
  };
  
  optimization: {
    enabled: boolean;
    level: 'none' | 'basic' | 'full';
    rules: Map<string, {
      pattern: any;
      replacement: any;
    }>;
  };
}