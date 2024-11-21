export interface WebQueryState {
  queries: Map<string, {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    params?: Record<string, string>;
    body?: any;
    auth?: {
      type: 'basic' | 'bearer' | 'oauth';
      credentials?: {
        username?: string;
        password?: string;
        token?: string;
      };
    };
  }>;
  
  settings: {
    timeout: number;
    retry: {
      count: number;
      delay: number;
      backoff: 'linear' | 'exponential';
    };
    cache: {
      enabled: boolean;
      duration: number;
      size: number;
    };
  };
  
  processing: {
    extractors: Map<string, (response: any) => any>;
    transforms: Map<string, (data: any) => any>;
    validators: Map<string, (data: any) => boolean>;
  };
}