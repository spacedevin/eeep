import { FormControlState } from '../../spec/FormControls';
import { ControlProperties, ControlEvents, ControlValidation, ControlSpecific } from './types';
import { validateControl, validateControlName } from '../validation/control';

export function createCombobox(name: string): FormControlState {
  validateControlName(name);

  return {
    controls: new Map([[name, {
      type: 'combobox',
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
        value: undefined
      },
      specific: {
        items: []
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

export function setComboboxProperties(
  state: FormControlState,
  name: string,
  properties: Partial<ControlProperties>
): FormControlState {
  validateControl(state, name, 'combobox');

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

export function addComboboxItem(
  state: FormControlState,
  name: string,
  item: string
): FormControlState {
  validateControl(state, name, 'combobox');

  const control = state.controls.get(name)!;
  const items = [...(control.specific?.items || []), item];

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        items
      }
    })
  };
}

export function removeComboboxItem(
  state: FormControlState,
  name: string,
  index: number
): FormControlState {
  validateControl(state, name, 'combobox');

  const control = state.controls.get(name)!;
  const items = [...(control.specific?.items || [])];
  items.splice(index, 1);

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        items
      }
    })
  };
}

export function setComboboxValidation(
  state: FormControlState,
  name: string,
  validation: ControlValidation
): FormControlState {
  validateControl(state, name, 'combobox');

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