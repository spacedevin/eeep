import { SmartArtState } from '../../spec/SmartArt';

export function setSmartArtStyle(
  state: SmartArtState,
  nodeId: string,
  style: {
    shape: string;
    fill?: {
      color?: string;
      transparency?: number;
    };
    border?: {
      color?: string;
      width?: number;
      style?: string;
    };
    effects?: any[];
  }
): SmartArtState {
  return {
    ...state,
    nodes: state.nodes.map(node => 
      node.id === nodeId ? {
        ...node,
        style: {
          ...node.style,
          ...style
        }
      } : node
    )
  };
}

export function setSmartArtTextStyle(
  state: SmartArtState,
  nodeId: string,
  formatting: {
    font?: {
      name?: string;
      size?: number;
      bold?: boolean;
      italic?: boolean;
      color?: string;
    };
    effects?: any[];
  }
): SmartArtState {
  return {
    ...state,
    nodes: state.nodes.map(node => 
      node.id === nodeId ? {
        ...node,
        content: {
          ...node.content,
          formatting
        }
      } : node
    )
  };
}

export function setSmartArtLayout(
  state: SmartArtState,
  properties: {
    direction?: 'horizontal' | 'vertical';
    alignment?: 'start' | 'center' | 'end';
    spacing?: number;
    distribution?: 'even' | 'balanced';
  }
): SmartArtState {
  return {
    ...state,
    layout: {
      ...state.layout,
      properties: {
        ...state.layout.properties,
        ...properties
      }
    }
  };
}
