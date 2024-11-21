export interface VersionControlState {
  version: {
    major: number;
    minor: number;
    revision: number;
    build: number;
    timestamp: Date;
    author: string;
  };

  history: Array<{
    version: string;
    timestamp: Date;
    author: string;
    changes: Array<{
      type: string;
      description: string;
      location: string;
      before: any;
      after: any;
    }>;
    metadata?: Map<string, any>;
  }>;

  tracking: {
    enabled: boolean;
    mode: 'all' | 'major' | 'minor';
    retention: {
      maxVersions: number;
      maxAge?: number;
      minVersions: number;
    };
  };

  management: {
    compare: {
      enabled: boolean;
      ignoreFormatting: boolean;
      ignoreSpaces: boolean;
      ignoreCase: boolean;
    };
    merge: {
      strategy: 'latest' | 'manual' | 'selective';
      conflictResolution: 'keep' | 'override' | 'prompt';
      validation: boolean;
    };
    rollback: {
      enabled: boolean;
      createBackup: boolean;
      validateState: boolean;
    };
  };
}