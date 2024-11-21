import {
  addVBAModule,
  updateVBAModuleCode,
  setVBAModulePrivate,
  removeVBAModule,
  validateVBACode
} from '../../vba/modules';
import { createVBAProject } from '../../vba/project';

describe('VBA Modules', () => {
  test('adds VBA module', () => {
    let state = createVBAProject('TestProject');
    state = addVBAModule(
      state,
      'Module1',
      'standard',
      'Sub Test()\nEnd Sub',
      false
    );
    
    const module = state.modules.get('Module1');
    expect(module).toBeDefined();
    expect(module?.type).toBe('standard');
    expect(module?.code).toBe('Sub Test()\nEnd Sub');
    expect(module?.isPrivate).toBe(false);
  });

  test('updates module code', () => {
    let state = createVBAProject('TestProject');
    state = addVBAModule(state, 'Module1', 'standard', '');
    
    const newCode = 'Sub NewTest()\nEnd Sub';
    state = updateVBAModuleCode(state, 'Module1', newCode);
    
    const module = state.modules.get('Module1');
    expect(module?.code).toBe(newCode);
  });

  test('sets module privacy', () => {
    let state = createVBAProject('TestProject');
    state = addVBAModule(state, 'Module1', 'standard', '');
    state = setVBAModulePrivate(state, 'Module1', true);
    
    const module = state.modules.get('Module1');
    expect(module?.isPrivate).toBe(true);
  });

  test('removes module', () => {
    let state = createVBAProject('TestProject');
    state = addVBAModule(state, 'Module1', 'standard', '');
    state = removeVBAModule(state, 'Module1');
    
    expect(state.modules.has('Module1')).toBe(false);
  });

  test('validates VBA code', () => {
    expect(validateVBACode('Sub Test()\nEnd Sub')).toBe(true);
    expect(validateVBACode('Function Test()\nEnd Function')).toBe(true);
    expect(validateVBACode('Sub Test()\n')).toBe(false); // Missing End Sub
    expect(validateVBACode('')).toBe(false); // Empty code
  });

  test('throws error for invalid module operations', () => {
    const state = createVBAProject('TestProject');
    expect(() => updateVBAModuleCode(state, 'Invalid', '')).toThrow();
    expect(() => setVBAModulePrivate(state, 'Invalid', true)).toThrow();
    expect(() => removeVBAModule(state, 'Invalid')).toThrow();
  });
});