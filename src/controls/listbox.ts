import { FormControlState } from '../../spec/FormControls';
import { ControlProperties, ControlEvents, ControlValidation, ControlSpecific } from './types';

export function createListbox(name: string): FormControlState {
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
        value: []
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

export function setListboxSpecific(
  state: FormControlState,
  name: string,
  specific: Partial<ControlSpecific>
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
        ...specific
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

  const items = [...(control.specific?.items || []), item];
  return setListboxSpecific(state, name, { items });
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
  return setListboxSpecific(state, name, { items });
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

  return setListboxSpecific(state, name, { selection });
}