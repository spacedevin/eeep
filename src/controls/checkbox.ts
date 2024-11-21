import { FormControlState } from '../../spec/FormControls';
import { ControlProperties, ControlEvents, ControlValidation } from './types';
import { validateControl, validateControlName } from '../validation/control';

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
  validateControl(state, name, 'checkbox');

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...state.controls.get(name)!,
      properties: {
        ...state.controls.get(name)!.properties,
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
  validateControl(state, name, 'checkbox');

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...state.controls.get(name)!,
      properties: {
        ...state.controls.get(name)!.properties,
        value: checked
      }
    })
  };
}

export function setCheckboxValidation(
  state: FormControlState,
  name: string,
  validation: ControlValidation
): FormControlState {
  validateControl(state, name, 'checkbox');

  return {
    ...state,
    validation: {
      ...state.validation,
      rules: new Map(state.validation.rules).set(name, {
        validate: validation.custom || ((value) => true),
        message: validation.message || 'Invalid value'
      })
    }
  };
}