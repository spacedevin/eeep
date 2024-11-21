export interface VBAState {
  project: {
    name: string;
    description?: string;
    references: Array<{
      name: string;
      guid: string;
      major: number;
      minor: number;
    }>;
  };

  modules: Map<string, {
    name: string;
    type: 'standard' | 'class' | 'form' | 'sheet';
    code: string;
    isPrivate: boolean;
  }>;

  forms: Map<string, {
    name: string;
    controls: Array<{
      name: string;
      type: string;
      properties: Map<string, any>;
    }>;
    code: string;
  }>;

  security: {
    signature?: {
      certificate: string;
      timestamp?: Date;
    };
    trustSettings: {
      trustVBAProjects: boolean;
      trustAccessVBOM: boolean;
      trustMacros: 'disable' | 'enable' | 'prompt';
    };
  };
}