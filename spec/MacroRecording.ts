export interface MacroRecordingState {
  recording: {
    active: boolean;
    paused: boolean;
    mode: 'relative' | 'absolute';
    startTime: Date;
    actions: Array<{
      type: string;
      target: string;
      operation: string;
      parameters: any[];
      timestamp: Date;
    }>;
  };

  settings: {
    includeSelection: boolean;
    includeFormatting: boolean;
    includeValues: boolean;
    includeFormulas: boolean;
    useRelativeReferences: boolean;
  };

  generation: {
    language: 'vba' | 'typescript' | 'javascript';
    options: {
      includeComments: boolean;
      formatCode: boolean;
      createFunction: boolean;
      errorHandling: boolean;
    };
    templates: Map<string, {
      code: string;
      parameters: string[];
    }>;
  };

  management: {
    maxActions: number;
    autoStop?: {
      duration?: number;
      actions?: number;
    };
    filters: Array<{
      type: string;
      condition: (action: any) => boolean;
    }>;
  };
}