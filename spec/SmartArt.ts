export interface SmartArtState {
  layout: {
    type: 'list' | 'process' | 'cycle' | 'hierarchy' | 'custom';
    properties: {
      direction: 'horizontal' | 'vertical';
      alignment: 'start' | 'center' | 'end';
      spacing: number;
      distribution: 'even' | 'balanced';
    };
    custom?: {
      template: string;
      parameters: Map<string, any>;
    };
  };

  nodes: Array<{
    id: string;
    type: 'normal' | 'assistant' | 'connector';
    parent?: string;
    children: string[];
    level: number;
    content: {
      text: string;
      formatting?: {
        font?: any;
        color?: string;
        size?: number;
        effects?: any[];
      };
    };
    style: {
      shape: string;
      fill?: any;
      border?: any;
      effects?: any[];
    };
  }>;

  connections: Array<{
    from: string;
    to: string;
    type: 'straight' | 'elbow' | 'curved';
    style: {
      line: string;
      arrow: string;
      color: string;
      width: number;
    };
  }>;

  animation?: {
    type: 'none' | 'byNode' | 'byLevel' | 'custom';
    sequence: 'inOrder' | 'reverse' | 'random';
    timing: {
      duration: number;
      delay: number;
      easing: string;
    };
  };
}