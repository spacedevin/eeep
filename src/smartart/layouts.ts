import { SmartArtState } from '../../spec/SmartArt';

export function setSmartArtLayoutType(
  state: SmartArtState,
  type: 'list' | 'process' | 'cycle' | 'hierarchy' | 'custom'
): SmartArtState {
  return {
    ...state,
    layout: {
      ...state.layout,
      type
    }
  };
}

export function setSmartArtAnimation(
  state: SmartArtState,
  animation: {
    type: 'none' | 'byNode' | 'byLevel' | 'custom';
    sequence: 'inOrder' | 'reverse' | 'random';
    timing: {
      duration: number;
      delay: number;
      easing: string;
    };
  }
): SmartArtState {
  return {
    ...state,
    animation
  };
}

export function setSmartArtCustomLayout(
  state: SmartArtState,
  template: string,
  parameters: Map<string, any>
): SmartArtState {
  return {
    ...state,
    layout: {
      ...state.layout,
      type: 'custom',
      custom: {
        template,
        parameters
      }
    }
  };
}
