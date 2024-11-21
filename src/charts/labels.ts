import { ChartState } from '../../spec/Charts';

export function setDataLabels(
  chart: ChartState,
  options: {
    position?: 'center' | 'insideEnd' | 'outsideEnd' | 'bestFit';
    showValue?: boolean;
    showSeriesName?: boolean;
    showCategoryName?: boolean;
    showLegendKey?: boolean;
    showPercentage?: boolean;
    separator?: string;
    font?: {
      name?: string;
      size?: number;
      bold?: boolean;
      italic?: boolean;
      color?: string;
    };
  }
): ChartState {
  return {
    ...chart,
    series: chart.series.map(s => ({
      ...s,
      dataLabels: {
        ...s.dataLabels,
        ...options
      }
    }))
  };
}

export function setSeriesLabels(
  chart: ChartState,
  seriesIndex: number,
  options: {
    position?: 'center' | 'insideEnd' | 'outsideEnd' | 'bestFit';
    showValue?: boolean;
    showSeriesName?: boolean;
    showCategoryName?: boolean;
    showLegendKey?: boolean;
    showPercentage?: boolean;
    separator?: string;
    font?: {
      name?: string;
      size?: number;
      bold?: boolean;
      italic?: boolean;
      color?: string;
    };
  }
): ChartState {
  const series = [...chart.series];
  if (seriesIndex >= 0 && seriesIndex < series.length) {
    series[seriesIndex] = {
      ...series[seriesIndex],
      dataLabels: {
        ...series[seriesIndex].dataLabels,
        ...options
      }
    };
  }
  return { ...chart, series };
}