import { GoalSeekState } from '../../../spec/GoalSeek';

export function binarySearch(
  state: GoalSeekState,
  evaluateFunction: (x: number) => number,
  lowerBound: number,
  upperBound: number
): GoalSeekState {
  const { target, method } = state;
  const history: Array<{ iteration: number; value: number; target: number; delta: number }> = [];
  let iteration = 0;
  let found = false;
  let left = lowerBound;
  let right = upperBound;

  while (iteration < method.settings.maxIterations) {
    const mid = (left + right) / 2;
    const fx = evaluateFunction(mid);
    const delta = Math.abs(fx - target.value);

    history.push({
      iteration,
      value: mid,
      target: target.value,
      delta
    });

    if (delta <= method.settings.convergence) {
      found = true;
      break;
    }

    if (fx < target.value) {
      left = mid;
    } else {
      right = mid;
    }

    if (Math.abs(right - left) < method.settings.minStep) {
      break;
    }

    iteration++;
  }

  return {
    ...state,
    results: {
      found,
      iterations: iteration,
      history
    }
  };
}