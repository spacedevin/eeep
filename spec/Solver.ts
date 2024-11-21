export interface SolverState {
  problem: {
    objective: {
      cell: string;
      goal: 'maximize' | 'minimize' | 'value';
      targetValue?: number;
    };
    variables: Array<{
      cell: string;
      min?: number;
      max?: number;
      integer?: boolean;
      binary?: boolean;
    }>;
    constraints: Array<{
      left: string;
      operator: '<=' | '>=' | '=' | 'int' | 'bin' | 'dif';
      right: string | number;
    }>;
  };

  method: {
    type: 'simplex' | 'grg' | 'evolutionary';
    settings: {
      maxTime: number;
      iterations: number;
      precision: number;
      tolerance: number;
      convergence: number;
    };
    constraints: {
      assumeNonNeg: boolean;
      assumeLinear: boolean;
      useAutoScaling: boolean;
    };
  };

  solution?: {
    status: 'optimal' | 'feasible' | 'infeasible' | 'unbounded' | 'timeout';
    value: number;
    iterations: number;
    time: number;
    reports: {
      answer: boolean;
      sensitivity: boolean;
      limits: boolean;
    };
  };

  management: {
    loadModel: (model: string) => void;
    saveModel: () => string;
    reset: () => void;
    showOptions: boolean;
  };
}