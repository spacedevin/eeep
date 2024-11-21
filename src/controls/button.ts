import { FormControlState } from '../../spec/FormControls';
import { createControlState, updateControlProperties, updateControlEvents } from './state';

export function createButton(name: string, caption: string): FormControlState {
  return createControlState(name, 'button', {
    caption,
    width: 80,
    height: 25
  });
}

export function setButtonProperties(
  state: FormControlState,
  name: string,
  properties: Record<string, any>
): FormControlState {
  return updateControlProperties(state, name, 'button', properties);
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
  return updateControlEvents(state, name, 'button', events);
}