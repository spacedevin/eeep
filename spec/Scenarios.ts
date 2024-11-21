export interface ScenarioState {
  scenarios: Map<string, {
    name: string;
    comment?: string;
    changingCells: Array<{
      cell: string;
      value: any;
      original: any;
    }>;
    resultCells: string[];
    protected: boolean;
    hidden: boolean;
    category?: string;
  }>;

  analysis: {
    type: 'whatIf' | 'sensitivity' | 'monteCarlo' | 'custom';
    settings: {
      iterations?: number;
      samples?: number;
      confidence?: number;
      distribution?: string;
    };
    results?: {
      summary: any[][];
      statistics: Map<string, any>;
      charts?: any[];
    };
  };

  management: {
    current?: string;
    reports: {
      scenario: {
        location: string;
        showValues: boolean;
        includeCharts: boolean;
      };
      sensitivity: {
        variables: string[];
        outputs: string[];
        type: 'linear' | 'nonlinear';
      };
    };
    protection: {
      password?: string;
      allowEdit: boolean;
      allowDelete: boolean;
      allowView: boolean;
    };
  };

  events: {
    onBeforeChange?: (scenario: string) => boolean;
    onAfterChange?: (scenario: string) => void;
    onBeforeDelete?: (scenario: string) => boolean;
    onAfterDelete?: (scenario: string) => void;
  };
}