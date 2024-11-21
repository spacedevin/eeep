export interface CustomFunctionState {
  functions: Map<string, {
    name: string;
    category: string;
    description: string;
    syntax: string;
    parameters: Array<{
      name: string;
      type: string;
      description: string;
      optional?: boolean;
      defaultValue?: any;
      validation?: (value: any) => boolean;
    }>;
    returns: {
      type: string;
      description: string;
    };
    implementation: (...args: any[]) => any;
    volatile?: boolean;
    async?: boolean;
  }>;

  categories: Map<string, {
    name: string;
    description: string;
    priority: number;
    functions: string[];
  }>;

  management: {
    registration: {
      validateFunction: boolean;
      allowOverride: boolean;
      preserveCase: boolean;
    };
    execution: {
      maxTimeout: number;
      cacheResults: boolean;
      validateArgs: boolean;
    };
    dependencies: Map<string, Set<string>>;
  };

  validation: {
    parameters: {
      checkTypes: boolean;
      checkNull: boolean;
      checkRange: boolean;
    };
    results: {
      validateType: boolean;
      allowNull: boolean;
      customValidation?: (result: any) => boolean;
    };
    errors: {
      handling: 'throw' | 'return' | 'default';
      defaultValue?: any;
      logging: boolean;
    };
  };
}