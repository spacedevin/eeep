export interface LockingState {
  cells: Map<string, {
    locked: boolean;
    type: 'full' | 'partial' | 'formula' | 'format';
    permissions?: Set<'select' | 'format' | 'edit' | 'delete'>;
    users?: string[];
    password?: string;
  }>;

  sheets: Map<string, {
    structure: boolean;
    windows: boolean;
    objects: boolean;
    scenarios: boolean;
    protection: {
      password?: string;
      hash?: string;
      algorithm?: string;
    };
    exceptions?: {
      ranges: string[];
      users: string[];
      permissions: Set<string>;
    };
  }>;

  inheritance: {
    enabled: boolean;
    rules: Map<string, {
      source: string;
      target: string;
      properties: string[];
    }>;
  };

  validation: {
    checkPermissions: boolean;
    validatePasswords: boolean;
    enforceInheritance: boolean;
  };
}