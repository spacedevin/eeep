export interface DatabaseState {
  connections: Map<string, {
    id: string;
    type: 'sqlserver' | 'oracle' | 'mysql' | 'postgresql' | 'sqlite';
    settings: {
      connectionString: string;
      timeout: number;
      pooling: boolean;
      maxPoolSize?: number;
    };
    auth: {
      type: 'windows' | 'sql' | 'token';
      credentials?: {
        username?: string;
        password?: string;
        token?: string;
      };
    };
    status: 'connected' | 'disconnected' | 'error';
  }>;

  queries: Map<string, {
    type: 'sql' | 'stored_procedure';
    text: string;
    parameters?: Array<{
      name: string;
      type: string;
      value: any;
      direction?: 'input' | 'output' | 'inputOutput';
    }>;
    options: {
      timeout: number;
      commandType?: string;
      transaction?: boolean;
    };
  }>;

  operations: {
    import: {
      mode: 'bulk' | 'incremental';
      mapping: Map<string, {
        source: string;
        target: string;
        transform?: (value: any) => any;
      }>;
      validation: {
        enabled: boolean;
        rules: Array<{
          field: string;
          rule: (value: any) => boolean;
        }>;
      };
    };
    export: {
      format: 'excel' | 'csv' | 'json';
      options: {
        includeHeaders: boolean;
        dateFormat?: string;
        numberFormat?: string;
      };
    };
  };

  error: {
    retry: {
      enabled: boolean;
      maxAttempts: number;
      delay: number;
    };
    logging: {
      enabled: boolean;
      level: 'error' | 'warning' | 'info';
    };
  };
}