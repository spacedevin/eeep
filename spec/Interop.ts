export interface InteropState {
  import: {
    formats: Map<string, {
      extension: string;
      mimeType: string;
      encoding?: string;
      options?: {
        delimiter?: string;
        hasHeader?: boolean;
        skipRows?: number;
        dateFormat?: string;
      };
      handler: (data: any) => any;
    }>;
    validation: {
      enabled: boolean;
      rules: Map<string, (data: any) => boolean>;
      errorHandling: 'skip' | 'stop' | 'default';
    };
  };
  
  export: {
    formats: Map<string, {
      extension: string;
      mimeType: string;
      encoding?: string;
      options?: {
        delimiter?: string;
        includeHeader?: boolean;
        dateFormat?: string;
        sheetSelection?: string[];
      };
      handler: (data: any) => any;
    }>;
    streaming: {
      enabled: boolean;
      chunkSize: number;
      bufferSize: number;
    };
  };
  
  conversion: {
    mappings: Map<string, {
      source: string;
      target: string;
      transform?: (value: any) => any;
    }>;
    defaults: Map<string, any>;
  };
}