import { StyleState } from '../../spec/Styles';

export interface NamedStyle extends StyleState {
  name: string;
  builtIn: boolean;
  customBuiltin: boolean;
  hidden: boolean;
  iLevel: number;
  xfId: number;
}

export function createNamedStyle(name: string): NamedStyle {
  return {
    name,
    builtIn: false,
    customBuiltin: false,
    hidden: false,
    iLevel: 0,
    xfId: 0,
    numberFormat: {
      format: 'General'
    },
    fill: {
      type: 'pattern',
      pattern: 'solid'
    }
  };
}

export function setBuiltIn(style: NamedStyle, builtIn: boolean): NamedStyle {
  return {
    ...style,
    builtIn,
    customBuiltin: false
  };
}

export function setCustomBuiltIn(style: NamedStyle, custom: boolean): NamedStyle {
  return {
    ...style,
    customBuiltin: custom,
    builtIn: false
  };
}

export function setHidden(style: NamedStyle, hidden: boolean): NamedStyle {
  return {
    ...style,
    hidden
  };
}

export function setIndentLevel(style: NamedStyle, level: number): NamedStyle {
  return {
    ...style,
    iLevel: Math.max(0, Math.min(level, 250))
  };
}