import { StyleState } from '../../spec/Styles';

export interface EffectOptions {
  shadow?: {
    type: 'outer' | 'inner';
    color: string;
    transparency?: number;
    blur?: number;
    distance?: number;
    angle?: number;
  };
  glow?: {
    color: string;
    transparency?: number;
    radius?: number;
  };
  softEdge?: {
    radius: number;
  };
}

export function setShadowEffect(style: StyleState, options: EffectOptions['shadow']): StyleState {
  return {
    ...style,
    effects: {
      ...style.effects,
      shadow: options
    }
  };
}

export function setGlowEffect(style: StyleState, options: EffectOptions['glow']): StyleState {
  return {
    ...style,
    effects: {
      ...style.effects,
      glow: options
    }
  };
}

export function setSoftEdgeEffect(style: StyleState, options: EffectOptions['softEdge']): StyleState {
  return {
    ...style,
    effects: {
      ...style.effects,
      softEdge: options
    }
  };
}

export function clearEffects(style: StyleState): StyleState {
  return {
    ...style,
    effects: undefined
  };
}