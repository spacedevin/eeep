export interface VersionState {
  current: {
    major: number;
    minor: number;
    revision: number;
    build: number;
    timestamp: number;
  };
  
  history: Array<{
    version: string;
    timestamp: number;
    author: string;
    comment: string;
    changes: Array<{
      type: string;
      location: string;
      before: any;
      after: any;
    }>;
  }>;
  
  tracking: {
    enabled: boolean;
    author: string;
    trackFormulas: boolean;
    trackFormatting: boolean;
    highlightChanges: boolean;
  };
  
  changes: Array<{
    id: string;
    type: 'insert' | 'delete' | 'modify';
    location: string;
    author: string;
    timestamp: number;
    status: 'pending' | 'accepted' | 'rejected';
    data: {
      before: any;
      after: any;
    };
  }>;
  
  branches: Map<string, {
    name: string;
    parent: string;
    created: number;
    author: string;
    current: boolean;
  }>;
}