export interface FunctionDefinition {
  name: string;
  category: 'Math' | 'Statistical' | 'Text' | 'Logical' | 'DateTime' | 'Financial' | 'Lookup' | 'Database' | 'Engineering' | 'Information' | 'Custom';
  description?: string;
  syntax: string;
  parameters: Array<{
    name: string;
    type: 'number' | 'text' | 'boolean' | 'date' | 'range' | 'any';
    description: string;
    optional?: boolean;
    defaultValue?: any;
  }>;
  returns: {
    type: 'number' | 'text' | 'boolean' | 'date' | 'array' | 'error' | 'any';
    description: string;
  };
  volatile?: boolean;
  implementation: (...args: any[]) => any;
  examples?: Array<{
    input: any[];
    output: any;
    description?: string;
  }>;
}

export interface CustomFunctionState {
  name: string;
  fn: (...args: any[]) => any;
  parameters: Array<{
    name: string;
    type: string;
    optional?: boolean;
    defaultValue?: any;
  }>;
  returnType: string;
  isVolatile: boolean;
  cache?: Map<string, any>;
  dependencies?: Set<string>;
  errorHandling?: {
    validateInput?: boolean;
    throwOnError?: boolean;
    defaultValue?: any;
  };
}