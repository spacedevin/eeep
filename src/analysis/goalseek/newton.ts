import { GoalSeekState } from '../../../spec/GoalSeek';

export function newtonMethod(
  state: GoalSeekState,
  evaluateFunction: (x: number) => number
): GoalSeekState {
  const { target, variable, method } = state;
  const history: Array<{ iteration: number; value: number; target: number; delta: number }> = [];
  let currentValue = variable.initial;
  let iteration = 0;
  let found = false;

  while (iteration < method.settings.maxIterations) {
    const fx = evaluateFunction(currentValue);
    const delta = Math.abs(fx - target.value);
    
    history.push({
      iteration,
      value: currentValue,
      target: target.value,
      delta
    });

    if (delta <= method.settings.convergence) {
      found = true;
      break;
    }

    // Calculate derivative using central difference
    const h = method.settings.minStep;
    const derivative = (evaluateFunction(currentValue + h) - evaluateFunction(currentValue - h)) / (2 * h);

    if (Math.abs(derivative) < method.settings.tolerance) {
      break;
    }

    // Newton's step with limits
    const step = Math.min(
      method.settings.maxStep,
      Math.max(method.settings.minStep, delta / derivative)
    );

    currentValue = currentValue - step;
    iteration++;
  }

  return {
    ...state,
    results: {
      found,
      value: currentValue,
      iterations: iteration,
      history
    }
  };
}