import {
  createChart,
  addChartSeries,
  setChartTitle,
  setChartLegend,
  setChartAxes
} from '../../charts/chart';

describe('Chart Management', () => {
  test('creates chart', () => {
    const chart = createChart('column');
    expect(chart.type).toBe('column');
    expect(chart.series).toHaveLength(0);
    expect(chart.legend.position).toBe('right');
  });

  test('adds chart series', () => {
    let chart = createChart('line');
    chart = addChartSeries(chart, 'Series 1', [1, 2, 3], ['A', 'B', 'C']);
    
    expect(chart.series).toHaveLength(1);
    expect(chart.series[0].name).toBe('Series 1');
    expect(chart.series[0].values).toEqual([1, 2, 3]);
    expect(chart.series[0].categories).toEqual(['A', 'B', 'C']);
  });

  test('sets chart title', () => {
    let chart = createChart('pie');
    chart = setChartTitle(chart, 'Sales Data', 'top');
    
    expect(chart.title.text).toBe('Sales Data');
    expect(chart.title.position).toBe('top');
  });

  test('sets chart legend', () => {
    let chart = createChart('bar');
    chart = setChartLegend(chart, 'bottom', true);
    
    expect(chart.legend.position).toBe('bottom');
    expect(chart.legend.showLegend).toBe(true);
  });

  test('sets chart axes', () => {
    let chart = createChart('column');
    chart = setChartAxes(chart, {
      category: {
        title: 'Products',
        format: 'General'
      },
      value: {
        title: 'Sales',
        format: '$#,##0.00'
      }
    });
    
    expect(chart.axes.category.title.text).toBe('Products');
    expect(chart.axes.value.title.text).toBe('Sales');
    expect(chart.axes.value.format).toBe('$#,##0.00');
  });

  test('handles markers for line and scatter charts', () => {
    let lineChart = createChart('line');
    lineChart = addChartSeries(lineChart, 'Series 1', [1, 2, 3]);
    expect(lineChart.series[0].markers.visible).toBe(true);

    let columnChart = createChart('column');
    columnChart = addChartSeries(columnChart, 'Series 1', [1, 2, 3]);
    expect(columnChart.series[0].markers.visible).toBe(false);
  });
});