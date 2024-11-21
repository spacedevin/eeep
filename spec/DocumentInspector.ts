export interface DocumentInspectorState {
  inspections: {
    content: {
      comments: boolean;
      hiddenContent: boolean;
      personalInfo: boolean;
      customData: boolean;
      results: Map<string, Array<{
        type: string;
        location: string;
        description: string;
        risk: 'low' | 'medium' | 'high';
      }>>;
    };
    
    properties: {
      document: boolean;
      custom: boolean;
      hidden: boolean;
      system: boolean;
      findings: Map<string, {
        name: string;
        value: any;
        category: string;
        removable: boolean;
      }>;
    };

    security: {
      signatures: boolean;
      encryption: boolean;
      permissions: boolean;
      tracking: boolean;
      issues: Array<{
        type: string;
        severity: 'info' | 'warning' | 'critical';
        description: string;
        recommendation: string;
      }>;
    };
  };

  cleanup: {
    operations: Map<string, {
      name: string;
      description: string;
      action: () => void;
      reversible: boolean;
    }>;
    
    settings: {
      backupBeforeCleanup: boolean;
      confirmActions: boolean;
      logOperations: boolean;
    };

    history: Array<{
      operation: string;
      timestamp: Date;
      success: boolean;
      details?: string;
    }>;
  };
}