import { WhatIfState } from '../../spec/WhatIf';

export function createWhatIf(target: { cell: string; value: number }): WhatIfState {
  return {
    goalSeek: {
      target,
      variable: {
        cell: '',
        initial: 0
      },
      settings: {
        maxIterations: 100,
        maxChange: 0.001,
        precision: 0.0001
      }
    },
    dataTables: {
      type: 'oneVariable',
      formula: {
        cell: '',
        range: ''
      },
      inputs: {},
      results: []
    },
    scenarios: new Map(),
    management: {
      current: undefined,
      summary: undefined,
      settings: {
        preventChanges: false,
        showAlert: true,
        includeHidden: false
      }
    }
  };
}

export function addScenario(
  state: WhatIfState,
  name: string,
  changingCells: Array<{ cell: string; value: any }>,
  resultCells: string[]
): WhatIfState {
  const newScenarios = new Map(state.scenarios);
  newScenarios.set(name, {
    name,
    changingCells,
    resultCells,
    protected: false,
    hidden: false
  });

  return {
    ...state,
    scenarios: newScenarios
  };
}

export function switchScenario(state: WhatIfState, name: string): WhatIfState {
  if (!state.scenarios.has(name)) {
    throw new Error(`Scenario '${name}' not found`);
  }

  return {
    ...state,
    management: {
      ...state.management,
      current: name
    }
  };
}