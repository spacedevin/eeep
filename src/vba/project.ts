import { VBAState } from '../../spec/VBA';

export function createVBAProject(name: string): VBAState {
  return {
    project: {
      name,
      description: '',
      references: []
    },
    modules: new Map(),
    forms: new Map(),
    security: {
      trustSettings: {
        trustVBAProjects: false,
        trustAccessVBOM: false,
        trustMacros: 'disable'
      }
    }
  };
}

export function addVBAModule(
  state: VBAState,
  name: string,
  type: 'standard' | 'class' | 'form' | 'sheet',
  code: string
): VBAState {
  const newModules = new Map(state.modules);
  newModules.set(name, {
    name,
    type,
    code,
    isPrivate: false
  });

  return {
    ...state,
    modules: newModules
  };
}

export function addVBAReference(
  state: VBAState,
  name: string,
  guid: string,
  major: number,
  minor: number
): VBAState {
  return {
    ...state,
    project: {
      ...state.project,
      references: [
        ...state.project.references,
        { name, guid, major, minor }
      ]
    }
  };
}