import { PatternState } from '../../spec/Patterns';

export function createPattern(type: 'solid' | 'gradient' | 'linear' | 'radial' | 'texture'): PatternState {
  return {
    fills: {
      type,
      properties: {
        colors: [],
        opacity: 1,
        direction: 0,
        scale: 1
      }
    },
    borders: {
      style: 'solid',
      properties: {
        width: 1,
        color: '#000000'
      }
    },
    custom: new Map()
  };
}

export function setPatternColors(pattern: PatternState, colors: string[]): PatternState {
  return {
    ...pattern,
    fills: {
      ...pattern.fills,
      properties: {
        ...pattern.fills.properties,
        colors
      }
    }
  };
}

export function setPatternProperties(
  pattern: PatternState,
  properties: Partial<PatternState['fills']['properties']>
): PatternState {
  return {
    ...pattern,
    fills: {
      ...pattern.fills,
      properties: {
        ...pattern.fills.properties,
        ...properties
      }
    }
  };
}

export function setBorderProperties(
  pattern: PatternState,
  properties: Partial<PatternState['borders']['properties']>
): PatternState {
  return {
    ...pattern,
    borders: {
      ...pattern.borders,
      properties: {
        ...pattern.borders.properties,
        ...properties
      }
    }
  };
}

export function addCustomPattern(
  pattern: PatternState,
  name: string,
  type: 'fill' | 'border',
  definition: string,
  properties: Map<string, any>
): PatternState {
  const newCustom = new Map(pattern.custom);
  newCustom.set(name, { name, type, definition, properties });
  
  return {
    ...pattern,
    custom: newCustom
  };
}