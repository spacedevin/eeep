import { newtonMethod } from '../../../analysis/goalseek/newton';
import { createGoalSeek, setGoalSeekVariable } from '../../../analysis/goalseek';

describe('Newton Method', () => {
  test('finds solution for quadratic function', () => {
    let state = createGoalSeek('A1', 16);
    state = setGoalSeekVariable(state, 'B1', 2);

    // f(x) = x^2
    const evaluateFunction = (x: number) => x * x;

    state = newtonMethod(state, evaluateFunction);
    
    expect(state.results.found).toBe(true);
    expect(state.results.history[state.results.history.length - 1].value).toBeCloseTo(4, 2);
  });

  test('handles non-convergent case', () => {
    let state = createGoalSeek('A1', -1);
    state = setGoalSeekVariable(state, 'B1', 1);

    // f(x) = x^2 + 1 (no real solution for f(x) = -1)
    const evaluateFunction = (x: number) => x * x + 1;

    state = newtonMethod(state, evaluateFunction);
    
    expect(state.results.found).toBe(false);
    expect(state.results.iterations).toBe(state.method.settings.maxIterations);
  });

  test('respects convergence criteria', () => {
    let state = createGoalSeek('A1', 2);
    state = setGoalSeekVariable(state, 'B1', 1);
    state.method.settings.convergence = 0.1;

    // f(x) = x
    const evaluateFunction = (x: number) => x;

    state = newtonMethod(state, evaluateFunction);
    
    expect(state.results.found).toBe(true);
    const finalDelta = state.results.history[state.results.history.length - 1].delta;
    expect(finalDelta).toBeLessThanOrEqual(0.1);
  });
});