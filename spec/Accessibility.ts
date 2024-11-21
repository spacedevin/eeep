export interface AccessibilityState {
  screenReader: {
    enabled: boolean;
    elements: Map<string, {
      altText: string;
      ariaLabel?: string;
      ariaDescribedBy?: string;
      role?: string;
      readingOrder?: number;
    }>;
    navigation: {
      landmarks: string[];
      skipLinks: Map<string, string>;
      announcements: string[];
    };
  };

  keyboard: {
    focusable: Set<string>;
    tabOrder: string[];
    shortcuts: Map<string, {
      key: string;
      action: string;
      description: string;
    }>;
    selection: {
      mode: 'single' | 'multiple' | 'range';
      indicators: boolean;
    };
  };

  visual: {
    contrast: {
      mode: 'normal' | 'high' | 'custom';
      ratio: number;
      customColors?: Map<string, string>;
    };
    scaling: {
      enabled: boolean;
      factor: number;
      minSize: number;
      maxSize: number;
    };
    indicators: {
      focus: boolean;
      selection: boolean;
      errors: boolean;
      required: boolean;
    };
  };
}