import {
  calculateShowAs,
  calculatePercentage,
  calculateDifference,
  calculatePercentDifference,
  calculateRunningTotal,
  calculateRank,
  calculateParentPercentage,
  updateCalculations
} from '../../pivottables/calculations';
import { createPivotTable } from '../../pivottables/pivottable';

describe('Pivot Table Calculations', () => {
  describe('Show As Calculations', () => {
    test('sets show as type for value field', () => {
      let state = createPivotTable('Sales', 'A1:D10', 'E1');
      state.fields.values = [{
        sourceField: 'Sales',
        name: 'Sum of Sales',
        calculation: 'sum'
      }];

      state = calculateShowAs(state, 0, 'percentOfTotal');
      expect(state.fields.values[0].showAs?.type).toBe('percentOfTotal');
    });

    test('throws error for invalid field index', () => {
      const state = createPivotTable('Sales', 'A1:D10', 'E1');
      expect(() => calculateShowAs(state, 0, 'percentOfTotal'))
        .toThrow('Value field at index 0 not found');
    });
  });

  describe('Calculation Functions', () => {
    test('calculates percentages', () => {
      const values = [25, 50, 25];
      const total = 100;
      const result = calculatePercentage(values, total);
      expect(result).toEqual([25, 50, 25]);
    });

    test('calculates differences', () => {
      const values = [10, 20, 30];
      const baseValue = 15;
      const result = calculateDifference(values, baseValue);
      expect(result).toEqual([-5, 5, 15]);
    });

    test('calculates percent differences', () => {
      const values = [50, 100, 150];
      const baseValue = 100;
      const result = calculatePercentDifference(values, baseValue);
      expect(result).toEqual([-50, 0, 50]);
    });

    test('calculates running total', () => {
      const values = [10, 20, 30];
      const result = calculateRunningTotal(values);
      expect(result).toEqual([10, 30, 60]);
    });

    test('calculates rank', () => {
      const values = [30, 10, 20];
      const result = calculateRank(values);
      expect(result).toEqual([1, 3, 2]);
    });

    test('calculates parent percentage', () => {
      const values = [50, 30, 20];
      const parentValues = [100, 60, 40];
      const result = calculateParentPercentage(values, parentValues);
      expect(result).toEqual([50, 50, 50]);
    });
  });

  describe('Calculation Updates', () => {
    test('updates calculations for pivot table', () => {
      let state = createPivotTable('Sales', 'A1:D10', 'E1');
      state.fields.values = [{
        sourceField: 'Sales',
        name: 'Sum of Sales',
        calculation: 'sum',
        showAs: {
          type: 'percentOfTotal'
        }
      }];

      state = updateCalculations(state);
      expect(state.fields.values[0].showAs?.type).toBe('percentOfTotal');
    });
  });
});