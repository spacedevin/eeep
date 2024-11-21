import {
  addVBAForm,
  addVBAFormControl,
  updateVBAFormCode
} from '../../vba/forms';
import { createVBAProject } from '../../vba/project';

describe('VBA Forms Management', () => {
  test('adds VBA form', () => {
    let state = createVBAProject('TestProject');
    state = addVBAForm(
      state,
      'Form1',
      [
        {
          name: 'Button1',
          type: 'CommandButton',
          properties: new Map([['Caption', 'Click Me']])
        }
      ],
      'Private Sub Button1_Click()\nEnd Sub'
    );
    
    const form = state.forms.get('Form1');
    expect(form).toBeDefined();
    expect(form?.controls).toHaveLength(1);
    expect(form?.code).toBe('Private Sub Button1_Click()\nEnd Sub');
  });

  test('adds control to form', () => {
    let state = createVBAProject('TestProject');
    state = addVBAForm(state, 'Form1', [], '');
    
    state = addVBAFormControl(state, 'Form1', {
      name: 'TextBox1',
      type: 'TextBox',
      properties: new Map([['Text', '']])
    });
    
    const form = state.forms.get('Form1');
    expect(form?.controls).toHaveLength(1);
    expect(form?.controls[0].name).toBe('TextBox1');
  });

  test('updates form code', () => {
    let state = createVBAProject('TestProject');
    state = addVBAForm(state, 'Form1', [], '');
    
    const newCode = 'Private Sub Form_Load()\nEnd Sub';
    state = updateVBAFormCode(state, 'Form1', newCode);
    
    const form = state.forms.get('Form1');
    expect(form?.code).toBe(newCode);
  });

  test('throws error for invalid form', () => {
    const state = createVBAProject('TestProject');
    expect(() => addVBAFormControl(state, 'InvalidForm', {
      name: 'Button1',
      type: 'CommandButton',
      properties: new Map()
    })).toThrow();
    
    expect(() => updateVBAFormCode(state, 'InvalidForm', '')).toThrow();
  });
});