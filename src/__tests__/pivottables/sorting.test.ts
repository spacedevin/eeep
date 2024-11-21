import { setPivotFieldSort, sortPivotData } from '../../pivottables/sorting';
import { createPivotTable } from '../../pivottables/pivottable';

describe('Pivot Table Sorting', () => {
  test('sets field sort order', () => {
    let state = createPivotTable('Sales', 'A1:D10', 'E1');
    state.fields.rows = [{
      sourceField: 'Category',
      name: 'Product Category'
    }];

    state = setPivotFieldSort(state, 'rows', 0, {
      order: 'ascending',
      customList: ['A', 'B', 'C']
    });

    expect(state.fields.rows[0].sort?.order).toBe('ascending');
    expect(state.fields.rows[0].sort?.customList).toEqual(['A', 'B', 'C']);
  });

  test('sorts data in ascending order', () => {
    const data = [
      { category: 'C' },
      { category: 'A' },
      { category: 'B' }
    ];

    const sorted = sortPivotData(data, 'category', 'ascending');
    expect(sorted[0].category).toBe('A');
    expect(sorted[1].category).toBe('B');
    expect(sorted[2].category).toBe('C');
  });

  test('sorts data by custom list', () => {
    const data = [
      { category: 'C' },
      { category: 'A' },
      { category: 'B' },
      { category: 'D' }
    ];

    const customList = ['B', 'A', 'C'];
    const sorted = sortPivotData(data, 'category', 'ascending', customList);
    expect(sorted[0].category).toBe('B');
    expect(sorted[1].category).toBe('A');
    expect(sorted[2].category).toBe('C');
    expect(sorted[3].category).toBe('D');
  });

  test('handles invalid field index', () => {
    const state = createPivotTable('Sales', 'A1:D10', 'E1');
    expect(() => setPivotFieldSort(state, 'rows', 0, {
      order: 'ascending'
    })).toThrow();
  });
});
