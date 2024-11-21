import {
  createLabel,
  setLabelProperties,
  setLabelCaption
} from '../../../vba/controls/label';

describe('Label Control', () => {
  test('creates label', () => {
    const state = createLabel('label1', 'Test Label');
    const control = state.controls.get('label1');
    
    expect(control).toBeDefined();
    expect(control?.type).toBe('label');
    expect(control?.properties.caption).toBe('Test Label');
  });

  test('sets label properties', () => {
    let state = createLabel('label1', 'Test Label');
    state = setLabelProperties(state, 'label1', {
      enabled: false,
      visible: false
    });

    const control = state.controls.get('label1');
    expect(control?.properties.enabled).toBe(false);
    expect(control?.properties.visible).toBe(false);
  });

  test('sets label caption', () => {
    let state = createLabel('label1', 'Test Label');
    state = setLabelCaption(state, 'label1', 'New Caption');

    const control = state.controls.get('label1');
    expect(control?.properties.caption).toBe('New Caption');
  });

  test('throws error for invalid control', () => {
    const state = createLabel('label1', 'Test Label');
    expect(() => setLabelProperties(state, 'invalid', {})).toThrow();
  });
});