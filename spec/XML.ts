export interface XMLState {
  parts: Map<string, {
    id: string;
    content: string;
    namespace: string;
    schema?: string;
    validation: {
      enabled: boolean;
      schema?: string;
      namespaces: Map<string, string>;
    };
  }>;

  mapping: {
    elements: Map<string, {
      xpath: string;
      target: string;
      type: 'cell' | 'range' | 'table' | 'list';
      options: {
        twoWay: boolean;
        refresh: 'auto' | 'manual';
        format?: string;
      };
    }>;
    namespaces: Map<string, {
      prefix: string;
      uri: string;
      schema?: string;
    }>;
  };

  schema: {
    validation: {
      enabled: boolean;
      mode: 'strict' | 'lax';
      cacheSchemas: boolean;
    };
    generation: {
      enabled: boolean;
      options: {
        includeAnnotations: boolean;
        elementForm: 'qualified' | 'unqualified';
        attributeForm: 'qualified' | 'unqualified';
      };
    };
  };

  operations: {
    binding: {
      mode: 'immediate' | 'deferred';
      validation: boolean;
      errorHandling: 'throw' | 'ignore' | 'log';
    };
    cache: {
      enabled: boolean;
      maxSize: number;
      timeout: number;
    };
  };
}