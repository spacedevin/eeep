import { GoalSeekState } from '../../spec/GoalSeek';

export function createGoalSeek(cell: string, targetValue: number): GoalSeekState {
  return {
    target: {
      cell,
      value: targetValue,
      tolerance: 0.0001
    },
    variable: {
      cell: '',
      initial: 0
    },
    method: {
      type: 'newton',
      settings: {
        maxIterations: 100,
        maxStep: 1,
        minStep: 0.000001,
        convergence: 0.0001,
        tolerance: 0.0001
      }
    },
    results: {
      found: false,
      iterations: 0,
      history: []
    },
    validation: {
      validateInput: true,
      validateResult: true
    }
  };
}