import {
  setVBASecurity,
  signVBAProject,
  verifyVBASignature
} from '../../vba/security';
import { createVBAProject } from '../../vba/project';

describe('VBA Security', () => {
  test('sets security settings', () => {
    let state = createVBAProject('TestProject');
    state = setVBASecurity(state, {
      trustVBAProjects: true,
      trustAccessVBOM: true,
      trustMacros: 'prompt'
    });
    
    expect(state.security.trustSettings.trustVBAProjects).toBe(true);
    expect(state.security.trustSettings.trustAccessVBOM).toBe(true);
    expect(state.security.trustSettings.trustMacros).toBe('prompt');
  });

  test('signs VBA project', () => {
    let state = createVBAProject('TestProject');
    const timestamp = new Date();
    state = signVBAProject(state, 'test-certificate', timestamp);
    
    expect(state.security.signature).toBeDefined();
    expect(state.security.signature?.certificate).toBe('test-certificate');
    expect(state.security.signature?.timestamp).toBe(timestamp);
  });

  test('verifies VBA signature', () => {
    let state = createVBAProject('TestProject');
    expect(verifyVBASignature(state)).toBe(false);
    
    state = signVBAProject(state, 'test-certificate');
    expect(verifyVBASignature(state)).toBe(true);
  });
});