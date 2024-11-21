export interface TransactionState {
  id: string;
  status: 'active' | 'committed' | 'rolledBack';
  
  operations: Array<{
    type: 'cell' | 'range' | 'style' | 'formula';
    target: string;
    before: any;
    after: any;
    timestamp: number;
  }>;
  
  batch?: {
    enabled: boolean;
    size: number;
    timeout: number;
    operations: Array<{
      id: string;
      status: 'pending' | 'completed' | 'failed';
    }>;
  };
  
  isolation: {
    level: 'readCommitted' | 'readUncommitted' | 'repeatableRead' | 'serializable';
    timeout: number;
    retryCount: number;
  };
  
  checkpoints: Array<{
    id: string;
    timestamp: number;
    operations: number[];
  }>;
  
  errors: Array<{
    code: string;
    message: string;
    operation: string;
    handled: boolean;
  }>;
}