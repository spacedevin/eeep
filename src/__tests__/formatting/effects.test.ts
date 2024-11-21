import {
  setShadowEffect,
  setGlowEffect,
  setSoftEdgeEffect,
  clearEffects
} from '../../formatting/effects';
import { createStyle } from '../../formatting/styles';

describe('Effect Management', () => {
  test('sets shadow effect', () => {
    let style = createStyle();
    style = setShadowEffect(style, {
      type: 'outer',
      color: '#000000',
      blur: 5,
      distance: 3,
      angle: 45
    });
    
    expect(style.style?.effects?.shadow?.type).toBe('outer');
    expect(style.style?.effects?.shadow?.color).toBe('#000000');
    expect(style.style?.effects?.shadow?.blur).toBe(5);
  });

  test('sets glow effect', () => {
    let style = createStyle();
    style = setGlowEffect(style, {
      color: '#FF0000',
      radius: 10,
      transparency: 0.5
    });
    
    expect(style.style?.effects?.glow?.color).toBe('#FF0000');
    expect(style.style?.effects?.glow?.radius).toBe(10);
    expect(style.style?.effects?.glow?.transparency).toBe(0.5);
  });

  test('sets soft edge effect', () => {
    let style = createStyle();
    style = setSoftEdgeEffect(style, {
      radius: 5
    });
    
    expect(style.style?.effects?.softEdge?.radius).toBe(5);
  });

  test('clears all effects', () => {
    let style = createStyle();
    style = setShadowEffect(style, {
      type: 'outer',
      color: '#000000'
    });
    style = setGlowEffect(style, {
      color: '#FF0000',
      radius: 10
    });
    
    style = clearEffects(style);
    expect(style.style?.effects).toBeUndefined();
  });

  test('combines multiple effects', () => {
    let style = createStyle();
    style = setShadowEffect(style, {
      type: 'outer',
      color: '#000000'
    });
    style = setGlowEffect(style, {
      color: '#FF0000',
      radius: 10
    });
    
    expect(style.style?.effects?.shadow).toBeDefined();
    expect(style.style?.effects?.glow).toBeDefined();
  });
});