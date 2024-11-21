import { FormControlState } from '../../../spec/FormControls';
import { validateControlName } from '../../validation/control';
import { ControlProperties } from '../types';

export function createOptionButton(name: string, caption: string, groupName: string): FormControlState {
  validateControlName(name);

  return {
    controls: new Map([[name, {
      type: 'radio',
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
      },
      specific: {
        groupName
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

export function setOptionButtonProperties(
  state: FormControlState,
  name: string,
  properties: Partial<ControlProperties>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'radio') {
    throw new Error(`Option button control '${name}' not found`);
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

export function setOptionButtonState(
  state: FormControlState,
  name: string,
  selected: boolean
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'radio') {
    throw new Error(`Option button control '${name}' not found`);
  }

  let newState = {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      properties: {
        ...control.properties,
        value: selected
      }
    })
  };

  // If selected, unselect other buttons in the same group
  if (selected && control.specific?.groupName) {
    const groupName = control.specific.groupName;
    for (const [otherName, otherControl] of state.controls) {
      if (otherName !== name && 
          otherControl.type === 'radio' && 
          otherControl.specific?.groupName === groupName) {
        newState = setOptionButtonState(newState, otherName, false);
      }
    }
  }

  return newState;
}

export function groupOptionButtons(
  state: FormControlState,
  names: string[],
  groupName: string
): FormControlState {
  let newState = state;

  for (const name of names) {
    const control = state.controls.get(name);
    if (!control || control.type !== 'radio') {
      throw new Error(`Option button control '${name}' not found`);
    }

    newState = {
      ...newState,
      controls: new Map(newState.controls).set(name, {
        ...control,
        specific: {
          ...control.specific,
          groupName
        }
      })
    };
  }

  return newState;
}