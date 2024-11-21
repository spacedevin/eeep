export interface WorkbookProtectionState {
  structure: boolean;
  windows: boolean;
  password?: string;
  workbookPassword?: string;
  lockStructure?: boolean;
  lockWindows?: boolean;
  lockRevision?: boolean;
}

export interface WorksheetProtectionState {
  isProtected: boolean;
  password?: string;
  allowSelectLockedCells?: boolean;
  allowSelectUnlockedCells?: boolean;
  allowSort?: boolean;
  allowFilter?: boolean;
  allowResizeRows?: boolean;
  allowResizeColumns?: boolean;
  allowInsertRows?: boolean;
  allowInsertColumns?: boolean;
  allowDeleteRows?: boolean;
  allowDeleteColumns?: boolean;
  allowFormatCells?: boolean;
  allowEditObjects?: boolean;
  allowEditScenarios?: boolean;
}

export interface RangeProtectionState {
  name: string;
  securityDescriptor?: string;
  password?: string;
  title?: string;
  range: string;
  editors?: string[];
}