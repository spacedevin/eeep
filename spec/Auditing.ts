export interface AuditingState {
  tracking: {
    changes: Array<{
      id: string;
      type: 'cell' | 'format' | 'structure' | 'formula';
      timestamp: Date;
      user: string;
      location: string;
      before: any;
      after: any;
      metadata?: Map<string, any>;
    }>;
    
    users: Map<string, {
      actions: Array<{
        type: string;
        timestamp: Date;
        target: string;
        details: any;
      }>;
      sessions: Array<{
        start: Date;
        end?: Date;
        duration?: number;
        actions: number;
      }>;
    }>;
  };
  
  validation: {
    rules: Map<string, {
      type: string;
      condition: (value: any) => boolean;
      message: string;
      level: 'error' | 'warning' | 'info';
    }>;
    
    dependencies: Map<string, {
      precedents: Set<string>;
      dependents: Set<string>;
      type: 'direct' | 'indirect';
    }>;
  };
  
  analysis: {
    errors: Array<{
      type: string;
      location: string;
      message: string;
      severity: 'high' | 'medium' | 'low';
    }>;
    
    formulas: Map<string, {
      type: string;
      complexity: number;
      volatility: boolean;
      dependencies: string[];
    }>;
  };
}