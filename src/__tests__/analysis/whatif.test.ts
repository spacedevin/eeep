import {
  createWhatIf,
  addScenario,
  switchScenario
} from '../../analysis/whatif';

describe('What-If Analysis', () => {
  test('creates what-if state', () => {
    const state = createWhatIf({ cell: 'A1', value: 100 });
    expect(state.goalSeek.target.cell).toBe('A1');
    expect(state.goalSeek.target.value).toBe(100);
    expect(state.scenarios.size).toBe(0);
  });

  test('adds scenario', () => {
    let state = createWhatIf({ cell: 'A1', value: 100 });
    state = addScenario(
      state,
      'Best Case',
      [{ cell: 'B1', value: 200 }],
      ['C1']
    );
    
    expect(state.scenarios.size).toBe(1);
    const scenario = state.scenarios.get('Best Case');
    expect(scenario?.changingCells).toHaveLength(1);
    expect(scenario?.resultCells).toHaveLength(1);
  });

  test('switches scenario', () => {
    let state = createWhatIf({ cell: 'A1', value: 100 });
    state = addScenario(
      state,
      'Best Case',
      [{ cell: 'B1', value: 200 }],
      ['C1']
    );
    state = switchScenario(state, 'Best Case');
    
    expect(state.management.current).toBe('Best Case');
  });

  test('throws error for invalid scenario switch', () => {
    let state = createWhatIf({ cell: 'A1', value: 100 });
    expect(() => switchScenario(state, 'Invalid')).toThrow();
  });

  test('adds multiple scenarios', () => {
    let state = createWhatIf({ cell: 'A1', value: 100 });
    state = addScenario(
      state,
      'Best Case',
      [{ cell: 'B1', value: 200 }],
      ['C1']
    );
    state = addScenario(
      state,
      'Worst Case',
      [{ cell: 'B1', value: 50 }],
      ['C1']
    );
    
    expect(state.scenarios.size).toBe(2);
    expect(state.scenarios.has('Best Case')).toBe(true);
    expect(state.scenarios.has('Worst Case')).toBe(true);
  });
});