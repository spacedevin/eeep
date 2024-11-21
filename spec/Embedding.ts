export interface EmbeddingState {
  objects: Map<string, {
    type: 'ole' | 'activex' | 'file' | 'media';
    id: string;
    data: Uint8Array;
    properties: {
      name: string;
      progId?: string;
      className?: string;
      visible: boolean;
      autoLoad: boolean;
      updateMode: 'auto' | 'manual' | 'disabled';
    };
    position: {
      x: number;
      y: number;
      width: number;
      height: number;
      zOrder: number;
    };
    security: {
      trusted: boolean;
      signed: boolean;
      certificate?: string;
      permissions: Set<'read' | 'write' | 'execute'>;
    };
  }>;

  links: Map<string, {
    source: string;
    target: string;
    type: 'file' | 'url' | 'workbook';
    updateMode: 'auto' | 'manual' | 'disabled';
    lastUpdate?: Date;
  }>;

  interaction: {
    events: Map<string, {
      click?: () => void;
      doubleClick?: () => void;
      rightClick?: () => void;
    }>;
    automation: {
      enabled: boolean;
      methods: Map<string, (...args: any[]) => any>;
      properties: Map<string, {
        get?: () => any;
        set?: (value: any) => void;
      }>;
    };
  };
}