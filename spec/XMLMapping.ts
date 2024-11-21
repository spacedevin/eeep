export interface XMLMappingState {
  elements: Map<string, {
    path: string;
    type: 'simple' | 'complex' | 'attribute' | 'mixed';
    binding: {
      target: string;
      direction: 'oneWay' | 'twoWay';
      autoUpdate: boolean;
      format?: string;
    };
    validation?: {
      required: boolean;
      type: string;
      pattern?: string;
      enumeration?: string[];
    };
  }>;

  ranges: Map<string, {
    type: 'cell' | 'range' | 'table' | 'dynamic';
    mapping: {
      root: string;
      repeating?: string;
      fields: Map<string, {
        path: string;
        format?: string;
      }>;
    };
    options: {
      headers: boolean;
      skipEmpty: boolean;
      transpose: boolean;
    };
  }>;

  namespaces: {
    default?: string;
    custom: Map<string, {
      prefix: string;
      uri: string;
      schema?: string;
    }>;
    resolution: {
      mode: 'static' | 'dynamic';
      resolver?: (prefix: string) => string;
    };
  };

  management: {
    refresh: {
      mode: 'manual' | 'auto';
      interval?: number;
    };
    cache: {
      enabled: boolean;
      duration: number;
    };
    errors: {
      handling: 'throw' | 'log' | 'ignore';
      validation: boolean;
    };
  };
}