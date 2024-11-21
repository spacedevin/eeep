export interface AnnotationState {
  type: 'text' | 'visual' | 'smart';
  id: string;
  
  content: {
    text?: string;
    shape?: {
      type: string;
      points: Array<{ x: number; y: number }>;
    };
    link?: {
      target: string;
      type: 'internal' | 'external';
    };
  };
  
  position: {
    type: 'absolute' | 'relative' | 'anchored' | 'floating';
    x: number;
    y: number;
    width?: number;
    height?: number;
    reference?: string;
  };
  
  format: {
    font?: {
      name?: string;
      size?: number;
      bold?: boolean;
      italic?: boolean;
      color?: string;
    };
    fill?: {
      color?: string;
      transparency?: number;
    };
    border?: {
      style?: string;
      color?: string;
      width?: number;
    };
  };
  
  visibility: {
    visible: boolean;
    printable: boolean;
    onScreen: boolean;
    zOrder: number;
  };
  
  metadata?: Map<string, any>;
}