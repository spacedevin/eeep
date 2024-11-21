import { FormControlState } from '../../spec/FormControls';
import { createControlState, updateControlProperties, updateControlSpecific } from './state';
import { validateValue } from '../validation';

export function createScrollBar(name: string): FormControlState {
  const state = createControlState(name, 'scrollbar', {
    value: 0
  });

  return updateControlSpecific(state, name, 'scrollbar', {
    min: 0,
    max: 100,
    largeChange: 10,
    smallChange: 1,
    orientation: 'horizontal'
  });
}

export function setScrollBarProperties(
  state: FormControlState,
  name: string,
  properties: Record<string, any>
): FormControlState {
  return updateControlProperties(state, name, 'scrollbar', properties);
}

export function setScrollBarValue(
  state: FormControlState,
  name: string,
  value: number
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'scrollbar') {
    throw new Error(`Scrollbar control '${name}' not found`);
  }

  const min = control.specific?.min ?? 0;
  const max = control.specific?.max ?? 100;
  const clampedValue = validateValue(value, min, max);

  return updateControlProperties(state, name, 'scrollbar', { value: clampedValue });
}

export function setScrollBarLimits(
  state: FormControlState,
  name: string,
  min: number,
  max: number
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'scrollbar') {
    throw new Error(`Scrollbar control '${name}' not found`);
  }

  if (min >= max) {
    throw new Error('Minimum value must be less than maximum value');
  }

  let newState = updateControlSpecific(state, name, 'scrollbar', { min, max });

  // Adjust current value if needed
  const currentValue = control.properties.value;
  if (currentValue < min || currentValue > max) {
    newState = setScrollBarValue(newState, name, validateValue(currentValue, min, max));
  }

  return newState;
}