import { analyzeSensitivity } from '../../../analysis/solver/sensitivity';
import { createSolver, addVariable, addConstraint } from '../../../analysis/solver';

describe('Solver Sensitivity Analysis', () => {
  test('analyzes sensitivity of optimal solution', () => {
    let state = createSolver('A1', 'maximize');
    state = addVariable(state, 'B1', { min: 0 });
    state = addVariable(state, 'B2', { min: 0 });
    state = addConstraint(state, 'B1', '<=', 100);
    state = addConstraint(state, 'B2', '<=', 50);
    
    const result = analyzeSensitivity(state);
    
    expect(result.shadowPrices).toBeDefined();
    expect(result.reducedCosts).toBeDefined();
    expect(result.allowableIncreases).toBeDefined();
    expect(result.allowableDecreases).toBeDefined();
  });

  test('handles infeasible problem', () => {
    let state = createSolver('A1', 'maximize');
    state = addVariable(state, 'B1', { min: 0 });
    state = addConstraint(state, 'B1', '<=', 0);
    state = addConstraint(state, 'B1', '>=', 1);
    
    const result = analyzeSensitivity(state);
    
    expect(result.shadowPrices).toHaveLength(0);
    expect(result.reducedCosts).toHaveLength(0);
  });
});
