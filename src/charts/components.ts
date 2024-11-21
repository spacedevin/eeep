import { ChartState } from '../../spec/Charts';

export function setChartStyle(
  chart: ChartState,
  style: Partial<ChartState['style']>
): ChartState {
  return {
    ...chart,
    style: {
      ...chart.style,
      ...style
    }
  };
}

export function setChartData(
  chart: ChartState,
  data: {
    categories?: any[];
    series: Array<{
      name: string;
      data: any[];
    }>;
  }
): ChartState {
  return {
    ...chart,
    series: data.series.map(s => ({
      name: s.name,
      values: s.data,
      categories: data.categories,
      type: chart.type,
      markerStyle: {
        type: chart.type === 'line' || chart.type === 'scatter' ? 'circle' : 'none',
        size: 6
      }
    }))
  };
}

export function setChartMarkers(
  chart: ChartState,
  options: {
    type?: 'none' | 'circle' | 'square' | 'diamond' | 'triangle';
    size?: number;
  }
): ChartState {
  return {
    ...chart,
    series: chart.series.map(s => ({
      ...s,
      markerStyle: {
        ...s.markerStyle,
        ...options
      }
    }))
  };
}