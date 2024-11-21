export interface GroupingState {
  rows: Map<number, {
    level: number;
    parent?: number;
    children: number[];
    collapsed: boolean;
    summary?: {
      position: 'above' | 'below';
      formula?: string;
    };
  }>;

  columns: Map<number, {
    level: number;
    parent?: number;
    children: number[];
    collapsed: boolean;
    summary?: {
      position: 'left' | 'right';
      formula?: string;
    };
  }>;

  settings: {
    maxLevels: number;
    defaultCollapsed: boolean;
    showLevelButtons: boolean;
    styles: Map<number, {
      indent?: number;
      font?: any;
      fill?: any;
      border?: any;
    }>;
  };

  operations: {
    onCollapse?: (group: any) => void;
    onExpand?: (group: any) => void;
    beforeGrouping?: (range: string) => boolean;
    afterGrouping?: (group: any) => void;
  };
}