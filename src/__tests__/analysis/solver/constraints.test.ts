import { validateConstraints, normalizeConstraints } from '../../../analysis/solver/constraints';
import { createSolver, addConstraint } from '../../../analysis/solver';

describe('Solver Constraints', () => {
  test('validates valid constraints', () => {
    let state = createSolver('A1', 'maximize');
    state = addConstraint(state, 'B1', '<=', 100);
    state = addConstraint(state, 'B2', '>=', 0);
    
    expect(validateConstraints(state)).toBe(true);
  });

  test('validates invalid operator', () => {
    let state = createSolver('A1', 'maximize');
    state = addConstraint(state, 'B1', '<=' as any, 100);
    state.problem.constraints.push({
      left: 'B2',
      operator: 'invalid',
      right: 0
    });
    
    expect(validateConstraints(state)).toBe(false);
  });

  test('validates invalid right-hand side', () => {
    let state = createSolver('A1', 'maximize');
    state = addConstraint(state, 'B1', '<=', {} as any);
    
    expect(validateConstraints(state)).toBe(false);
  });

  test('normalizes greater-than constraints', () => {
    let state = createSolver('A1', 'maximize');
    state = addConstraint(state, 'B1', '>=', 100);
    
    state = normalizeConstraints(state);
    const constraint = state.problem.constraints[0];
    
    expect(constraint.operator).toBe('<=');
    expect(constraint.right).toBe(-100);
  });

  test('preserves other constraints during normalization', () => {
    let state = createSolver('A1', 'maximize');
    state = addConstraint(state, 'B1', '<=', 100);
    state = addConstraint(state, 'B2', '>=', 50);
    
    state = normalizeConstraints(state);
    
    expect(state.problem.constraints[0].operator).toBe('<=');
    expect(state.problem.constraints[0].right).toBe(100);
    expect(state.problem.constraints[1].operator).toBe('<=');
    expect(state.problem.constraints[1].right).toBe(-50);
  });
});