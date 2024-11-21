import { VBAState } from '../../spec/VBA';

export function setVBASecurity(
  state: VBAState,
  settings: {
    trustVBAProjects?: boolean;
    trustAccessVBOM?: boolean;
    trustMacros?: 'disable' | 'enable' | 'prompt';
  }
): VBAState {
  return {
    ...state,
    security: {
      ...state.security,
      trustSettings: {
        ...state.security.trustSettings,
        ...settings
      }
    }
  };
}

export function signVBAProject(
  state: VBAState,
  certificate: string,
  timestamp?: Date
): VBAState {
  return {
    ...state,
    security: {
      ...state.security,
      signature: {
        certificate,
        timestamp
      }
    }
  };
}

export function verifyVBASignature(state: VBAState): boolean {
  if (!state.security.signature) {
    return false;
  }

  // TODO: Implement actual signature verification
  // For now, just check if signature exists
  return true;
}