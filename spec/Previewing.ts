export interface PreviewState {
  type: 'print' | 'data';
  
  print: {
    layout: {
      showPageBreaks: boolean;
      showMargins: boolean;
      showRulers: boolean;
      showGrid: boolean;
    };
    view: {
      zoom: number;
      currentPage: number;
      totalPages: number;
      facing: boolean;
    };
    navigation: {
      mode: 'single' | 'continuous' | 'facing';
      allowZoom: boolean;
      allowPan: boolean;
      shortcuts: boolean;
    };
  };

  data: {
    cell: {
      showFormulas: boolean;
      showValues: boolean;
      showNotes: boolean;
      showErrors: boolean;
    };
    visual: {
      charts: boolean;
      images: boolean;
      shapes: boolean;
      comments: boolean;
    };
    tooltips: {
      enabled: boolean;
      delay: number;
      content: Set<'value' | 'formula' | 'note' | 'error'>;
    };
  };

  options: {
    refreshMode: 'auto' | 'manual';
    cacheSize: number;
    quality: 'draft' | 'normal' | 'high';
    background: boolean;
  };
}