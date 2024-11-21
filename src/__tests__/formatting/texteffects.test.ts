import {
  setTextEffects,
  setCharacterSpacing,
  setKerning,
  setTextPosition
} from '../../formatting/texteffects';
import { createStyle } from '../../formatting/styles';

describe('Text Effects Management', () => {
  test('sets text effects', () => {
    let style = createStyle();
    style = setTextEffects(style, {
      outline: true,
      shadow: true,
      emboss: false,
      imprint: false
    });
    
    expect(style.font?.outline).toBe(true);
    expect(style.font?.shadow).toBe(true);
    expect(style.font?.emboss).toBe(false);
  });

  test('sets character spacing', () => {
    let style = createStyle();
    style = setCharacterSpacing(style, 1.5);
    expect(style.font?.spacing).toBe(1.5);
  });

  test('sets kerning', () => {
    let style = createStyle();
    style = setKerning(style, 12);
    expect(style.font?.kerning).toBe(12);
  });

  test('sets text position', () => {
    let style = createStyle();
    style = setTextPosition(style, 'superscript');
    expect(style.font?.position).toBe('superscript');
  });

  test('combines multiple text effects', () => {
    let style = createStyle();
    style = setTextEffects(style, {
      outline: true,
      shadow: true
    });
    style = setCharacterSpacing(style, 1.5);
    style = setTextPosition(style, 'subscript');
    
    expect(style.font?.outline).toBe(true);
    expect(style.font?.shadow).toBe(true);
    expect(style.font?.spacing).toBe(1.5);
    expect(style.font?.position).toBe('subscript');
  });
});