export interface GoalSeekState {
  target: {
    cell: string;
    value: number;
    tolerance: number;
  };

  variable: {
    cell: string;
    initial: number;
    min?: number;
    max?: number;
    step?: number;
  };

  method: {
    type: 'newton' | 'binary' | 'custom';
    settings: {
      maxIterations: number;
      maxStep: number;
      minStep: number;
      convergence: number;
      tolerance: number;
    };
    custom?: {
      evaluate: (x: number) => number;
      next: (current: number, target: number) => number;
    };
  };

  results: {
    found: boolean;
    value?: number;
    iterations: number;
    error?: number;
    history: Array<{
      iteration: number;
      value: number;
      target: number;
      delta: number;
    }>;
  };

  validation: {
    validateInput: boolean;
    validateResult: boolean;
    constraints?: Array<{
      type: 'range' | 'custom';
      check: (value: number) => boolean;
    }>;
  };
}