import { WorksheetState } from '../worksheet/types';

export interface WorkbookProperties {
  title?: string;
  subject?: string;
  author?: string;
  comments?: string;
  keywords?: string;
  category?: string;
  status?: string;
  created?: Date;
  modified?: Date;
  application?: string;
  applicationVersion?: string;
}

export interface WorkbookProtection {
  password?: string;
  structure?: boolean;
  windows?: 'hidden' | 'veryHidden' | 'visible';
}

export interface WorkbookState {
  sheets: Map<string, WorksheetState>;
  properties: WorkbookProperties;
  protection: WorkbookProtection;
  definedNames: Map<string, string>;
  externalReferences: Map<string, string>;
}