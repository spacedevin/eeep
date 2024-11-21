import {
  createVisualState,
  setContrastMode,
  addCustomContrastColor,
  setScaling,
  setIndicators
} from '../../accessibility/visual';

describe('Visual Accessibility', () => {
  test('creates visual state', () => {
    const state = createVisualState();
    expect(state.contrast.mode).toBe('normal');
    expect(state.scaling.enabled).toBe(true);
    expect(state.indicators.focus).toBe(true);
  });

  test('sets contrast mode', () => {
    let state = { visual: createVisualState() };
    state = setContrastMode(state, 'high', 7);
    
    expect(state.visual.contrast.mode).toBe('high');
    expect(state.visual.contrast.ratio).toBe(7);
  });

  test('adds custom contrast color', () => {
    let state = { visual: createVisualState() };
    state = addCustomContrastColor(state, '#000000', '#FFFFFF');
    
    expect(state.visual.contrast.customColors.get('#000000')).toBe('#FFFFFF');
  });

  test('sets scaling options', () => {
    let state = { visual: createVisualState() };
    state = setScaling(state, {
      factor: 1.5,
      minSize: 14,
      maxSize: 28
    });
    
    expect(state.visual.scaling.factor).toBe(1.5);
    expect(state.visual.scaling.minSize).toBe(14);
    expect(state.visual.scaling.maxSize).toBe(28);
  });

  test('sets indicators', () => {
    let state = { visual: createVisualState() };
    state = setIndicators(state, {
      focus: false,
      errors: true
    });
    
    expect(state.visual.indicators.focus).toBe(false);
    expect(state.visual.indicators.errors).toBe(true);
    expect(state.visual.indicators.selection).toBe(true); // Unchanged
  });
});