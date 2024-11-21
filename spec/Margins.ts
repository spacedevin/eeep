export interface MarginState {
  sheet: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    header: number;
    footer: number;
    units: 'inches' | 'centimeters' | 'points';
  };

  cells: Map<string, {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    auto?: boolean;
  }>;

  settings: {
    mode: 'fixed' | 'auto' | 'mixed';
    constraints: {
      minTop?: number;
      maxTop?: number;
      minBottom?: number;
      maxBottom?: number;
      minLeft?: number;
      maxLeft?: number;
      minRight?: number;
      maxRight?: number;
    };
    defaults: {
      cell: number;
      header: number;
      footer: number;
    };
  };

  calculations: {
    type: 'fixed' | 'content' | 'percentage' | 'dynamic';
    rules: Array<{
      target: string;
      condition: string;
      calculation: string;
    }>;
    cache: Map<string, {
      value: number;
      timestamp: number;
    }>;
  };
}