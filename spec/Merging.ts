export interface MergingState {
  cells: Map<string, {
    range: string;
    type: 'simple' | 'complex' | 'conditional' | 'dynamic';
    masterCell: string;
    content: {
      value?: any;
      formula?: string;
      style?: any;
    };
    format: {
      alignment?: 'left' | 'center' | 'right' | 'justify';
      verticalAlignment?: 'top' | 'middle' | 'bottom';
      wrapText?: boolean;
    };
  }>;

  operations: {
    validation: {
      allowOverlap: boolean;
      maxSize?: number;
      preserveContent: boolean;
    };
    handlers: {
      beforeMerge?: (range: string) => boolean;
      afterMerge?: (range: string) => void;
      beforeSplit?: (range: string) => boolean;
      afterSplit?: (range: string) => void;
    };
  };

  styles: {
    borders: {
      outer?: any;
      inner?: any;
      remove?: boolean;
    };
    inheritance: {
      source: 'master' | 'first' | 'custom';
      properties: string[];
    };
  };
}