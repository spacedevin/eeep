import { ChartState } from '../../spec/Charts';

export function setChartFill(
  chart: ChartState,
  fill: NonNullable<ChartState['style']>['fill']
): ChartState {
  return {
    ...chart,
    style: {
      ...chart.style,
      fill
    }
  };
}

export function setChartBorder(
  chart: ChartState,
  border: NonNullable<ChartState['style']>['border']
): ChartState {
  return {
    ...chart,
    style: {
      ...chart.style,
      border
    }
  };
}

export function setChartEffect(
  chart: ChartState,
  effect: NonNullable<ChartState['style']>['effect']
): ChartState {
  return {
    ...chart,
    style: {
      ...chart.style,
      effect
    }
  };
}