export interface MetadataState {
  core: {
    title?: string;
    subject?: string;
    creator?: string;
    keywords?: string[];
    category?: string;
    status?: string;
    version?: string;
    revision?: number;
    language?: string;
    identifier?: string;
    contentType?: string;
  };
  
  custom: Map<string, {
    name: string;
    value: any;
    type: 'text' | 'number' | 'date' | 'boolean';
    linkSource?: string;
    linkType?: string;
  }>;
  
  statistics: {
    created?: Date;
    modified?: Date;
    lastAccessed?: Date;
    lastPrinted?: Date;
    totalEditTime?: number;
    lastModifiedBy?: string;
  };
  
  application: {
    name?: string;
    version?: string;
    company?: string;
    manager?: string;
    docSecurity?: number;
    scaleCrop?: boolean;
    linksUpToDate?: boolean;
    sharedDoc?: boolean;
    hyperlinksChanged?: boolean;
  };
}