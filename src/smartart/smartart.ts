import { SmartArtState } from '../../spec/SmartArt';

export function createSmartArt(type: 'list' | 'process' | 'cycle' | 'hierarchy' | 'custom'): SmartArtState {
  return {
    layout: {
      type,
      properties: {
        direction: 'horizontal',
        alignment: 'center',
        spacing: 20,
        distribution: 'even'
      }
    },
    nodes: [],
    connections: [],
    animation: {
      type: 'none',
      sequence: 'inOrder',
      timing: {
        duration: 500,
        delay: 0,
        easing: 'ease'
      }
    }
  };
}

export function addSmartArtNode(state: SmartArtState, text: string, parentId?: string): SmartArtState {
  const newNode = {
    id: `node_${state.nodes.length + 1}`,
    type: 'normal' as const,
    parent: parentId,
    children: [],
    level: parentId ? state.nodes.find(n => n.id === parentId)?.level! + 1 : 0,
    content: {
      text
    },
    style: {
      shape: 'rectangle'
    }
  };

  return {
    ...state,
    nodes: [...state.nodes, newNode]
  };
}

export function connectSmartArtNodes(state: SmartArtState, fromId: string, toId: string): SmartArtState {
  const newConnection = {
    from: fromId,
    to: toId,
    type: 'straight' as const,
    style: {
      line: 'solid',
      arrow: 'standard',
      color: '#000000',
      width: 1
    }
  };

  return {
    ...state,
    connections: [...state.connections, newConnection]
  };
}