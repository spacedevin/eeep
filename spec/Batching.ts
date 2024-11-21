export interface BatchingState {
  operations: {
    current?: {
      id: string;
      type: string;
      status: 'pending' | 'executing' | 'completed' | 'failed';
      operations: Array<{
        type: string;
        target: string;
        params: any;
        rollback?: () => void;
      }>;
    };
    
    queue: Array<{
      id: string;
      priority: number;
      dependencies: string[];
      operations: Array<{
        type: string;
        target: string;
        params: any;
      }>;
    }>;
  };
  
  data: {
    imports: Map<string, {
      source: string;
      target: string;
      size: number;
      processed: number;
      validation?: (data: any) => boolean;
    }>;
    
    exports: Map<string, {
      source: string;
      target: string;
      format: string;
      progress: number;
    }>;
  };
  
  execution: {
    parallel: boolean;
    maxConcurrent: number;
    timeout: number;
    retryCount: number;
    
    progress: {
      enabled: boolean;
      interval: number;
      callback?: (progress: number) => void;
    };
  };
}