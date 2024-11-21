import {
  createGoalSeek,
  setGoalSeekVariable,
  calculateGoalSeek
} from '../../analysis/goalseek';

describe('Goal Seek', () => {
  test('creates goal seek state', () => {
    const state = createGoalSeek('A1', 100);
    expect(state.target.cell).toBe('A1');
    expect(state.target.value).toBe(100);
    expect(state.variable.cell).toBe('');
  });

  test('sets variable cell', () => {
    let state = createGoalSeek('A1', 100);
    state = setGoalSeekVariable(state, 'B1', 0);
    
    expect(state.variable.cell).toBe('B1');
    expect(state.variable.initial).toBe(0);
  });

  test('calculates goal seek result', () => {
    let state = createGoalSeek('A1', 100);
    state = setGoalSeekVariable(state, 'B1', 0);
    state = calculateGoalSeek(state);
    
    expect(state.results.iterations).toBeGreaterThan(0);
    expect(state.results.history.length).toBeGreaterThan(0);
  });

  test('handles convergence', () => {
    let state = createGoalSeek('A1', 100);
    state = setGoalSeekVariable(state, 'B1', 90);
    state = calculateGoalSeek(state);
    
    expect(state.results.found).toBe(true);
    expect(state.results.iterations).toBeLessThan(state.method.settings.maxIterations);
  });

  test('handles non-convergence', () => {
    let state = createGoalSeek('A1', 100);
    state = setGoalSeekVariable(state, 'B1', -1000);
    state = calculateGoalSeek(state);
    
    expect(state.results.found).toBe(false);
    expect(state.results.iterations).toBe(state.method.settings.maxIterations);
  });
});