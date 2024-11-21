import { binarySearch } from '../../../analysis/goalseek/binary';
import { createGoalSeek, setGoalSeekVariable } from '../../../analysis/goalseek';

describe('Binary Search', () => {
  test('finds solution in range', () => {
    let state = createGoalSeek('A1', 16);
    state = setGoalSeekVariable(state, 'B1', 2);

    // f(x) = x^2
    const evaluateFunction = (x: number) => x * x;

    state = binarySearch(state, evaluateFunction, 0, 10);
    
    expect(state.results.found).toBe(true);
    expect(state.results.history[state.results.history.length - 1].value).toBeCloseTo(4, 2);
  });

  test('handles solution at boundary', () => {
    let state = createGoalSeek('A1', 0);
    state = setGoalSeekVariable(state, 'B1', 1);

    // f(x) = x
    const evaluateFunction = (x: number) => x;

    state = binarySearch(state, evaluateFunction, 0, 10);
    
    expect(state.results.found).toBe(true);
    expect(state.results.history[state.results.history.length - 1].value).toBeCloseTo(0, 2);
  });

  test('handles no solution in range', () => {
    let state = createGoalSeek('A1', -1);
    state = setGoalSeekVariable(state, 'B1', 0);

    // f(x) = x^2 + 1 (no solution for f(x) = -1)
    const evaluateFunction = (x: number) => x * x + 1;

    state = binarySearch(state, evaluateFunction, 0, 10);
    
    expect(state.results.found).toBe(false);
  });

  test('respects minimum step size', () => {
    let state = createGoalSeek('A1', 2);
    state = setGoalSeekVariable(state, 'B1', 0);
    state.method.settings.minStep = 0.1;

    // f(x) = x
    const evaluateFunction = (x: number) => x;

    state = binarySearch(state, evaluateFunction, 0, 10);
    
    const lastTwo = state.results.history.slice(-2);
    const finalStepSize = Math.abs(lastTwo[1].value - lastTwo[0].value);
    expect(finalStepSize).toBeGreaterThanOrEqual(0.1);
  });
});