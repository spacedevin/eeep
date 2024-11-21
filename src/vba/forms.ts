import { VBAState } from '../../spec/VBA';

export function addVBAForm(
  state: VBAState,
  name: string,
  controls: Array<{
    name: string;
    type: string;
    properties: Map<string, any>;
  }>,
  code: string
): VBAState {
  const newForms = new Map(state.forms);
  newForms.set(name, {
    name,
    controls,
    code
  });

  return {
    ...state,
    forms: newForms
  };
}

export function addVBAFormControl(
  state: VBAState,
  formName: string,
  control: {
    name: string;
    type: string;
    properties: Map<string, any>;
  }
): VBAState {
  const form = state.forms.get(formName);
  if (!form) {
    throw new Error(`Form '${formName}' not found`);
  }

  const newForm = {
    ...form,
    controls: [...form.controls, control]
  };

  return {
    ...state,
    forms: new Map(state.forms).set(formName, newForm)
  };
}

export function updateVBAFormCode(
  state: VBAState,
  formName: string,
  code: string
): VBAState {
  const form = state.forms.get(formName);
  if (!form) {
    throw new Error(`Form '${formName}' not found`);
  }

  return {
    ...state,
    forms: new Map(state.forms).set(formName, {
      ...form,
      code
    })
  };
}