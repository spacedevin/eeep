export type ChartType = 'column' | 'bar' | 'line' | 'pie' | 'area' | 'scatter' | 'bubble' | 'stock' | 'surface' | 'radar' | 'doughnut' | 'sunburst';

export interface FontProperties {
  name?: string;
  size?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
}

export interface BorderProperties {
  style?: 'solid' | 'dash' | 'dot';
  color?: string;
  width?: number;
}

export interface FillProperties {
  type: 'solid' | 'pattern' | 'gradient' | 'picture' | 'none';
  color?: string;
  transparency?: number;
  pattern?: string;
  gradient?: {
    type: 'linear' | 'radial' | 'rectangular' | 'path';
    angle?: number;
    stops: Array<{
      position: number;
      color: string;
    }>;
  };
}

export interface AxisProperties {
  title?: {
    text: string;
    font?: FontProperties;
  };
  format?: string;
  gridlines?: {
    major?: boolean;
    minor?: boolean;
    majorStyle?: BorderProperties;
    minorStyle?: BorderProperties;
  };
  scaling?: {
    min?: number;
    max?: number;
    majorUnit?: number;
    minorUnit?: number;
    logarithmic?: boolean;
    logBase?: number;
  };
}

export interface ChartState {
  type: ChartType;
  series: Array<{
    name: string;
    values: any[];
    categories?: any[];
    type?: ChartType;
    plotOrder?: number;
    trendline?: {
      type: 'linear' | 'exponential' | 'logarithmic' | 'polynomial' | 'power' | 'movingAverage';
      order?: number;
      period?: number;
      forward?: number;
      backward?: number;
      intercept?: number;
      displayEquation?: boolean;
      displayRSquared?: boolean;
    };
    errorBars?: {
      direction: 'x' | 'y';
      type: 'fixedValue' | 'percentage' | 'standardDeviation' | 'standardError' | 'custom';
      value?: number;
      plus?: string;
      minus?: string;
    };
    dataLabels?: {
      position?: 'center' | 'insideEnd' | 'outsideEnd' | 'bestFit';
      showValue?: boolean;
      showSeriesName?: boolean;
      showCategoryName?: boolean;
      showLegendKey?: boolean;
      showPercentage?: boolean;
      separator?: string;
      font?: FontProperties;
    };
    markerStyle?: {
      type?: 'none' | 'circle' | 'square' | 'diamond' | 'triangle';
      size?: number;
      fill?: FillProperties;
      border?: BorderProperties;
    };
  }>;

  axes?: {
    category?: AxisProperties;
    value?: AxisProperties;
    seriesAxis?: AxisProperties;
    secondaryCategory?: AxisProperties;
    secondaryValue?: AxisProperties;
  };

  legend?: {
    position: 'top' | 'bottom' | 'left' | 'right' | 'topRight';
    visible: boolean;
    layout?: 'horizontal' | 'vertical';
    font?: FontProperties;
  };

  chartArea?: {
    layout?: {
      x?: number;
      y?: number;
      width?: number;
      height?: number;
    };
    fill?: FillProperties;
    border?: BorderProperties;
  };

  title?: {
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    font?: FontProperties;
  };

  style?: {
    fill?: FillProperties;
    border?: BorderProperties;
    effect?: {
      shadow?: {
        type?: 'outer' | 'inner';
        size?: number;
        blur?: number;
        angle?: number;
        distance?: number;
        color?: string;
        transparency?: number;
      };
      glow?: {
        color: string;
        transparency?: number;
        radius?: number;
      };
      softEdge?: {
        radius: number;
      };
    };
  };
}