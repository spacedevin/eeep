import {
  setChartStyle,
  setChartData,
  setChartSize,
  setChartMarkers
} from '../../charts/components';
import { createChart } from '../../charts/chart';

describe('Chart Components', () => {
  test('sets chart style', () => {
    let chart = createChart('column');
    chart = setChartStyle(chart, {
      fill: {
        type: 'solid',
        color: '#FF0000'
      }
    });
    
    expect(chart.style.fill?.color).toBe('#FF0000');
  });

  test('sets chart data', () => {
    let chart = createChart('line');
    chart = setChartData(chart, {
      categories: ['A', 'B', 'C'],
      series: [
        { name: 'Series 1', data: [1, 2, 3] },
        { name: 'Series 2', data: [4, 5, 6] }
      ]
    });
    
    expect(chart.series).toHaveLength(2);
    expect(chart.series[0].values).toEqual([1, 2, 3]);
    expect(chart.series[0].categories).toEqual(['A', 'B', 'C']);
  });

  test('sets chart size', () => {
    let chart = createChart('pie');
    chart = setChartSize(chart, 800, 600);
    
    expect(chart.size?.width).toBe(800);
    expect(chart.size?.height).toBe(600);
    expect(chart.size?.lockAspectRatio).toBe(true);
  });

  test('sets chart markers', () => {
    let chart = createChart('line');
    chart = setChartData(chart, {
      series: [{ name: 'Series 1', data: [1, 2, 3] }]
    });
    chart = setChartMarkers(chart, {
      visible: true,
      size: 8
    });
    
    expect(chart.series[0].markers.visible).toBe(true);
    expect(chart.series[0].markers.size).toBe(8);
  });
});