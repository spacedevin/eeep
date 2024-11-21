export interface SearchState {
  query: {
    text: string;
    type: 'text' | 'value' | 'formula' | 'pattern';
    options: {
      caseSensitive: boolean;
      wholeWord: boolean;
      useRegex: boolean;
      searchFormulas: boolean;
    };
  };

  scope: {
    range?: string;
    sheets: string[];
    direction: 'forward' | 'backward' | 'all';
    includeHidden: boolean;
  };

  results: {
    matches: Array<{
      cell: string;
      sheet: string;
      value: any;
      formula?: string;
      context?: string;
    }>;
    current: number;
    total: number;
    timestamp: Date;
  };

  replace?: {
    text: string;
    confirmEach: boolean;
    preserveCase: boolean;
    preserveFormat: boolean;
    history: Array<{
      cell: string;
      before: any;
      after: any;
      timestamp: Date;
    }>;
  };
}