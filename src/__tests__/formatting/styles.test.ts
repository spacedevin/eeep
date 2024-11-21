import {
  createStyle,
  setFont,
  setFill,
  setBorder,
  setAlignment,
  setNumberFormat,
  setProtection
} from '../../formatting/styles';

describe('Style Management', () => {
  test('creates empty style', () => {
    const style = createStyle();
    expect(style.name).toBeUndefined();
    expect(style.font).toBeUndefined();
    expect(style.fill).toBeUndefined();
    expect(style.border).toBeUndefined();
    expect(style.alignment).toBeUndefined();
    expect(style.numberFormat).toBeUndefined();
    expect(style.protection).toBeUndefined();
  });

  test('sets font properties', () => {
    let style = createStyle();
    style = setFont(style, {
      name: 'Arial',
      size: 12,
      bold: true
    });
    
    expect(style.font?.name).toBe('Arial');
    expect(style.font?.size).toBe(12);
    expect(style.font?.bold).toBe(true);
  });

  test('sets fill properties', () => {
    let style = createStyle();
    style = setFill(style, {
      type: 'pattern',
      color: '#FF0000',
      pattern: 'solid'
    });
    
    expect(style.fill?.type).toBe('pattern');
    expect(style.fill?.color).toBe('#FF0000');
    expect(style.fill?.pattern).toBe('solid');
  });

  test('sets border properties', () => {
    let style = createStyle();
    style = setBorder(style, {
      top: { style: 'thin', color: '#000000' },
      bottom: { style: 'thick', color: '#000000' }
    });
    
    expect(style.border?.top?.style).toBe('thin');
    expect(style.border?.bottom?.style).toBe('thick');
  });

  test('sets alignment properties', () => {
    let style = createStyle();
    style = setAlignment(style, {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true
    });
    
    expect(style.alignment?.horizontal).toBe('center');
    expect(style.alignment?.vertical).toBe('middle');
    expect(style.alignment?.wrapText).toBe(true);
  });

  test('sets number format', () => {
    let style = createStyle();
    style = setNumberFormat(style, '#,##0.00');
    expect(style.numberFormat).toBe('#,##0.00');
  });

  test('sets protection', () => {
    let style = createStyle();
    style = setProtection(style, {
      locked: true,
      hidden: false
    });
    
    expect(style.protection?.locked).toBe(true);
    expect(style.protection?.hidden).toBe(false);
  });
});