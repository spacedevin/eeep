import {
  createNamedStyle,
  setBuiltIn,
  setCustomBuiltIn,
  setHidden,
  setIndentLevel
} from '../../formatting/namedstyles';

describe('Named Style Management', () => {
  test('creates named style', () => {
    const style = createNamedStyle('Heading 1');
    expect(style.name).toBe('Heading 1');
    expect(style.builtIn).toBe(false);
    expect(style.customBuiltin).toBe(false);
    expect(style.hidden).toBe(false);
    expect(style.iLevel).toBe(0);
  });

  test('sets built-in flag', () => {
    let style = createNamedStyle('Normal');
    style = setBuiltIn(style, true);
    
    expect(style.builtIn).toBe(true);
    expect(style.customBuiltin).toBe(false);
  });

  test('sets custom built-in flag', () => {
    let style = createNamedStyle('Custom Normal');
    style = setCustomBuiltIn(style, true);
    
    expect(style.customBuiltin).toBe(true);
    expect(style.builtIn).toBe(false);
  });

  test('sets hidden flag', () => {
    let style = createNamedStyle('Hidden Style');
    style = setHidden(style, true);
    expect(style.hidden).toBe(true);
  });

  test('sets indent level', () => {
    let style = createNamedStyle('Indented Style');
    style = setIndentLevel(style, 2);
    expect(style.iLevel).toBe(2);
  });

  test('clamps indent level to valid range', () => {
    let style = createNamedStyle('Test Style');
    style = setIndentLevel(style, -1);
    expect(style.iLevel).toBe(0);
    
    style = setIndentLevel(style, 300);
    expect(style.iLevel).toBe(250);
  });
});