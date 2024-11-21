import {
  registerWorkbookEvent,
  registerWorksheetEvent,
  registerFormEvent,
  registerControlEvent
} from '../../vba/events';
import { createVBAProject, addVBAModule } from '../../vba/project';
import { addVBAForm, addVBAFormControl } from '../../vba/forms';

describe('VBA Events', () => {
  describe('Workbook Events', () => {
    test('registers workbook event', () => {
      let state = createVBAProject('TestProject');
      state = addVBAModule(state, 'ThisWorkbook', 'standard', '');
      
      state = registerWorkbookEvent(
        state,
        'Open',
        'MsgBox "Workbook opened"'
      );
      
      const module = state.modules.get('ThisWorkbook');
      expect(module?.code).toContain('Workbook_Open');
      expect(module?.code).toContain('MsgBox "Workbook opened"');
    });

    test('throws error for missing ThisWorkbook module', () => {
      const state = createVBAProject('TestProject');
      expect(() => registerWorkbookEvent(
        state,
        'Open',
        'MsgBox "Test"'
      )).toThrow();
    });
  });

  describe('Worksheet Events', () => {
    test('registers worksheet event', () => {
      let state = createVBAProject('TestProject');
      state = addVBAModule(state, 'Sheet1', 'sheet', '');
      
      state = registerWorksheetEvent(
        state,
        'Sheet1',
        'Change',
        'MsgBox "Cell changed"'
      );
      
      const module = state.modules.get('Sheet1');
      expect(module?.code).toContain('Worksheet_Change');
      expect(module?.code).toContain('MsgBox "Cell changed"');
    });

    test('throws error for missing sheet module', () => {
      const state = createVBAProject('TestProject');
      expect(() => registerWorksheetEvent(
        state,
        'Sheet1',
        'Change',
        'MsgBox "Test"'
      )).toThrow();
    });
  });

  describe('Form Events', () => {
    test('registers form event', () => {
      let state = createVBAProject('TestProject');
      state = addVBAForm(state, 'Form1', [], '');
      
      state = registerFormEvent(
        state,
        'Form1',
        'Initialize',
        'MsgBox "Form initialized"'
      );
      
      const form = state.forms.get('Form1');
      expect(form?.code).toContain('UserForm_Initialize');
      expect(form?.code).toContain('MsgBox "Form initialized"');
    });

    test('throws error for missing form', () => {
      const state = createVBAProject('TestProject');
      expect(() => registerFormEvent(
        state,
        'Form1',
        'Initialize',
        'MsgBox "Test"'
      )).toThrow();
    });
  });

  describe('Control Events', () => {
    test('registers control event', () => {
      let state = createVBAProject('TestProject');
      state = addVBAForm(state, 'Form1', [
        {
          name: 'Button1',
          type: 'CommandButton',
          properties: new Map()
        }
      ], '');
      
      state = registerControlEvent(
        state,
        'Form1',
        'Button1',
        'Click',
        'MsgBox "Button clicked"'
      );
      
      const form = state.forms.get('Form1');
      expect(form?.code).toContain('Button1_Click');
      expect(form?.code).toContain('MsgBox "Button clicked"');
    });

    test('throws error for missing control', () => {
      let state = createVBAProject('TestProject');
      state = addVBAForm(state, 'Form1', [], '');
      
      expect(() => registerControlEvent(
        state,
        'Form1',
        'Button1',
        'Click',
        'MsgBox "Test"'
      )).toThrow();
    });
  });
});