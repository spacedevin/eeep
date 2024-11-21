import { VBAState } from '../../spec/VBA';

export function addVBAModule(
  state: VBAState,
  name: string,
  type: 'standard' | 'class' | 'form' | 'sheet',
  code: string,
  isPrivate: boolean = false
): VBAState {
  const newModules = new Map(state.modules);
  newModules.set(name, {
    name,
    type,
    code,
    isPrivate
  });

  return {
    ...state,
    modules: newModules
  };
}

export function updateVBAModuleCode(
  state: VBAState,
  name: string,
  code: string
): VBAState {
  const module = state.modules.get(name);
  if (!module) {
    throw new Error(`Module '${name}' not found`);
  }

  return {
    ...state,
    modules: new Map(state.modules).set(name, {
      ...module,
      code
    })
  };
}

export function setVBAModulePrivate(
  state: VBAState,
  name: string,
  isPrivate: boolean
): VBAState {
  const module = state.modules.get(name);
  if (!module) {
    throw new Error(`Module '${name}' not found`);
  }

  return {
    ...state,
    modules: new Map(state.modules).set(name, {
      ...module,
      isPrivate
    })
  };
}

export function removeVBAModule(
  state: VBAState,
  name: string
): VBAState {
  const newModules = new Map(state.modules);
  if (!newModules.delete(name)) {
    throw new Error(`Module '${name}' not found`);
  }

  return {
    ...state,
    modules: newModules
  };
}

export function validateVBACode(code: string): boolean {
  // Basic VBA syntax validation
  // This is a simplified validation - in a real implementation,
  // you would want to use a proper VBA parser
  try {
    // Check for basic structure
    if (!code.trim()) {
      return false;
    }

    // Check for matching Sub/End Sub
    const subCount = (code.match(/\bSub\b/g) || []).length;
    const endSubCount = (code.match(/\bEnd Sub\b/g) || []).length;
    if (subCount !== endSubCount) {
      return false;
    }

    // Check for matching Function/End Function
    const funcCount = (code.match(/\bFunction\b/g) || []).length;
    const endFuncCount = (code.match(/\bEnd Function\b/g) || []).length;
    if (funcCount !== endFuncCount) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}