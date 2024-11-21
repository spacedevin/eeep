import { VBAState } from '../../../spec/VBA';

export interface ControlEvent {
  type: 'Click' | 'Change' | 'Enter' | 'Exit' | 'KeyPress' | 'MouseMove';
  handler: string;
  context?: any;
}

export function registerControlEvent(
  state: VBAState,
  formName: string,
  controlName: string,
  eventType: ControlEvent['type'],
  handler: string
): VBAState {
  const form = state.forms.get(formName);
  if (!form) {
    throw new Error(`Form ${formName} not found`);
  }

  const control = form.controls.find(c => c.name === controlName);
  if (!control) {
    throw new Error(`Control ${controlName} not found in form ${formName}`);
  }

  // Add event handler to form code
  const eventHandler = `
Private Sub ${controlName}_${eventType}()
${handler}
End Sub
`;

  return {
    ...state,
    forms: new Map(state.forms).set(formName, {
      ...form,
      code: form.code + eventHandler
    })
  };
}