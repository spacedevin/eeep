import { FormControlState } from '../../../spec/FormControls';
import { validateControlName } from '../../validation/control';
import { ControlProperties } from '../types';

export function createImage(name: string): FormControlState {
  validateControlName(name);

  return {
    controls: new Map([[name, {
      type: 'image',
      properties: {
        name,
        enabled: true,
        visible: true,
        position: {
          x: 0,
          y: 0,
          width: 100,
          height: 100
        }
      },
      specific: {
        source: '',
        sizeMode: 'stretch', // stretch, zoom, clip
        borderStyle: 'none', // none, single, double
        pictureAlignment: 'center' // center, top, bottom, left, right
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

export function setImageProperties(
  state: FormControlState,
  name: string,
  properties: Partial<ControlProperties>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'image') {
    throw new Error(`Image control '${name}' not found`);
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

export function setImageSource(
  state: FormControlState,
  name: string,
  source: string
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'image') {
    throw new Error(`Image control '${name}' not found`);
  }

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        source
      }
    })
  };
}

export function setImageSizeMode(
  state: FormControlState,
  name: string,
  sizeMode: 'stretch' | 'zoom' | 'clip'
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'image') {
    throw new Error(`Image control '${name}' not found`);
  }

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        sizeMode
      }
    })
  };
}

export function setImageBorderStyle(
  state: FormControlState,
  name: string,
  borderStyle: 'none' | 'single' | 'double'
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'image') {
    throw new Error(`Image control '${name}' not found`);
  }

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        borderStyle
      }
    })
  };
}

export function setImageAlignment(
  state: FormControlState,
  name: string,
  alignment: 'center' | 'top' | 'bottom' | 'left' | 'right'
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'image') {
    throw new Error(`Image control '${name}' not found`);
  }

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        pictureAlignment: alignment
      }
    })
  };
}