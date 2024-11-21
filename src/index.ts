// Core functionality
export { ExcelPackage } from './excelpackage';
export { WorksheetCollection } from './worksheetcollection';

// Workbook features
export * from './workbook';

// Worksheet features
export * from './worksheet';

// Data features
export * from './data';

// Formatting and styles
export * from './formatting';

// Drawing and visualization
export * from './drawing';

// XML and data binding
export * from './xml';

// Security and protection
export * from './security';

// Advanced features
export * from './streaming';

// Analysis features
export * from './analysis';

// Shared functionality
export * from './shared';

// Type exports
export type { CellStyle, Font, Border } from './interfaces/cellstyle';
export type { PageSetup, PageMargins } from './interfaces/pagesetup';

// Re-export spec types with explicit naming
export { ValidationState as DataValidationState } from '../spec/DataValidation';
export { ValidationState as ValidationRuleState } from '../spec/Validation';
export { MetadataState as DocumentMetadataState } from '../spec/Metadata';
export { MetadataState as PackageMetadataState } from '../spec/SharedFeatures';