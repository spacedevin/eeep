export interface ZoomState {
  view: {
    current: number;
    mode: 'percentage' | 'fitWidth' | 'fitHeight' | 'custom';
    limits: {
      min: number;
      max: number;
      default: number;
      step: number;
    };
    animation: {
      enabled: boolean;
      duration: number;
      timing: 'linear' | 'ease' | 'bounce';
    };
  };

  print: {
    scale: number;
    mode: 'fitToPages' | 'custom';
    pages: {
      width: number;
      height: number;
    };
    preview: {
      enabled: boolean;
      scale: number;
      showBreaks: boolean;
    };
  };

  display: {
    gridLines: boolean;
    headers: boolean;
    formulas: boolean;
    comments: boolean;
    zeroes: boolean;
  };

  events: {
    onZoomStart?: (oldZoom: number, newZoom: number) => void;
    onZoomEnd?: (oldZoom: number, newZoom: number) => void;
    onZoomChange?: (zoom: number) => void;
  };
}