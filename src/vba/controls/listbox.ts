import { FormControlState } from '../../../spec/FormControls';
import { validateControlName } from '../../validation/control';
import { ControlProperties } from '../types';

export function createListbox(name: string): FormControlState {
  validateControlName(name);

  return {
    controls: new Map([[name, {
      type: 'listbox',
      properties: {
        name,
        enabled: true,
        visible: true,
        position: {
          x: 0,
          y: 0,
          width: 120,
          height: 100
        },
        value: undefined
      },
      specific: {
        items: [],
        multiSelect: false,
        selection: []
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

export function setListboxProperties(
  state: FormControlState,
  name: string,
  properties: Partial<ControlProperties>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'listbox') {
    throw new Error(`Listbox control '${name}' not found`);
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

export function addListboxItem(
  state: FormControlState,
  name: string,
  item: string
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'listbox') {
    throw new Error(`Listbox control '${name}' not found`);
  }

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        items: [...(control.specific?.items || []), item]
      }
    })
  };
}

export function removeListboxItem(
  state: FormControlState,
  name: string,
  index: number
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'listbox') {
    throw new Error(`Listbox control '${name}' not found`);
  }

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

export function setListboxSelection(
  state: FormControlState,
  name: string,
  selection: number[]
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'listbox') {
    throw new Error(`Listbox control '${name}' not found`);
  }

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        selection
      }
    })
  };
}