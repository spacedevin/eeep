import { FileSourceType } from '../src/external/types';

export interface ExternalDataState {
  sources: {
    web: Map<string, {
      type: 'rest' | 'soap' | 'graphql' | 'odata';
      endpoint: string;
      auth?: {
        type: 'basic' | 'bearer' | 'oauth2';
        credentials: {
          username?: string;
          password?: string;
          token?: string;
          clientId?: string;
          clientSecret?: string;
        };
      };
      headers?: Record<string, string>;
      parameters?: Record<string, any>;
    }>;

    file: Map<string, {
      type: FileSourceType;
      path: string;
      options: {
        encoding?: BufferEncoding;
        delimiter?: string;
        hasHeader?: boolean;
        schema?: any;
        dateFormat?: string;
        parserOptions?: Record<string, any>;
      };
    }>;
  };

  processing: {
    cache: {
      enabled: boolean;
      duration: number;
      size: number;
      strategy: 'lru' | 'fifo';
    };
    pagination: {
      enabled: boolean;
      pageSize: number;
      maxPages?: number;
      parameters: {
        page?: string;
        size?: string;
        offset?: string;
      };
    };
    rateLimit: {
      enabled: boolean;
      requests: number;
      interval: number;
      delay: number;
    };
  };

  transformation: {
    mappings: Map<string, {
      source: string;
      target: string;
      transform?: (value: any) => any;
    }>;
    validation: Array<{
      field: string;
      rules: Array<{
        type: string;
        params: any[];
        message: string;
      }>;
    }>;
    error: {
      handling: 'skip' | 'fail' | 'default';
      defaultValues: Map<string, any>;
      logging: boolean;
    };
  };
}