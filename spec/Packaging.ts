export interface PackagingState {
  structure: {
    parts: Map<string, {
      uri: string;
      contentType: string;
      compression: boolean;
      relationships: Array<{
        id: string;
        type: string;
        target: string;
        targetMode: 'Internal' | 'External';
      }>;
    }>;
    contentTypes: {
      defaults: Map<string, string>;
      overrides: Map<string, string>;
    };
  };
  
  operations: {
    validation: {
      validateParts: boolean;
      validateRelationships: boolean;
      validateContentTypes: boolean;
    };
    compression: {
      enabled: boolean;
      level: number;
    };
  };
  
  customization: {
    parts: Map<string, {
      handler: (data: any) => any;
      contentType: string;
    }>;
    relationships: Map<string, {
      type: string;
      handler: (data: any) => any;
    }>;
  };
}