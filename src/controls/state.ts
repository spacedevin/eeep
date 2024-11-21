import { FormControlState } from '../../spec/FormControls';
import { validateControlName } from '../validation/control';

export function createControlState(
  name: string,
  type: string,
  properties: Record<string, any>
): FormControlState {
  validateControlName(name);

  return {
    controls: new Map([[name, {
      type: type as any,
      properties: {
        name,
        enabled: true,
        visible: true,
        position: {
          x: 0,
          y: 0,
          width: 100,
          height: 25
        },
        ...properties
      },
      specific: {}
    }]]),
    events: new Map(),
    validation: {
      enabled: true,
      rules: new Map()
    },
    bindings: new Map()
  };
}

export function updateControlProperties(
  state: FormControlState,
  name: string,
  type: string,
  properties: Record<string, any>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== type) {
    throw new Error(`${type} control '${name}' not found`);
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

export function updateControlSpecific(
  state: FormControlState,
  name: string,
  type: string,
  specific: Record<string, any>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== type) {
    throw new Error(`${type} control '${name}' not found`);
  }

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        ...specific
      }
    })
  };
}

export function updateControlEvents(
  state: FormControlState,
  name: string,
  type: string,
  events: Record<string, (...args: any[]) => void>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== type) {
    throw new Error(`${type} control '${name}' not found`);
  }

  return {
    ...state,
    events: new Map(state.events).set(name, {
      ...state.events.get(name),
      ...events
    })
  };
}