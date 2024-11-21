import { setPivotFieldGrouping, groupPivotData } from '../../pivottables/grouping';
import { createPivotTable } from '../../pivottables/pivottable';

describe('Pivot Table Grouping', () => {
  test('sets field grouping', () => {
    let state = createPivotTable('Sales', 'A1:D10', 'E1');
    state.fields.rows = [{
      sourceField: 'Date',
      name: 'Order Date'
    }];

    state = setPivotFieldGrouping(state, 'rows', 0, {
      type: 'date',
      interval: 30 // Monthly
    });

    expect(state.fields.rows[0].grouping?.type).toBe('date');
    expect(state.fields.rows[0].grouping?.interval).toBe(30);
  });

  test('groups date data', () => {
    const data = [
      { date: '2023-01-01' },
      { date: '2023-01-15' },
      { date: '2023-02-01' }
    ];

    const groups = groupPivotData(data, 'date', {
      type: 'date',
      interval: 30
    });

    expect(groups.size).toBe(2); // Two months
    expect(groups.get('2023-01-01')?.length).toBe(2); // January
    expect(groups.get('2023-02-01')?.length).toBe(1); // February
  });

  test('groups numeric data', () => {
    const data = [
      { value: 5 },
      { value: 15 },
      { value: 25 },
      { value: 35 }
    ];

    const groups = groupPivotData(data, 'value', {
      type: 'number',
      start: 0,
      interval: 10
    });

    expect(groups.size).toBe(4); // 0-10, 10-20, 20-30, 30-40
    expect(groups.get('0-10')?.length).toBe(1);
    expect(groups.get('10-20')?.length).toBe(1);
  });

  test('groups text data', () => {
    const data = [
      { category: 'A' },
      { category: 'B' },
      { category: 'C' },
      { category: 'D' }
    ];

    const groups = groupPivotData(data, 'category', {
      type: 'text',
      items: ['A', 'B', 'C']
    });

    expect(groups.get('A')?.length).toBe(1);
    expect(groups.get('Other')?.length).toBe(1); // 'D' goes to Other
  });

  test('handles invalid field index', () => {
    const state = createPivotTable('Sales', 'A1:D10', 'E1');
    expect(() => setPivotFieldGrouping(state, 'rows', 0, {
      type: 'date'
    })).toThrow();
  });
});
