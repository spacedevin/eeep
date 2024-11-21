export interface CustomXMLPartState {
  parts: Map<string, {
    id: string;
    type: 'core' | 'custom' | 'schema' | 'template';
    content: string;
    namespace: string;
    contentType: string;
    relationships: Array<{
      id: string;
      type: string;
      target: string;
      targetMode?: 'Internal' | 'External';
    }>;
  }>;

  management: {
    validation: {
      validateOnAdd: boolean;
      validateOnModify: boolean;
      schemaValidation: boolean;
    };
    namespaces: Map<string, {
      prefix: string;
      uri: string;
      schema?: string;
    }>;
  };

  operations: {
    query: {
      xpath: boolean;
      namespaces: boolean;
      cache: boolean;
    };
    transform: {
      enabled: boolean;
      stylesheets: Map<string, string>;
    };
  };

  schema: {
    validation: {
      mode: 'strict' | 'lax';
      cacheSchemas: boolean;
    };
    generation: {
      enabled: boolean;
      annotations: boolean;
      documentation: boolean;
    };
  };
}