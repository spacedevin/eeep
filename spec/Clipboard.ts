export interface ClipboardState {
  content: {
    type: 'cell' | 'range' | 'format' | 'special';
    data: any;
    source: {
      range: string;
      worksheet: string;
      workbook?: string;
    };
    formats: Set<string>;
    timestamp: Date;
  };

  operations: {
    copy: {
      includeFormulas: boolean;
      includeStyles: boolean;
      includeValidation: boolean;
      includeComments: boolean;
    };
    paste: {
      mode: 'all' | 'values' | 'formulas' | 'formats';
      skipBlanks: boolean;
      transpose: boolean;
      linkToSource: boolean;
      validateFirst: boolean;
    };
  };

  formats: {
    supported: Set<string>;
    custom: Map<string, {
      identifier: string;
      handler: {
        copy: (data: any) => any;
        paste: (data: any) => any;
      };
    }>;
  };

  special: {
    operations: Map<string, {
      name: string;
      description: string;
      handler: (source: any, target: any) => void;
    }>;
    options: {
      skipBlanks: boolean;
      transpose: boolean;
      pasteSpecial: {
        formulas: boolean;
        values: boolean;
        formats: boolean;
        comments: boolean;
        validation: boolean;
      };
    };
  };
}