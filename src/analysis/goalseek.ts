import { GoalSeekState } from '../../spec/GoalSeek';

export function createGoalSeek(cell: string, targetValue: number): GoalSeekState {
  return {
    target: {
      cell,
      value: targetValue,
      tolerance: 0.0001
    },
    variable: {
      cell: '',
      initial: 0
    },
    method: {
      type: 'newton',
      settings: {
        maxIterations: 100,
        maxStep: 1,
        minStep: 0.000001,
        convergence: 0.0001,
        tolerance: 0.0001
      }
    },
    results: {
      found: false,
      iterations: 0,
      history: []
    },
    validation: {
      validateInput: true,
      validateResult: true
    }
  };
}

export function setGoalSeekVariable(state: GoalSeekState, cell: string, initial: number): GoalSeekState {
  return {
    ...state,
    variable: {
      cell,
      initial
    }
  };
}

export function calculateGoalSeek(state: GoalSeekState): GoalSeekState {
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

function evaluateFunction(x: number): number {
  // Placeholder for actual function evaluation
  // In a real implementation, this would evaluate the formula in the target cell
  return x;
}