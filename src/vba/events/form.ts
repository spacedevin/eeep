import { VBAState } from '../../../spec/VBA';

export interface FormEvent {
  type: 'Initialize' | 'Terminate' | 'Activate' | 'Deactivate';
  handler: string;
  context?: any;
}

export function registerFormEvent(
  state: VBAState,
  formName: string,
  eventType: FormEvent['type'],
  handler: string
): VBAState {
  const form = state.forms.get(formName);
  if (!form) {
    throw new Error(`Form ${formName} not found`);
  }

  // Add event handler to form code
  const eventHandler = `
Private Sub UserForm_${eventType}()
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