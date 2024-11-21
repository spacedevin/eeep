import { FormControlState } from '../../spec/FormControls';
import { createControlState, updateControlProperties, updateControlSpecific } from './state';
import { validateValue } from '../validation';

export function createSpinButton(name: string): FormControlState {
  const state = createControlState(name, 'spinbutton', {
    value: 0
  });

  return updateControlSpecific(state, name, 'spinbutton', {
    min: 0,
    max: 100,
    step: 1
  });
}

export function setSpinButtonProperties(
  state: FormControlState,
  name: string,
  properties: Record<string, any>
): FormControlState {
  return updateControlProperties(state, name, 'spinbutton', properties);
}

export function setSpinButtonValue(
  state: FormControlState,
  name: string,
  value: number
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'spinbutton') {
    throw new Error(`Spin button control '${name}' not found`);
  }

  const min = control.specific?.min ?? 0;
  const max = control.specific?.max ?? 100;
  const clampedValue = validateValue(value, min, max);

  return updateControlProperties(state, name, 'spinbutton', { value: clampedValue });
}

export function setSpinButtonLimits(
  state: FormControlState,
  name: string,
  min: number,
  max: number
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'spinbutton') {
    throw new Error(`Spin button control '${name}' not found`);
  }

  if (min >= max) {
    throw new Error('Minimum value must be less than maximum value');
  }

  let newState = updateControlSpecific(state, name, 'spinbutton', { min, max });

  // Adjust current value if needed
  const currentValue = control.properties.value;
  if (currentValue < min || currentValue > max) {
    newState = setSpinButtonValue(newState, name, validateValue(currentValue, min, max));
  }

  return newState;
}

export function setSpinButtonStep(
  state: FormControlState,
  name: string,
  step: number
): FormControlState {
  if (step <= 0) {
    throw new Error('Step value must be positive');
  }

  return updateControlSpecific(state, name, 'spinbutton', { step });
}