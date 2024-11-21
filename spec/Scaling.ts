export interface ScalingState {
  print: {
    mode: 'fitToWidth' | 'fitToHeight' | 'fitToPage' | 'custom';
    settings: {
      width?: number;
      height?: number;
      scale?: number;
      maintainAspect: boolean;
    };
    limits: {
      minScale: number;
      maxScale: number;
      defaultScale: number;
    };
  };

  view: {
    zoom: {
      level: number;
      mode: 'percentage' | 'selection' | 'pageWidth' | 'wholePage';
      selection?: string;
    };
    settings: {
      defaultZoom: number;
      minZoom: number;
      maxZoom: number;
      zoomStep: number;
    };
  };

  content: {
    autoFit: {
      enabled: boolean;
      mode: 'width' | 'height' | 'both';
      constraints: {
        minWidth?: number;
        maxWidth?: number;
        minHeight?: number;
        maxHeight?: number;
      };
    };
    resize: {
      proportional: boolean;
      anchor: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'center';
      snap: boolean;
      gridSize?: number;
    };
  };

  operations: {
    calculation: {
      precision: number;
      roundingMode: 'up' | 'down' | 'nearest';
    };
    validation: {
      enabled: boolean;
      rules: Map<string, (scale: number) => boolean>;
    };
  };
}