import {
  createTableStyle,
  addStyleElement,
  setTableStyleOptions,
  setPivotStyle
} from '../../formatting/tablestyles';

describe('Table Style Management', () => {
  test('creates table style', () => {
    const style = createTableStyle('CustomTable');
    expect(style.name).toBe('CustomTable');
    expect(style.pivot).toBe(false);
    expect(style.table).toBe(true);
    expect(style.elements).toHaveLength(0);
  });

  test('adds style element', () => {
    let style = createTableStyle('CustomTable');
    style = addStyleElement(style, 'headerRow', {
      font: { bold: true },
      fill: { type: 'pattern', color: '#CCCCCC' }
    });
    
    expect(style.elements).toHaveLength(1);
    expect(style.elements[0].type).toBe('headerRow');
    expect(style.elements[0].style.font.bold).toBe(true);
  });

  test('sets table style options', () => {
    let style = createTableStyle('CustomTable');
    style = setTableStyleOptions(style, {
      showFirstColumn: true,
      showRowStripes: true
    });
    
    expect(style.showFirstColumn).toBe(true);
    expect(style.showRowStripes).toBe(true);
  });

  test('sets pivot style flag', () => {
    let style = createTableStyle('CustomPivot');
    style = setPivotStyle(style, true);
    
    expect(style.pivot).toBe(true);
    expect(style.table).toBe(false);
  });

  test('adds stripe style elements', () => {
    let style = createTableStyle('StripedTable');
    style = addStyleElement(style, 'firstRowStripe', {
      fill: { type: 'pattern', color: '#EEEEEE' }
    }, 2);
    
    expect(style.elements[0].type).toBe('firstRowStripe');
    expect(style.elements[0].size).toBe(2);
  });
});