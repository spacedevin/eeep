import { ChartState } from '../../spec/Charts';

export function setSeriesMarkerStyle(
  chart: ChartState,
  seriesIndex: number,
  markerStyle: NonNullable<ChartState['series'][0]['markerStyle']>
): ChartState {
  const series = [...chart.series];
  if (seriesIndex >= 0 && seriesIndex < series.length) {
    series[seriesIndex] = {
      ...series[seriesIndex],
      markerStyle: {
        ...series[seriesIndex].markerStyle,
        ...markerStyle
      }
    };
  }
  return { ...chart, series };
}

export function setSeriesDataLabels(
  chart: ChartState,
  seriesIndex: number,
  labels: NonNullable<ChartState['series'][0]['dataLabels']>
): ChartState {
  const series = [...chart.series];
  if (seriesIndex >= 0 && seriesIndex < series.length) {
    series[seriesIndex] = {
      ...series[seriesIndex],
      dataLabels: {
        ...series[seriesIndex].dataLabels,
        ...labels
      }
    };
  }
  return { ...chart, series };
}

export function setSeriesTrendline(
  chart: ChartState,
  seriesIndex: number,
  trendline: NonNullable<ChartState['series'][0]['trendline']>
): ChartState {
  const series = [...chart.series];
  if (seriesIndex >= 0 && seriesIndex < series.length) {
    series[seriesIndex] = {
      ...series[seriesIndex],
      trendline
    };
  }
  return { ...chart, series };
}