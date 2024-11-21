export interface MergedCellState {
  range: string;
  type: 'row' | 'column' | 'rectangular' | 'irregular';
  properties: {
    contentAlignment?: {
      horizontal?: 'left' | 'center' | 'right' | 'justify';
      vertical?: 'top' | 'middle' | 'bottom';
    };
    borderHandling?: 'preserve' | 'merge' | 'clear';
    styleInheritance?: 'topLeft' | 'none' | 'custom';
  };
  content?: {
    value?: any;
    formula?: string;
    style?: any;
  };
  validation?: {
    allowOverlap?: boolean;
    maxSize?: {
      rows?: number;
      columns?: number;
    };
    preserveContent?: boolean;
  };
}

export interface MergedCellCollection {
  merges: Map<string, MergedCellState>;
  options: {
    defaultAlignment: {
      horizontal: 'left' | 'center' | 'right' | 'justify';
      vertical: 'top' | 'middle' | 'bottom';
    };
    defaultBorderHandling: 'preserve' | 'merge' | 'clear';
    defaultStyleInheritance: 'topLeft' | 'none' | 'custom';
    validation: {
      maxMergeSize: number;
      allowOverlap: boolean;
      preserveContent: boolean;
    };
  };
  operations: {
    findByCell(cell: string): MergedCellState | undefined;
    findByRange(range: string): MergedCellState[];
    getMergedRanges(): string[];
    validateMerge(range: string): boolean;
  };
}