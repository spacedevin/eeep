export interface UndoState {
  enabled: boolean;
  maxSize: number;
  
  history: {
    undo: Array<{
      id: string;
      type: string;
      timestamp: number;
      description: string;
      group?: string;
      data: any;
    }>;
    redo: Array<{
      id: string;
      type: string;
      timestamp: number;
      description: string;
      group?: string;
      data: any;
    }>;
  };
  
  tracking: {
    enabled: boolean;
    skipTypes: string[];
    mergeRules: Array<{
      type: string;
      condition: (a: any, b: any) => boolean;
      merge: (a: any, b: any) => any;
    }>;
  };
  
  groups: Map<string, {
    name: string;
    actions: string[];
    timestamp: number;
    complete: boolean;
  }>;
  
  options: {
    groupSimilar: boolean;
    maxGroupSize: number;
    clearOnSave: boolean;
    trackProtected: boolean;
  };
}