import { VBAState } from '../../spec/VBA';

export interface VBAEvent {
  type: string;
  handler: string;
  context?: any;
}

export function registerWorkbookEvent(
  state: VBAState,
  eventType: 'Open' | 'Close' | 'BeforeSave' | 'AfterSave' | 'SheetActivate' | 'SheetDeactivate',
  handler: string
): VBAState {
  const module = state.modules.get('ThisWorkbook');
  if (!module) {
    throw new Error('ThisWorkbook module not found');
  }

  // Add event handler to module code
  const eventHandler = `Private Sub Workbook_${eventType}()\n${handler}\nEnd Sub\n`;
  const newCode = module.code + '\n' + eventHandler;

  return {
    ...state,
    modules: new Map(state.modules).set('ThisWorkbook', {
      ...module,
      code: newCode
    })
  };
}

export function registerWorksheetEvent(
  state: VBAState,
  sheetName: string,
  eventType: 'Change' | 'SelectionChange' | 'Calculate' | 'BeforeDoubleClick' | 'BeforeRightClick',
  handler: string
): VBAState {
  const module = state.modules.get(sheetName);
  if (!module) {
    throw new Error(`Sheet module ${sheetName} not found`);
  }

  // Add event handler to module code
  const eventHandler = `Private Sub Worksheet_${eventType}()\n${handler}\nEnd Sub\n`;
  const newCode = module.code + '\n' + eventHandler;

  return {
    ...state,
    modules: new Map(state.modules).set(sheetName, {
      ...module,
      code: newCode
    })
  };
}

export function registerFormEvent(
  state: VBAState,
  formName: string,
  eventType: 'Initialize' | 'Terminate' | 'Activate' | 'Deactivate',
  handler: string
): VBAState {
  const form = state.forms.get(formName);
  if (!form) {
    throw new Error(`Form ${formName} not found`);
  }

  // Add event handler to form code
  const eventHandler = `Private Sub UserForm_${eventType}()\n${handler}\nEnd Sub\n`;
  const newCode = form.code + '\n' + eventHandler;

  return {
    ...state,
    forms: new Map(state.forms).set(formName, {
      ...form,
      code: newCode
    })
  };
}

export function registerControlEvent(
  state: VBAState,
  formName: string,
  controlName: string,
  eventType: 'Click' | 'Change' | 'Enter' | 'Exit' | 'KeyPress' | 'MouseMove',
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
  const eventHandler = `Private Sub ${controlName}_${eventType}()\n${handler}\nEnd Sub\n`;
  const newCode = form.code + '\n' + eventHandler;

  return {
    ...state,
    forms: new Map(state.forms).set(formName, {
      ...form,
      code: newCode
    })
  };
}