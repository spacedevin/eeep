import { FormControlState } from '../../../spec/FormControls';
import { validateControlName } from '../../validation/control';
import { ControlProperties } from '../types';

export function createCheckbox(name: string, caption: string): FormControlState {
  validateControlName(name);

  return {
    controls: new Map([[name, {
      type: 'checkbox',
      properties: {
        name,
        caption,
        enabled: true,
        visible: true,
        position: {
          x: 0,
          y: 0,
          width: 100,
          height: 20
        },
        value: false
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

export function setCheckboxProperties(
  state: FormControlState,
  name: string,
  properties: Partial<ControlProperties>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'checkbox') {
    throw new Error(`Checkbox control '${name}' not found`);
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

export function setCheckboxState(
  state: FormControlState,
  name: string,
  checked: boolean
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'checkbox') {
    throw new Error(`Checkbox control '${name}' not found`);
  }

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      properties: {
        ...control.properties,
        value: checked
      }
    })
  };
}