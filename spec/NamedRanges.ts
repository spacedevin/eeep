export interface NamedRangeState {
  name: string;
  reference: string;
  scope: 'Workbook' | 'Worksheet';
  worksheet?: string;
  comment?: string;
  isHidden?: boolean;
  formula?: {
    text: string;
    isDynamic: boolean;
    isArray: boolean;
  };
  validation?: {
    nameRules: {
      maxLength: number;
      allowedCharacters: RegExp;
      reservedNames: string[];
    };
    referenceRules: {
      allowedTypes: Array<'cell' | 'range' | 'formula' | '3D'>;
      maxSize?: number;
    };
  };
}

export interface NamedRangeCollection {
  ranges: Map<string, NamedRangeState>;
  operations: {
    create(name: string, reference: string, options?: {
      scope?: 'Workbook' | 'Worksheet';
      worksheet?: string;
      comment?: string;
      isHidden?: boolean;
      formula?: string;
    }): NamedRangeState;
    get(name: string, scope?: 'Workbook' | 'Worksheet', worksheet?: string): NamedRangeState;
    update(name: string, updates: Partial<NamedRangeState>): void;
    delete(name: string, scope?: 'Workbook' | 'Worksheet', worksheet?: string): void;
    exists(name: string, scope?: 'Workbook' | 'Worksheet', worksheet?: string): boolean;
    validate(name: string, reference: string): boolean;
  };
  events: {
    onBeforeCreate?: (range: NamedRangeState) => boolean;
    onAfterCreate?: (range: NamedRangeState) => void;
    onBeforeUpdate?: (range: NamedRangeState, updates: Partial<NamedRangeState>) => boolean;
    onAfterUpdate?: (range: NamedRangeState) => void;
    onBeforeDelete?: (range: NamedRangeState) => boolean;
    onAfterDelete?: (range: NamedRangeState) => void;
  };
}