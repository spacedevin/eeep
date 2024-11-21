import { solveNonlinear, calculateGradient } from '../../../analysis/solver/nonlinear';
import { createSolver, addVariable, addConstraint } from '../../../analysis/solver';

describe('Nonlinear Solver', () => {
  test('solves nonlinear problem', () => {
    let state = createSolver('A1', 'maximize');
    state = addVariable(state, 'B1', { min: 0 });
    state = addVariable(state, 'B2', { min: 0 });
    
    const result = solveNonlinear(state);
    expect(result).toBeDefined();
  });

  test('calculates gradient', () => {
    let state = createSolver('A1', 'maximize');
    state = addVariable(state, 'B1', { min: 0 });
    state = addVariable(state, 'B2', { min: 0 });
    
    const point = [1, 1];
    const gradient = calculateGradient(state, point);
    
    expect(gradient).toHaveLength(2);
    expect(gradient.every(x => typeof x === 'number')).toBe(true);
  });
});