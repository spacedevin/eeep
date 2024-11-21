export interface PageBreakState {
  horizontal: Array<{
    row: number;
    type: 'manual' | 'automatic';
    visible?: boolean;
    properties?: {
      keepTogether?: boolean;
      splitAllowed?: boolean;
      forceBreak?: boolean;
    };
  }>;
  vertical: Array<{
    column: number;
    type: 'manual' | 'automatic';
    visible?: boolean;
    properties?: {
      keepTogether?: boolean;
      splitAllowed?: boolean;
      forceBreak?: boolean;
    };
  }>;
  ranges: Array<{
    range: string;
    type: 'manual' | 'automatic';
    direction: 'horizontal' | 'vertical';
    visible?: boolean;
    properties?: {
      keepTogether?: boolean;
      splitAllowed?: boolean;
      forceBreak?: boolean;
    };
  }>;
  options: {
    view: 'normal' | 'pageBreakPreview' | 'pageLayout';
    showBreaks: boolean;
    fitToPage?: boolean;
    scaleToFit?: boolean;
    paperSize?: number;
  };
}

export interface PageBreakCollection {
  breaks: PageBreakState;
  defaultProperties: {
    keepTogether: boolean;
    splitAllowed: boolean;
    forceBreak: boolean;
  };
  view: {
    mode: 'normal' | 'pageBreakPreview' | 'pageLayout';
    zoom: number;
    showBreaks: boolean;
  };
}