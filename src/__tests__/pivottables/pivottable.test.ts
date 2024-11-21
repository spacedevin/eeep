import {
  createPivotTable,
  addPivotField,
  setPivotTableOptions,
  addCalculatedField,
  refreshPivotTable
} from '../../pivottables/pivottable';

describe('Pivot Table Management', () => {
  test('creates pivot table', () => {
    const pivotTable = createPivotTable('Sales', 'A1:D100', 'E1');
    
    expect(pivotTable.name).toBe('Sales');
    expect(pivotTable.sourceRange).toBe('A1:D100');
    expect(pivotTable.targetCell).toBe('E1');
    expect(pivotTable.fields.rows).toHaveLength(0);
    expect(pivotTable.fields.columns).toHaveLength(0);
    expect(pivotTable.fields.values).toHaveLength(0);
  });

  test('adds row field', () => {
    let pivotTable = createPivotTable('Sales', 'A1:D100', 'E1');
    pivotTable = addPivotField(pivotTable, 'rows', {
      sourceField: 'Category',
      name: 'Product Category',
      subtotals: true,
      showBlankItems: false
    });
    
    expect(pivotTable.fields.rows).toHaveLength(1);
    expect(pivotTable.fields.rows[0].name).toBe('Product Category');
    expect(pivotTable.fields.rows[0].subtotals).toBe(true);
  });

  test('adds column field with sorting', () => {
    let pivotTable = createPivotTable('Sales', 'A1:D100', 'E1');
    pivotTable = addPivotField(pivotTable, 'columns', {
      sourceField: 'Region',
      sort: {
        order: 'ascending',
        customList: ['North', 'South', 'East', 'West']
      }
    });
    
    expect(pivotTable.fields.columns).toHaveLength(1);
    expect(pivotTable.fields.columns[0].sort?.order).toBe('ascending');
    expect(pivotTable.fields.columns[0].sort?.customList).toHaveLength(4);
  });

  test('adds value field with grouping', () => {
    let pivotTable = createPivotTable('Sales', 'A1:D100', 'E1');
    pivotTable = addPivotField(pivotTable, 'values', {
      sourceField: 'Date',
      grouping: {
        type: 'date',
        interval: 1,
        start: new Date('2023-01-01'),
        end: new Date('2023-12-31')
      }
    });
    
    expect(pivotTable.fields.values).toHaveLength(1);
    expect(pivotTable.fields.values[0].grouping?.type).toBe('date');
    expect(pivotTable.fields.values[0].grouping?.interval).toBe(1);
  });

  test('sets pivot table options', () => {
    let pivotTable = createPivotTable('Sales', 'A1:D100', 'E1');
    pivotTable = setPivotTableOptions(pivotTable, {
      layout: {
        form: 'outline',
        showEmptyRows: true
      },
      totals: {
        rows: {
          show: false
        }
      }
    });
    
    expect(pivotTable.options.layout.form).toBe('outline');
    expect(pivotTable.options.layout.showEmptyRows).toBe(true);
    expect(pivotTable.options.totals.rows.show).toBe(false);
  });

  test('adds calculated field', () => {
    let pivotTable = createPivotTable('Sales', 'A1:D100', 'E1');
    pivotTable = addCalculatedField(pivotTable, 'Profit', 'Sales - Cost', {
      showAs: {
        type: 'percentOfTotal'
      },
      numberFormat: '#,##0.00%'
    });
    
    const field = pivotTable.fields.values[0];
    expect(field.sourceField).toBe('Profit');
    expect(field.calculation).toBe('custom');
    expect(field.showAs?.type).toBe('percentOfTotal');
    expect(field.numberFormat).toBe('#,##0.00%');
  });

  test('refreshes pivot table', () => {
    let pivotTable = createPivotTable('Sales', 'A1:D100', 'E1');
    pivotTable = refreshPivotTable(pivotTable);
    
    expect(pivotTable.cache).toBeDefined();
    expect(pivotTable.cache?.refreshDate).toBeInstanceOf(Date);
    expect(pivotTable.cache?.backgroundQuery).toBe(false);
  });

  test('throws error for invalid field type', () => {
    const pivotTable = createPivotTable('Sales', 'A1:D100', 'E1');
    expect(() => addPivotField(pivotTable, 'invalid' as any, {
      sourceField: 'Category'
    })).toThrow();
  });

  test('validates pivot table name', () => {
    expect(() => createPivotTable('', 'A1:D100', 'E1')).toThrow();
    expect(() => createPivotTable('1Sales', 'A1:D100', 'E1')).toThrow();
    expect(() => createPivotTable('Sales-Data', 'A1:D100', 'E1')).toThrow();
  });

  test('validates calculated field name', () => {
    const pivotTable = createPivotTable('Sales', 'A1:D100', 'E1');
    expect(() => addCalculatedField(pivotTable, '', 'Sales - Cost')).toThrow();
    expect(() => addCalculatedField(pivotTable, '1Profit', 'Sales - Cost')).toThrow();
  });

  test('preserves existing options when updating', () => {
    let pivotTable = createPivotTable('Sales', 'A1:D100', 'E1');
    pivotTable = setPivotTableOptions(pivotTable, {
      layout: { form: 'outline' }
    });
    
    expect(pivotTable.options.layout.form).toBe('outline');
    expect(pivotTable.options.layout.showEmptyRows).toBe(false); // Default value preserved
  });

  test('handles multiple fields of same type', () => {
    let pivotTable = createPivotTable('Sales', 'A1:D100', 'E1');
    
    pivotTable = addPivotField(pivotTable, 'rows', {
      sourceField: 'Category'
    });
    
    pivotTable = addPivotField(pivotTable, 'rows', {
      sourceField: 'SubCategory'
    });
    
    expect(pivotTable.fields.rows).toHaveLength(2);
    expect(pivotTable.fields.rows[0].sourceField).toBe('Category');
    expect(pivotTable.fields.rows[1].sourceField).toBe('SubCategory');
  });

  test('handles complex field grouping', () => {
    let pivotTable = createPivotTable('Sales', 'A1:D100', 'E1');
    pivotTable = addPivotField(pivotTable, 'rows', {
      sourceField: 'Amount',
      grouping: {
        type: 'number',
        start: 0,
        end: 1000,
        interval: 100
      }
    });
    
    const field = pivotTable.fields.rows[0];
    expect(field.grouping?.type).toBe('number');
    expect(field.grouping?.start).toBe(0);
    expect(field.grouping