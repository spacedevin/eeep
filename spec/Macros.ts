export interface MacroState {
  enabled: boolean;
  security: {
    level: 'disabled' | 'enabled' | 'prompt';
    trustedLocations: string[];
    trustedPublishers: Array<{
      name: string;
      certificate: string;
    }>;
    digitalSignature?: {
      certificate: string;
      timestamp?: Date;
      valid: boolean;
    };
  };
  workbook: {
    auto_open?: string;
    auto_close?: string;
    auto_activate?: string;
    auto_deactivate?: string;
  };
  worksheets: Map<string, {
    calculate?: string;
    change?: string;
    selectionChange?: string;
    beforeDoubleClick?: string;
    beforeRightClick?: string;
  }>;
  ranges: Map<string, {
    change?: string;
    calculate?: string;
    select?: string;
  }>;
  code: {
    modules: Map<string, string>;
    classes: Map<string, string>;
    forms: Map<string, string>;
  };
}