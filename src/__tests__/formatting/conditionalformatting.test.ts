import {
  createConditionalFormat,
  addFormatRule,
  removeFormatRule,
  createCellValueRule,
  createColorScaleRule,
  createDataBarRule,
  createIconSetRule
} from '../../formatting/conditionalformatting';

describe('Conditional Formatting', () => {
  test('creates conditional format', () => {
    const format = createConditionalFormat();
    expect(format.rules).toHaveLength(0);
    expect(format.options.stopIfTrue).toBe(false);
  });

  test('adds format rule', () => {
    let format = createConditionalFormat();
    const rule = createCellValueRule(
      ['A1:A10'],
      'greaterThan',
      10,
      undefined,
      { font: { bold: true } }
    );
    
    format = addFormatRule(format, rule);
    expect(format.rules).toHaveLength(1);
    expect(format.rules[0].priority).toBe(1);
  });

  test('removes format rule', () => {
    let format = createConditionalFormat();
    format = addFormatRule(format, createCellValueRule(['A1'], 'equal', 1));
    format = addFormatRule(format, createCellValueRule(['B1'], 'equal', 2));
    
    format = removeFormatRule(format, 0);
    expect(format.rules).toHaveLength(1);
    expect(format.rules[0].ranges[0]).toBe('B1');
  });

  test('creates cell value rule', () => {
    const rule = createCellValueRule(
      ['A1:A10'],
      'between',
      0,
      100,
      { font: { color: '#FF0000' } }
    );
    
    expect(rule.type).toBe('cellValue');
    expect(rule.operator).toBe('between');
    expect(rule.value1).toBe(0);
    expect(rule.value2).toBe(100);
  });

  test('creates color scale rule', () => {
    const rule = createColorScaleRule(
      ['A1:A10'],
      { type: 'num', value: 0, color: '#FF0000' },
      { type: 'num', value: 100, color: '#00FF00' },
      { type: 'num', value: 50, color: '#FFFF00' }
    );
    
    expect(rule.type).toBe('colorScale');
    expect(rule.colorScale?.minimum.color).toBe('#FF0000');
    expect(rule.colorScale?.maximum.color).toBe('#00FF00');
    expect(rule.colorScale?.midpoint?.color).toBe('#FFFF00');
  });

  test('creates data bar rule', () => {
    const rule = createDataBarRule(
      ['A1:A10'],
      '#0000FF',
      {
        minLength: 0,
        maxLength: 100,
        showValue: true,
        gradient: true
      }
    );
    
    expect(rule.type).toBe('dataBar');
    expect(rule.dataBar?.color).toBe('#0000FF');
    expect(rule.dataBar?.showValue).toBe(true);
  });

  test('creates icon set rule', () => {
    const rule = createIconSetRule(
      ['A1:A10'],
      '3TrafficLights1',
      [
        { type: 'percent', value: 67, operator: 'greaterThanOrEqual' },
        { type: 'percent', value: 33, operator: 'greaterThanOrEqual' }
      ],
      { showValue: true }
    );
    
    expect(rule.type).toBe('iconSet');
    expect(rule.iconSet?.type).toBe('3TrafficLights1');
    expect(rule.iconSet?.thresholds).toHaveLength(2);
  });
});