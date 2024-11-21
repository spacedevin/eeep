import { SolverState } from '../../../spec/Solver';

type ConstraintOperator = '<=' | '>=' | '=' | 'int' | 'bin' | 'dif';

export function validateConstraints(state: SolverState): boolean {
  for (const constraint of state.problem.constraints) {
    if (!isValidConstraint(constraint)) {
      return false;
    }
  }
  return true;
}

function isValidConstraint(constraint: any): boolean {
  if (!constraint.left || !constraint.operator || constraint.right === undefined) {
    return false;
  }

  const validOperators: ConstraintOperator[] = ['<=', '>=', '=', 'int', 'bin', 'dif'];
  if (!validOperators.includes(constraint.operator as ConstraintOperator)) {
    return false;
  }

  if (['<=', '>=', '='].includes(constraint.operator)) {
    if (typeof constraint.right !== 'number' && typeof constraint.right !== 'string') {
      return false;
    }
  }

  return true;
}

export function normalizeConstraints(state: SolverState): SolverState {
  const normalizedConstraints = state.problem.constraints.map(constraint => {
    if (constraint.operator === '>=') {
      return {
        left: constraint.left,
        operator: '<=' as ConstraintOperator,
        right: typeof constraint.right === 'number' ? -constraint.right : `-${constraint.right}`
      };
    }
    return constraint;
  });

  return {
    ...state,
    problem: {
      ...state.problem,
      constraints: normalizedConstraints
    }
  };
}