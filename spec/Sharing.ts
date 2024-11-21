export interface SharingState {
  enabled: boolean;
  
  users: Map<string, {
    name: string;
    email?: string;
    permissions: Set<'read' | 'write' | 'delete' | 'admin'>;
    lastAccess?: Date;
    history: Array<{
      action: string;
      timestamp: Date;
      target: string;
    }>;
  }>;
  
  changes: Array<{
    id: string;
    user: string;
    action: 'modify' | 'insert' | 'delete';
    location: string;
    timestamp: Date;
    value: {
      before: any;
      after: any;
    };
    status: 'pending' | 'accepted' | 'rejected';
  }>;
  
  protection: {
    ranges: Map<string, {
      users: string[];
      password?: string;
      permissions: Set<'select' | 'format' | 'edit'>;
    }>;
    sheets: Map<string, {
      users: string[];
      password?: string;
      options: Set<'objects' | 'scenarios' | 'format'>;
    }>;
  };
  
  conflicts: {
    resolution: 'lastWins' | 'userPriority' | 'manual';
    history: Array<{
      id: string;
      users: string[];
      timestamp: Date;
      resolution: string;
    }>;
  };
}