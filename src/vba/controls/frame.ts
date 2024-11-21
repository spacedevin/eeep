import { FormControlState } from '../../../spec/FormControls';
import { validateControlName } from '../../validation/control';
import { ControlProperties } from '../types';

export function createFrame(name: string, caption: string): FormControlState {
  validateControlName(name);

  return {
    controls: new Map([[name, {
      type: 'frame',
      properties: {
        name,
        caption,
        enabled: true,
        visible: true,
        position: {
          x: 0,
          y: 0,
          width: 200,
          height: 150
        }
      },
      specific: {
        controls: []
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

export function setFrameProperties(
  state: FormControlState,
  name: string,
  properties: Partial<ControlProperties>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'frame') {
    throw new Error(`Frame control '${name}' not found`);
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

export function addControlToFrame(
  state: FormControlState,
  frameName: string,
  controlName: string
): FormControlState {
  const frame = state.controls.get(frameName);
  if (!frame || frame.type !== 'frame') {
    throw new Error(`Frame control '${frameName}' not found`);
  }

  const control = state.controls.get(controlName);
  if (!control) {
    throw new Error(`Control '${controlName}' not found`);
  }

  const controls = [...(frame.specific?.controls || []), controlName];

  return {
    ...state,
    controls: new Map(state.controls).set(frameName, {
      ...frame,
      specific: {
        ...frame.specific,
        controls
      }
    })
  };
}

export function removeControlFromFrame(
  state: FormControlState,
  frameName: string,
  controlName: string
): FormControlState {
  const frame = state.controls.get(frameName);
  if (!frame || frame.type !== 'frame') {
    throw new Error(`Frame control '${frameName}' not found`);
  }

  const controls = (frame.specific?.controls || []).filter(name => name !== controlName);

  return {
    ...state,
    controls: new Map(state.controls).set(frameName, {
      ...frame,
      specific: {
        ...frame.specific,
        controls
      }
    })
  };
}