import { StyleState } from '../../spec/Styles';

export interface TextEffectOptions {
  outline?: boolean;
  shadow?: boolean;
  emboss?: boolean;
  imprint?: boolean;
  spacing?: number;
  kerning?: number;
  position?: 'normal' | 'superscript' | 'subscript';
}

export function setTextEffects(style: StyleState, effects: TextEffectOptions): StyleState {
  return {
    ...style,
    font: {
      ...style.font,
      ...effects
    }
  };
}

export function setCharacterSpacing(style: StyleState, spacing: number): StyleState {
  return {
    ...style,
    font: {
      ...style.font,
      spacing
    }
  };
}

export function setKerning(style: StyleState, kerning: number): StyleState {
  return {
    ...style,
    font: {
      ...style.font,
      kerning
    }
  };
}

export function setTextPosition(
  style: StyleState,
  position: 'normal' | 'superscript' | 'subscript'
): StyleState {
  return {
    ...style,
    font: {
      ...style.font,
      position
    }
  };
}