import { optimizeSolution, checkFeasibility, findInitialSolution } from '../../../analysis/solver/optimization';
import { createSolver, addVariable, addConstraint } from '../../../analysis/solver';

describe('Solver Optimization', () => {
  test('checks feasibility', () => {
    let state = createSolver('A1', 'maximize');
    state = addVariable(state, 'B1', { min: 0 });
    state = addConstraint(state, 'B1', '<=', 100);
    
    expect(checkFeasibility(state)).toBe(true);
  });

  test('finds initial solution', () => {
    let state = createSolver('A1', 'maximize');
    state = addVariable(state, 'B1', { min: 0 });
    state = addConstraint(state, 'B1', '<=', 100);
    
    const initialState = findInitialSolution(state);
    expect(initialState).toBeDefined();
  });

  test('optimizes solution', () => {
    let state = createSolver('A1', 'maximize');
    state = addVariable(state, 'B1', { min: 0 });
    state = addConstraint(state, 'B1', '<=', 100);
    
    const optimizedState = optimizeSolution(state);
    expect(optimizedState).toBeDefined();
  });
});
