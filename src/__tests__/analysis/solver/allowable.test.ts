import { calculateAllowableRanges } from '../../../analysis/solver/allowable';
import { createSolver, addVariable, addConstraint } from '../../../analysis/solver';

describe('Solver Allowable Ranges', () => {
  test('calculates ranges for simple problem', () => {
    let state = createSolver('A1', 'maximize');
    state = addVariable(state, 'B1', { min: 0 });
    state = addVariable(state, 'B2', { min: 0 });
    state = addConstraint(state, 'B1', '<=', 100);
    state = addConstraint(state, 'B2', '<=', 50);
    
    const ranges = calculateAllowableRanges(state);
    
    expect(ranges.objective).toBeDefined();
    expect(ranges.constraints).toBeDefined();
    expect(ranges.objective).toHaveLength(2);
    expect(ranges.constraints).toHaveLength(2);
  });

  test('handles unbounded ranges', () => {
    let state = createSolver('A1', 'maximize');
    state = addVariable(state, 'B1', { min: 0 });
    state = addConstraint(state, 'B1', '<=', 100);
    
    const ranges = calculateAllowableRanges(state);
    
    expect(ranges.objective[0].increase).toBe(Infinity);
    expect(ranges.constraints[0].increase).toBe(Infinity);
  });

  test('handles infeasible problem', () => {
    let state = createSolver('A1', 'maximize');
    state = addVariable(state, 'B1', { min: 0 });
    state = addConstraint(state, 'B1', '<=', 0);
    state = addConstraint(state, 'B1', '>=', 1);
    
    const ranges = calculateAllowableRanges(state);
    
    expect(ranges.objective).toHaveLength(1);
    expect(ranges.constraints).toHaveLength(2);
  });
});
