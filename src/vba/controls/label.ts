import { FormControlState } from '../../../spec/FormControls';
import { validateControlName } from '../../validation/control';
import { ControlProperties } from '../types';

export function createLabel(name: string, caption: string): FormControlState {
  validateControlName(name);

  return {
    controls: new Map([[name, {
      type: 'label',
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
        }
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

export function setLabelProperties(
  state: FormControlState,
  name: string,
  properties: Partial<ControlProperties>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'label') {
    throw new Error(`Label control '${name}' not found`);
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

export function setLabelCaption(
  state: FormControlState,
  name: string,
  caption: string
): FormControlState {
  return setLabelProperties(state, name, { caption });
}