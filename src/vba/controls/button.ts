import { FormControlState } from '../../../spec/FormControls';
import { validateControlName } from '../../validation/control';
import { ControlProperties } from '../types';

export function createButton(name: string, caption: string): FormControlState {
  validateControlName(name);

  return {
    controls: new Map([[name, {
      type: 'button',
      properties: {
        name,
        caption,
        enabled: true,
        visible: true,
        position: {
          x: 0,
          y: 0,
          width: 80,
          height: 25
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

export function setButtonProperties(
  state: FormControlState,
  name: string,
  properties: Partial<ControlProperties>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'button') {
    throw new Error(`Button control '${name}' not found`);
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

export function setButtonEvents(
  state: FormControlState,
  name: string,
  events: {
    click?: () => void;
    mouseEnter?: () => void;
    mouseLeave?: () => void;
  }
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'button') {
    throw new Error(`Button control '${name}' not found`);
  }

  return {
    ...state,
    events: new Map(state.events).set(name, {
      ...state.events.get(name),
      ...events
    })
  };
}