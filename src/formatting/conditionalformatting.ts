import { ConditionalFormatState } from '../../spec/ConditionalFormatting';

export function createConditionalFormat(): ConditionalFormatState {
  return {
    rules: [],
    options: {
      stopIfTrue: false,
      evaluationOrder: 'topDown'
    }
  };
}

export function addFormatRule(
  format: ConditionalFormatState,
  rule: ConditionalFormatState['rules'][0]
): ConditionalFormatState {
  return {
    ...format,
    rules: [...format.rules, { ...rule, priority: format.rules.length + 1 }]
  };
}

export function removeFormatRule(
  format: ConditionalFormatState,
  index: number
): ConditionalFormatState {
  const newRules = [...format.rules];
  newRules.splice(index, 1);
  return {
    ...format,
    rules: newRules
  };
}

export function createCellValueRule(
  ranges: string[],
  operator: 'greaterThan' | 'lessThan' | 'between' | 'equal' | 'notEqual' | 'containsText' | 'notContainsText' | 'beginsWith' | 'endsWith',
  value1: string | number,
  value2?: string | number,
  style?: ConditionalFormatState['rules'][0]['style']
): ConditionalFormatState['rules'][0] {
  return {
    type: 'cellValue',
    priority: 0, // Will be set by addFormatRule
    ranges,
    operator,
    value1,
    value2,
    style
  };
}

export function createColorScaleRule(
  ranges: string[],
  minimum: {
    type: 'num' | 'percent' | 'formula' | 'percentile';
    value: number;
    color: string;
  },
  maximum: {
    type: 'num' | 'percent' | 'formula' | 'percentile';
    value: number;
    color: string;
  },
  midpoint?: {
    type: 'num' | 'percent' | 'formula' | 'percentile';
    value: number;
    color: string;
  }
): ConditionalFormatState['rules'][0] {
  return {
    type: 'colorScale',
    priority: 0, // Will be set by addFormatRule
    ranges,
    colorScale: {
      minimum,
      maximum,
      midpoint
    }
  };
}

export function createDataBarRule(
  ranges: string[],
  color: string,
  options?: {
    minLength?: number;
    maxLength?: number;
    showValue?: boolean;
    gradient?: boolean;
    borderColor?: string;
    negativeFillColor?: string;
    negativeBorderColor?: string;
    axisColor?: string;
    direction?: 'leftToRight' | 'rightToLeft';
  }
): ConditionalFormatState['rules'][0] {
  return {
    type: 'dataBar',
    priority: 0, // Will be set by addFormatRule
    ranges,
    dataBar: {
      color,
      ...options
    }
  };
}

export function createIconSetRule(
  ranges: string[],
  type: '3Arrows' | '3ArrowsGray' | '3Flags' | '3TrafficLights1' | '3TrafficLights2' | '3Signs' | '3Symbols' | '3Symbols2' | '4Arrows' | '4ArrowsGray' | '4RedToBlack' | '4Rating' | '4TrafficLights' | '5Arrows' | '5ArrowsGray' | '5Rating' | '5Quarters',
  thresholds: Array<{
    type: 'num' | 'percent' | 'formula' | 'percentile';
    value: number;
    operator: 'greaterThan' | 'greaterThanOrEqual';
  }>,
  options?: {
    reverse?: boolean;
    showValue?: boolean;
  }
): ConditionalFormatState['rules'][0] {
  return {
    type: 'iconSet',
    priority: 0, // Will be set by addFormatRule
    ranges,
    iconSet: {
      type,
      thresholds,
      reverse: options?.reverse,
      showValue: options?.showValue
    }
  };
}