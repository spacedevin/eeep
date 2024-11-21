import { FormControlState } from '../../../spec/FormControls';
import { validateControlName } from '../../validation/control';
import { ControlProperties } from '../types';

export function createScrollBar(name: string): FormControlState {
  validateControlName(name);

  return {
    controls: new Map([[name, {
      type: 'scrollbar',
      properties: {
        name,
        enabled: true,
        visible: true,
        position: {
          x: 0,
          y: 0,
          width: 120,
          height: 20
        },
        value: 0
      },
      specific: {
        min: 0,
        max: 100,
        largeChange: 10,
        smallChange: 1,
        orientation: 'horizontal'
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

export function setScrollBarProperties(
  state: FormControlState,
  name: string,
  properties: Partial<ControlProperties>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'scrollbar') {
    throw new Error(`Scrollbar control '${name}' not found`);
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

export function setScrollBarValue(
  state: FormControlState,
  name: string,
  value: number
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'scrollbar') {
    throw new Error(`Scrollbar control '${name}' not found`);
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
    newState = setScrollBarValue(newState, name, Math.max(min, Math.min(max, currentValue)));
  }

  return newState;
}