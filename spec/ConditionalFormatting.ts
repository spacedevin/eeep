export interface ConditionalFormatState {
  rules: Array<{
    type: 'cellValue' | 'colorScale' | 'dataBar' | 'iconSet' | 'top10' | 'aboveAverage' | 'uniqueValues' | 'duplicateValues' | 'expression';
    priority: number;
    stopIfTrue?: boolean;
    formula?: string;
    ranges: string[];
    
    // Cell Value Rule Properties
    operator?: 'greaterThan' | 'lessThan' | 'between' | 'equal' | 'notEqual' | 'containsText' | 'notContainsText' | 'beginsWith' | 'endsWith';
    value1?: string | number;
    value2?: string | number;
    
    // Color Scale Properties
    colorScale?: {
      minimum: {
        type: 'num' | 'percent' | 'formula' | 'percentile';
        value: number;
        color: string;
      };
      midpoint?: {
        type: 'num' | 'percent' | 'formula' | 'percentile';
        value: number;
        color: string;
      };
      maximum: {
        type: 'num' | 'percent' | 'formula' | 'percentile';
        value: number;
        color: string;
      };
    };
    
    // Data Bar Properties
    dataBar?: {
      minLength?: number;
      maxLength?: number;
      showValue?: boolean;
      gradient?: boolean;
      color: string;
      borderColor?: string;
      negativeFillColor?: string;
      negativeBorderColor?: string;
      axisColor?: string;
      direction?: 'leftToRight' | 'rightToLeft';
    };
    
    // Icon Set Properties
    iconSet?: {
      type: '3Arrows' | '3ArrowsGray' | '3Flags' | '3TrafficLights1' | '3TrafficLights2' | '3Signs' | '3Symbols' | '3Symbols2' | '4Arrows' | '4ArrowsGray' | '4RedToBlack' | '4Rating' | '4TrafficLights' | '5Arrows' | '5ArrowsGray' | '5Rating' | '5Quarters';
      reverse?: boolean;
      showValue?: boolean;
      thresholds: Array<{
        type: 'num' | 'percent' | 'formula' | 'percentile';
        value: number;
        operator: 'greaterThan' | 'greaterThanOrEqual';
      }>;
    };
    
    // Style Properties
    style?: {
      font?: {
        bold?: boolean;
        italic?: boolean;
        color?: string;
      };
      fill?: {
        color: string;
        pattern?: string;
      };
      border?: {
        style?: string;
        color?: string;
      };
      numberFormat?: string;
    };
  }>;
  
  options: {
    stopIfTrue?: boolean;
    defaultPriority?: number;
    evaluationOrder?: 'topDown' | 'bottomUp';
  };
}