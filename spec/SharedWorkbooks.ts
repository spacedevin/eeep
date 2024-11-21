export interface SharedWorkbookState {
  sharing: {
    enabled: boolean;
    mode: 'exclusive' | 'shared';
    users: Array<{
      id: string;
      name: string;
      email?: string;
      access: {
        type: 'read' | 'write' | 'admin';
        ranges?: string[];
        features?: Set<string>;
      };
      status: 'active' | 'inactive';
      lastAccess?: Date;
    }>;
  };

  tracking: {
    enabled: boolean;
    history: Array<{
      id: string;
      user: string;
      type: 'cell' | 'structure' | 'format' | 'review';
      timestamp: Date;
      changes: Array<{
        location: string;
        before: any;
        after: any;
      }>;
      status: 'pending' | 'accepted' | 'rejected';
    }>;
    settings: {
      keepHistory: number;
      trackFormulas: boolean;
      trackFormatting: boolean;
      highlightChanges: boolean;
    };
  };

  protection: {
    password?: string;
    allowedUsers: Set<string>;
    restrictions: {
      structure: boolean;
      windows: boolean;
      ranges: Map<string, {
        users: string[];
        permissions: Set<string>;
      }>;
    };
    features: Map<string, {
      enabled: boolean;
      users?: string[];
    }>;
  };

  collaboration: {
    conflicts: {
      resolution: 'lastWrite' | 'userPriority' | 'merge';
      handler?: (conflict: any) => any;
    };
    merge: {
      enabled: boolean;
      strategy: 'automatic' | 'manual';
      rules: Map<string, (a: any, b: any) => any>;
    };
    notifications: {
      enabled: boolean;
      events: Set<'change' | 'conflict' | 'access' | 'review'>;
      handler?: (event: any) => void;
    };
  };
}