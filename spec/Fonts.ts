export interface FontState {
  system: {
    defaults: Map<string, {
      name: string;
      family: string;
      fallback: string[];
    }>;
    substitutions: Map<string, string>;
  };

  custom: {
    embedded: Map<string, {
      data: Uint8Array;
      format: 'ttf' | 'otf' | 'woff' | 'woff2';
      subset?: boolean;
    }>;
    web: Map<string, {
      url: string;
      format: string;
      loaded: boolean;
    }>;
  };

  properties: {
    basic: {
      name: string;
      size: number;
      bold?: boolean;
      italic?: boolean;
      color?: string;
      underline?: 'none' | 'single' | 'double' | 'singleAccounting' | 'doubleAccounting';
    };
    advanced?: {
      spacing?: number;
      kerning?: boolean;
      strike?: boolean;
      position?: 'normal' | 'superscript' | 'subscript';
      rotation?: number;
      effects?: {
        outline?: boolean;
        shadow?: boolean;
        glow?: {
          color: string;
          size: number;
        };
      };
    };
  };

  management: {
    loading: {
      async: boolean;
      timeout: number;
      retries: number;
      validation: boolean;
    };
    optimization: {
      subset: boolean;
      compress: boolean;
      cache: {
        enabled: boolean;
        maxSize: number;
        ttl: number;
      };
    };
  };
}