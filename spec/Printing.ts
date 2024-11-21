export interface PrintingState {
  setup: {
    paperSize: number;
    orientation: 'portrait' | 'landscape';
    margins: {
      top: number;
      right: number;
      bottom: number;
      left: number;
      header: number;
      footer: number;
      center: boolean;
    };
    scaling: {
      mode: 'percentage' | 'fitTo';
      percentage?: number;
      fitToWidth?: number;
      fitToHeight?: number;
    };
  };

  areas: {
    ranges: string[];
    titles: {
      rows?: string;
      columns?: string;
    };
    order: 'downThenOver' | 'overThenDown';
    quality: {
      dpi: number;
      draft: boolean;
      blackAndWhite: boolean;
    };
  };

  headerFooter: {
    differentFirst: boolean;
    differentOddEven: boolean;
    sections: {
      first?: {
        header?: string;
        footer?: string;
      };
      odd?: {
        header?: string;
        footer?: string;
      };
      even?: {
        header?: string;
        footer?: string;
      };
    };
    fields: {
      pageNumber: boolean;
      numberOfPages: boolean;
      date: boolean;
      time: boolean;
      fileName: boolean;
      sheetName: boolean;
    };
  };

  options: {
    gridLines: boolean;
    rowColumnHeadings: boolean;
    comments: 'none' | 'atEnd' | 'asDisplayed';
    errors: 'displayed' | 'blank' | 'dash' | 'NA';
    cellQuality: 'draft' | 'standard' | 'high';
  };
}