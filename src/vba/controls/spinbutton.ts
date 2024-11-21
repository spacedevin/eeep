import { FormControlState } from '../../../spec/FormControls';
import { validateControlName } from '../../validation/control';
import { ControlProperties } from '../types';

export function createSpinButton(name: string): FormControlState {
  validateControlName(name);

  return {
    controls: new Map([[name, {
      type: 'spinbutton',
      properties: {
        name,
        enabled: true,
        visible: true,
        position: {
          x: 0,
          y: 0,
          width: 20,
          height: 25
        },
        value: 0
      },
      specific: {
        min: 0,
        max: 100,
        step: 1
      }
    }]]),
    events: new Map(),
    validation: {
      enabled: true,
      rules: new Map()
    },
    bindings: new Map()
  };
}

export function setSpinButtonProperties(
  state: FormControlState,
  name: string,
  properties: Partial<ControlProperties>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'spinbutton') {
    throw new Error(`Spin button control '${name}' not found`);
  }

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      properties: {
        ...control.properties,
        ...properties
      }
    })
  };
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

  const { min = 0, max = 100 } = control.specific || {};
  const clampedValue = Math.max(min, Math.min(max, value));

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      properties: {
        ...control.properties,
        value: clampedValue
      }
    })
  };
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

  let newState = {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        min,
        max
      }
    })
  };

  // Adjust current value if needed
  const currentValue = control.properties.value;
  if (currentValue < min || currentValue > max) {
    newState = setSpinButtonValue(newState, name, Math.max(min, Math.min(max, currentValue)));
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

  const control = state.controls.get(name);
  if (!control || control.type !== 'spinbutton') {
    throw new Error(`Spin button control '${name}' not found`);
  }

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        step
      }
    })
  };
}