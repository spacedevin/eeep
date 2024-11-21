import { FormControlState } from '../../spec/FormControls';
import { createControlState, updateControlProperties, updateControlSpecific } from './state';

export function createOptionButton(name: string, caption: string, groupName: string): FormControlState {
  const state = createControlState(name, 'radio', {
    caption,
    value: false
  });

  return updateControlSpecific(state, name, 'radio', {
    groupName
  });
}

export function setOptionButtonProperties(
  state: FormControlState,
  name: string,
  properties: Record<string, any>
): FormControlState {
  return updateControlProperties(state, name, 'radio', properties);
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

  let newState = updateControlProperties(state, name, 'radio', { value: selected });

  // If selected, unselect other buttons in the same group
  if (selected) {
    const groupName = control.specific?.groupName;
    for (const [otherName, otherControl] of state.controls) {
      if (otherName !== name && 
          otherControl.type === 'radio' && 
          otherControl.specific?.groupName === groupName) {
        newState = updateControlProperties(newState, otherName, 'radio', { value: false });
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

    newState = updateControlSpecific(newState, name, 'radio', { groupName });
  }

  return newState;
}