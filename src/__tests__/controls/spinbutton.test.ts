import {
  createSpinButton,
  setSpinButtonProperties,
  setSpinButtonValue,
  setSpinButtonLimits,
  setSpinButtonStep
} from '../../controls/spinbutton';

describe('SpinButton Control', () => {
  test('creates spin button', () => {
    const state = createSpinButton('spin1');
    const control = state.controls.get('spin1');
    
    expect(control).toBeDefined();
    expect(control?.type).toBe('spinbutton');
    expect(control?.properties.value).toBe(0);
    expect(control?.specific?.min).toBe(0);
    expect(control?.specific?.max).toBe(100);
    expect(control?.specific?.step).toBe(1);
  });

  test('sets spin button properties', () => {
    let state = createSpinButton('spin1');
    state = setSpinButtonProperties(state, 'spin1', {
      enabled: false,
      visible: false
    });

    const control = state.controls.get('spin1');
    expect(control?.properties.enabled).toBe(false);
    expect(control?.properties.visible).toBe(false);
  });

  test('sets spin button value', () => {
    let state = createSpinButton('spin1');
    state = setSpinButtonValue(state, 'spin1', 50);

    const control = state.controls.get('spin1');
    expect(control?.properties.value).toBe(50);
  });

  test('clamps spin button value to limits', () => {
    let state = createSpinButton('spin1');
    state = setSpinButtonValue(state, 'spin1', 150);

    const control = state.controls.get('spin1');
    expect(control?.properties.value).toBe(100);

    state = setSpinButtonValue(state, 'spin1', -10);
    expect(state.controls.get('spin1')?.properties.value).toBe(0);
  });

  test('sets spin button limits', () => {
    let state = createSpinButton('spin1');
    state = setSpinButtonLimits(state, 'spin1', 10, 90);

    const control = state.controls.get('spin1');
    expect(control?.specific?.min).toBe(10);
    expect(control?.specific?.max).toBe(90);
  });

  test('adjusts value when setting limits', () => {
    let state = createSpinButton('spin1');
    state = setSpinButtonValue(state, 'spin1', 95);
    state = setSpinButtonLimits(state, 'spin1', 0, 80);

    const control = state.controls.get('spin1');
    expect(control?.properties.value).toBe(80);
  });

  test('sets spin button step', () => {
    let state = createSpinButton('spin1');
    state = setSpinButtonStep(state, 'spin1', 5);

    const control = state.controls.get('spin1');
    expect(control?.specific?.step).toBe(5);
  });

  test('throws error for invalid control', () => {
    const state = createSpinButton('spin1');
    expect(() => setSpinButtonValue(state, 'invalid', 50)).toThrow();
  });

  test('throws error for invalid limits', () => {
    const state = createSpinButton('spin1');
    expect(() => setSpinButtonLimits(state, 'spin1', 100, 0)).toThrow();
  });

  test('throws error for invalid step', () => {
    const state = createSpinButton('spin1');
    expect(() => setSpinButtonStep(state, 'spin1', 0)).toThrow();
    expect(() => setSpinButtonStep(state, 'spin1', -1)).toThrow();
  });
});