export interface XMLDataBindingState {
  bindings: Map<string, {
    type: 'cell' | 'range' | 'element' | 'attribute';
    source: {
      xpath: string;
      namespace?: string;
      type: string;
    };
    target: {
      reference: string;
      type: string;
      format?: string;
    };
    direction: 'oneWay' | 'twoWay';
    update: 'auto' | 'manual';
  }>;

  mapping: {
    types: Map<string, {
      sourceType: string;
      targetType: string;
      converter?: (value: any) => any;
    }>;
    formats: Map<string, {
      pattern: string;
      culture?: string;
    }>;
    custom: Map<string, {
      toXml: (value: any) => string;
      fromXml: (xml: string) => any;
    }>;
  };

  validation: {
    schema: {
      enabled: boolean;
      mode: 'strict' | 'lax';
    };
    types: {
      validateSource: boolean;
      validateTarget: boolean;
      coerce: boolean;
    };
  };

  operations: {
    load: {
      validateFirst: boolean;
      clearExisting: boolean;
      errorHandling: 'throw' | 'skip' | 'default';
    };
    save: {
      validateFirst: boolean;
      format: boolean;
      indent: boolean;
    };
    refresh: {
      mode: 'full' | 'changes';
      cascade: boolean;
    };
  };

  management: {
    namespaces: Map<string, {
      prefix: string;
      uri: string;
    }>;
  };
}