export interface WhatIfState {
  goalSeek: {
    target: {
      cell: string;
      value: number;
    };
    variable: {
      cell: string;
      initial: number;
    };
    settings: {
      maxIterations: number;
      maxChange: number;
      precision: number;
    };
    result?: {
      found: boolean;
      value: number;
      iterations: number;
      error?: string;
    };
  };

  dataTables: {
    type: 'oneVariable' | 'twoVariable';
    formula: {
      cell: string;
      range: string;
    };
    inputs: {
      row?: {
        cell: string;
        values: number[];
      };
      column?: {
        cell: string;
        values: number[];
      };
    };
    results: Array<Array<number>>;
  };

  scenarios: Map<string, {
    name: string;
    comment?: string;
    changingCells: Array<{
      cell: string;
      value: any;
    }>;
    resultCells: string[];
    protected: boolean;
    hidden: boolean;
  }>;

  management: {
    current?: string;
    summary?: {
      location: string;
      resultCells: string[];
      type: 'scenario' | 'pivot';
    };
    settings: {
      preventChanges: boolean;
      showAlert: boolean;
      includeHidden: boolean;
    };
  };
}