export interface ExtensibilityState {
  plugins: Map<string, {
    name: string;
    version: string;
    enabled: boolean;
    dependencies: string[];
    config: any;
    lifecycle: {
      init?: () => void;
      destroy?: () => void;
    };
  }>;
  
  functions: Map<string, {
    name: string;
    category: string;
    parameters: Array<{
      name: string;
      type: string;
      optional?: boolean;
      default?: any;
    }>;
    returns: {
      type: string;
      description: string;
    };
    implementation: (...args: any[]) => any;
  }>;
  
  formats: Map<string, {
    name: string;
    type: 'number' | 'date' | 'text' | 'custom';
    format: string | ((value: any) => string);
    parse?: (value: string) => any;
  }>;
  
  validation: Map<string, {
    name: string;
    rule: (value: any) => boolean;
    message: string | ((value: any) => string);
    parameters?: any;
  }>;
}