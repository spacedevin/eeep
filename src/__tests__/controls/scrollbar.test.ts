import {
  createScrollBar,
  setScrollBarProperties,
  setScrollBarValue,
  setScrollBarLimits
} from '../../controls/scrollbar';

describe('Scrollbar Control', () => {
  test('creates scrollbar', () => {
    const state = createScrollBar('scroll1');
    const control = state.controls.get('scroll1');
    
    expect(control).toBeDefined();
    expect(control?.type).toBe('scrollbar');
    expect(control?.properties.value).toBe(0);
    expect(control?.properties.min).toBe(0);
    expect(control?.properties.max).toBe(100);
  });

  test('sets scrollbar properties', () => {
    let state = createScrollBar('scroll1');
    state = setScrollBarProperties(state, 'scroll1', {
      enabled: false,
      largeChange: 20
    });

    const control = state.controls.get('scroll1');
    expect(control?.properties.enabled).toBe(false);
    expect(control?.properties.largeChange).toBe(20);
  });

  test('sets scrollbar value', () => {
    let state = createScrollBar('scroll1');
    state = setScrollBarValue(state, 'scroll1', 50);

    const control = state.controls.get('scroll1');
    expect(control?.properties.value).toBe(50);
  });

  test('clamps scrollbar value to limits', () => {
    let state = createScrollBar('scroll1');
    state = setScrollBarValue(state, 'scroll1', 150);

    const control = state.controls.get('scroll1');
    expect(control?.properties.value).toBe(100);

    state = setScrollBarValue(state, 'scroll1', -10);
    expect(state.controls.get('scroll1')?.properties.value).toBe(0);
  });

  test('sets scrollbar limits', () => {
    let state = createScrollBar('scroll1');
    state = setScrollBarLimits(state, 'scroll1', 10, 90);

    const control = state.controls.get('scroll1');
    expect(control?.properties.min).toBe(10);
    expect(control?.properties.max).toBe(90);
  });

  test('adjusts value when setting limits', () => {
    let state = createScrollBar('scroll1');
    state = setScrollBarValue(state, 'scroll1', 95);
    state = setScrollBarLimits(state, 'scroll1', 0, 80);

    const control = state.controls.get('scroll1');
    expect(control?.properties.value).toBe(80);
  });

  test('throws error for invalid control', () => {
    const state = createScrollBar('scroll1');
    expect(() => setScrollBarValue(state, 'invalid', 50)).toThrow();
  });

  test('throws error for invalid limits', () => {
    const state = createScrollBar('scroll1');
    expect(() => setScrollBarLimits(state, 'scroll1', 100, 0)).toThrow();
  });
});