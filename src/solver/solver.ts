import { SolverState } from '../../spec/Solver';

export function createSolver(objectiveCell: string, goal: 'maximize' | 'minimize' | 'value'): SolverState {
  return {
    problem: {
      objective: {
        cell: objectiveCell,
        goal,
        targetValue: goal === 'value' ? 0 : undefined
      },
      variables: [],
      constraints: []
    },
    method: {
      type: 'simplex',
      settings: {
        maxTime: 100,
        iterations: 100,
        precision: 0.000001,
        tolerance: 0.000001,
        convergence: 0.0001
      },
      constraints: {
        assumeNonNeg: true,
        assumeLinear: true,
        useAutoScaling: true
      }
    },
    management: {
      loadModel: () => {},
      saveModel: () => '',
      reset: () => {},
      showOptions: true
    }
  };
}

export function addVariable(state: SolverState, cell: string, options?: {
  min?: number;
  max?: number;
  integer?: boolean;
  binary?: boolean;
}): SolverState {
  return {
    ...state,
    problem: {
      ...state.problem,
      variables: [...state.problem.variables, { cell, ...options }]
    }
  };
}

export function addConstraint(state: SolverState, left: string, operator: '<=' | '>=' | '=' | 'int' | 'bin' | 'dif', right: string | number): SolverState {
  return {
    ...state,
    problem: {
      ...state.problem,
      constraints: [...state.problem.constraints, { left, operator, right }]
    }
  };
}