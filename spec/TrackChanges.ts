export interface TrackChangesState {
  enabled: boolean;
  
  changes: Array<{
    id: string;
    type: 'content' | 'structure';
    subtype: string;
    author: string;
    timestamp: Date;
    location: string;
    content: {
      before: any;
      after: any;
    };
    status: 'pending' | 'accepted' | 'rejected';
  }>;

  tracking: {
    authors: Map<string, {
      name: string;
      color: string;
      lastChange: Date;
    }>;
    history: {
      maxEntries: number;
      keepRejected: boolean;
      compress: boolean;
    };
    highlight: {
      enabled: boolean;
      colors: Map<string, string>;
      showAuthors: boolean;
    };
  };

  management: {
    review: {
      current: number;
      filtered: boolean;
      showAccepted: boolean;
      showRejected: boolean;
    };
    merge: {
      strategy: 'sequential' | 'parallel';
      conflictResolution: 'accept' | 'reject' | 'prompt';
    };
    notifications: {
      onChange: boolean;
      onAccept: boolean;
      onReject: boolean;
    };
  };
}