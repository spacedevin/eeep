import {
  createVBAProject,
  addVBAModule,
  addVBAReference,
  protectVBAProject
} from '../../vba/project';

describe('VBA Project Management', () => {
  test('creates VBA project', () => {
    const project = createVBAProject('TestProject');
    expect(project.project.name).toBe('TestProject');
    expect(project.modules.size).toBe(0);
    expect(project.forms.size).toBe(0);
  });

  test('adds VBA module', () => {
    let state = createVBAProject('TestProject');
    state = addVBAModule(state, 'Module1', 'standard', 'Sub Test()\nEnd Sub');
    
    const module = state.modules.get('Module1');
    expect(module).toBeDefined();
    expect(module?.type).toBe('standard');
    expect(module?.code).toBe('Sub Test()\nEnd Sub');
  });

  test('adds VBA reference', () => {
    let state = createVBAProject('TestProject');
    state = addVBAReference(
      state,
      'Excel',
      '{00020813-0000-0000-C000-000000000046}',
      1,
      9
    );
    
    expect(state.project.references).toHaveLength(1);
    expect(state.project.references[0].name).toBe('Excel');
    expect(state.project.references[0].guid).toBe('{00020813-0000-0000-C000-000000000046}');
  });

  test('protects VBA project', () => {
    let state = createVBAProject('TestProject');
    state = protectVBAProject(state, {
      password: 'test123',
      locked: true,
      viewable: false
    });
    
    expect(state.project.protection.locked).toBe(true);
    expect(state.project.protection.viewable).toBe(false);
  });
});