export interface StructuredReferenceState {
  reference: {
    table: string;
    column?: string;
    item?: '@' | '#All' | '#Data' | '#Headers' | '#Totals' | '#This Row';
    operator?: 'sum' | 'average' | 'count' | 'custom';
    range?: {
      start?: string;
      end?: string;
    };
  };

  syntax: {
    format: 'modern' | 'legacy';
    validation: {
      validateNames: boolean;
      caseSensitive: boolean;
      allowSpaces: boolean;
    };
    parsing: {
      delimiter: string;
      escapeChar: string;
      specialItems: Set<string>;
    };
  };

  resolution: {
    mode: 'static' | 'dynamic';
    cache: {
      enabled: boolean;
      duration: number;
    };
    context: {
      currentRow?: number;
      currentColumn?: string;
      scope?: string;
    };
  };

  tracking: {
    dependencies: Map<string, Set<string>>;
    updates: {
      onTableChange: boolean;
      onColumnRename: boolean;
      onStructureChange: boolean;
    };
    validation: {
      checkReferences: boolean;
      checkCircular: boolean;
      checkScope: boolean;
    };
  };
}