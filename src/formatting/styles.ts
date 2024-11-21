import { StyleState } from '../../spec/Styles';

export function createStyle(): StyleState {
  return {
    numberFormat: {
      format: 'General',
      culture: undefined
    },
    fill: {
      type: 'pattern',
      pattern: 'solid'
    },
    xfId: 0
  };
}

export function setFill(style: StyleState, fill: Required<NonNullable<StyleState['fill']>>): StyleState {
  const currentFill = style.fill || { type: 'pattern', pattern: 'solid' };
  
  return {
    ...style,
    fill: {
      type: fill.type,
      pattern: fill.pattern,
      color: fill.color,
      backgroundColor: fill.backgroundColor,
      gradientType: fill.gradientType,
      gradientDegree: fill.gradientDegree,
      gradientStops: fill.gradientStops
    }
  };
}

export function setFont(style: StyleState, font: StyleState['font']): StyleState {
  return {
    ...style,
    font: {
      ...style.font,
      ...font
    }
  };
}

export function setBorder(style: StyleState, border: StyleState['border']): StyleState {
  return {
    ...style,
    border: {
      ...style.border,
      ...border
    }
  };
}

export function setAlignment(style: StyleState, alignment: StyleState['alignment']): StyleState {
  return {
    ...style,
    alignment
  };
}

export function setNumberFormat(style: StyleState, format: string): StyleState {
  return {
    ...style,
    numberFormat: {
      format,
      culture: undefined
    }
  };
}

export function setProtection(style: StyleState, protection: StyleState['protection']): StyleState {
  return {
    ...style,
    protection
  };
}