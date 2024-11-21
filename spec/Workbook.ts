export interface WorkbookState {
  properties: {
    title?: string;
    subject?: string;
    author?: string;
    comments?: string;
    keywords?: string[];
    category?: string;
    status?: string;
    version?: string;
    revision?: number;
    created?: Date;
    modified?: Date;
    application?: string;
    applicationVersion?: string;
  };
  
  sheets: Map<string, {
    name: string;
    index: number;
    type: 'worksheet' | 'chartsheet' | 'dialogsheet';
    state: 'visible' | 'hidden' | 'veryhidden';
    color?: string;
  }>;
  
  names: Map<string, {
    name: string;
    comment?: string;
    formula: string;
    refers: string;
    scope?: string;
    visible: boolean;
  }>;
  
  protection: {
    structure?: {
      enabled: boolean;
      password?: string;
    };
    windows?: {
      enabled: boolean;
      password?: string;
    };
    revision?: {
      enabled: boolean;
      password?: string;
    };
    signature?: {
      signed: boolean;
      certificate?: string;
      timestamp?: Date;
    };
  };
}