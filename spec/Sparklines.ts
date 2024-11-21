export interface SparklineState {
  type: 'line' | 'column' | 'winLoss' | 'area';
  dataRange: string;
  locationRange: string;
  dateAxis?: string;
  
  style?: {
    lineColor?: string;
    markerColor?: string;
    highPoint?: {
      color?: string;
      visible?: boolean;
    };
    lowPoint?: {
      color?: string;
      visible?: boolean;
    };
    firstPoint?: {
      color?: string;
      visible?: boolean;
    };
    lastPoint?: {
      color?: string;
      visible?: boolean;
    };
    negativePoint?: {
      color?: string;
      visible?: boolean;
    };
    markers?: {
      visible?: boolean;
      size?: number;
    };
  };

  axis?: {
    min?: number;
    max?: number;
    minScaled?: boolean;
    maxScaled?: boolean;
    rightToLeft?: boolean;
  };

  display?: {
    empty: 'gaps' | 'zero' | 'connect';
    hidden: boolean;
    showMarkers: boolean;
    lineWeight?: number;
    displayXAxis?: boolean;
  };

  group?: {
    groupId?: string;
    syncAxis?: boolean;
    syncColor?: boolean;
    syncSize?: boolean;
  };
}

export interface SparklineGroupState {
  id: string;
  type: 'line' | 'column' | 'winLoss' | 'area';
  sparklines: SparklineState[];
  style: {
    lineColor?: string;
    markerColor?: string;
    highPoint?: {
      color?: string;
      visible?: boolean;
    };
    lowPoint?: {
      color?: string;
      visible?: boolean;
    };
    firstPoint?: {
      color?: string;
      visible?: boolean;
    };
    lastPoint?: {
      color?: string;
      visible?: boolean;
    };
    negativePoint?: {
      color?: string;
      visible?: boolean;
    };
  };
  display: {
    empty: 'gaps' | 'zero' | 'connect';
    hidden: boolean;
    showMarkers: boolean;
    lineWeight?: number;
    displayXAxis?: boolean;
  };
}