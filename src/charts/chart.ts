import { ChartState, ChartType } from '../../spec/Charts';

export function createChart(type: ChartType): ChartState {
  return {
    type,
    series: [],
    axes: {
      category: {
        title: { text: '' },
        format: 'General'
      },
      value: {
        title: { text: '' },
        format: '#,##0.00'
      }
    },
    legend: {
      position: 'right',
      visible: true
    },
    style: {
      fill: {
        type: 'solid',
        color: '#FFFFFF'
      },
      border: {
        color: '#000000',
        width: 1
      }
    }
  };
}

export function addChartSeries(
  chart: ChartState,
  name: string,
  values: any[],
  categories?: any[]
): ChartState {
  return {
    ...chart,
    series: [
      ...chart.series,
      {
        name,
        values,
        categories,
        type: chart.type,
        markerStyle: {
          type: chart.type === 'line' || chart.type === 'scatter' ? 'circle' : 'none',
          size: 6
        }
      }
    ]
  };
}

export function setChartTitle(
  chart: ChartState,
  text: string,
  position: 'top' | 'bottom' | 'left' | 'right' = 'top'
): ChartState {
  return {
    ...chart,
    title: {
      text,
      position
    }
  };
}

export function setChartLegend(
  chart: ChartState,
  position: 'top' | 'bottom' | 'left' | 'right',
  visible: boolean = true
): ChartState {
  return {
    ...chart,
    legend: {
      position,
      visible
    }
  };
}

export function setChartAxes(
  chart: ChartState,
  options: {
    category?: {
      title?: string;
      format?: string;
    };
    value?: {
      title?: string;
      format?: string;
    };
  }
): ChartState {
  const axes = chart.axes || {
    category: { title: { text: '' }, format: 'General' },
    value: { title: { text: '' }, format: '#,##0.00' }
  };

  return {
    ...chart,
    axes: {
      category: {
        ...axes.category,
        ...(options.category && {
          title: { text: options.category.title || '' },
          format: options.category.format || 'General'
        })
      },
      value: {
        ...axes.value,
        ...(options.value && {
          title: { text: options.value.title || '' },
          format: options.value.format || '#,##0.00'
        })
      }
    }
  };
}