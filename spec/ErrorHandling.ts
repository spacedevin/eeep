export interface ErrorHandlingState {
  calculationErrors: {
    divisionByZero: 'error' | 'zero' | 'infinity' | 'custom';
    notAvailable: 'error' | 'blank' | 'custom';
    invalidName: 'error' | 'blank' | 'custom';
    nullReference: 'error' | 'blank' | 'custom';
    numericError: 'error' | 'blank' | 'custom';
    invalidReference: 'error' | 'blank' | 'custom';
    invalidValue: 'error' | 'blank' | 'custom';
  };
  
  operationErrors: {
    fileAccess: {
      retry: boolean;
      maxRetries: number;
      timeout: number;
      fallback?: string;
    };
    memoryLimits: {
      warning: number;
      error: number;
      action: 'throw' | 'cleanup' | 'save';
    };
    formatErrors: {
      action: 'skip' | 'default' | 'throw';
      logLevel: 'none' | 'warning' | 'error';
    };
  };
  
  customErrors: Map<string, {
    condition: string;
    message: string;
    severity: 'info' | 'warning' | 'error';
    action?: string;
  }>;
  
  recovery: {
    enabled: boolean;
    maxAttempts: number;
    timeout: number;
    cleanup: boolean;
    logging: boolean;
  };
}