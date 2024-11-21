import { GradientState } from '../../spec/Gradients';

export function createGradient(type: 'linear' | 'radial'): GradientState {
  return {
    type,
    stops: [],
    settings: {
      spreadMethod: 'pad',
      colorSpace: 'rgb',
      interpolation: 'linear'
    }
  };
}

export function addGradientStop(
  gradient: GradientState,
  position: number,
  color: string,
  options?: {
    opacity?: number;
    transition?: 'linear' | 'ease' | 'step';
  }
): GradientState {
  return {
    ...gradient,
    stops: [
      ...gradient.stops,
      {
        position,
        color,
        opacity: options?.opacity,
        transition: options?.transition
      }
    ]
  };
}

export function setGradientSettings(
  gradient: GradientState,
  settings: Partial<GradientState['settings']>
): GradientState {
  return {
    ...gradient,
    settings: {
      ...gradient.settings,
      ...settings
    }
  };
}

export function setRadialGradientShape(
  gradient: GradientState,
  shape: 'circle' | 'ellipse',
  options?: {
    size?: 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner';
    center?: { x: number; y: number };
    focal?: { x: number; y: number; radius: number };
  }
): GradientState {
  if (gradient.type !== 'radial') {
    throw new Error('Can only set radial properties on radial gradients');
  }

  return {
    ...gradient,
    radial: {
      shape,
      size: options?.size || 'farthest-corner',
      center: options?.center || { x: 0.5, y: 0.5 },
      focal: options?.focal
    }
  };
}