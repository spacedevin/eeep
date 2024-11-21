export interface SerializationState {
  type: 'binary' | 'xml' | 'json' | 'custom';
  
  types: {
    mappings: Map<string, {
      sourceType: string;
      targetType: string;
      converter?: (value: any) => any;
    }>;
    resolution: {
      assemblies: string[];
      namespaces: string[];
      aliases: Map<string, string>;
    };
  };
  
  handlers: {
    serializers: Map<string, {
      canHandle: (type: string) => boolean;
      serialize: (value: any) => any;
      deserialize: (data: any) => any;
    }>;
    validators: Map<string, (value: any) => boolean>;
    transformers: Map<string, (value: any) => any>;
  };
  
  options: {
    ignoreNull: boolean;
    ignoreDefaults: boolean;
    preserveReferences: boolean;
    maxDepth: number;
  };
}