import {
  setDataLabels,
  setSeriesLabels,
  setCustomLabel
} from '../../charts/labels';
import { createChart, addChartSeries } from '../../charts/chart';

describe('Chart Labels', () => {
  test('sets data labels for all series', () => {
    let chart = createChart('column');
    chart = addChartSeries(chart, 'Series 1', [1, 2, 3]);
    chart = addChartSeries(chart, 'Series 2', [4, 5, 6]);
    
    chart = setDataLabels(chart, {
      position: 'outsideEnd',
      showValue: true,
      showPercentage: true,
      font: {
        bold: true,
        size: 12
      }
    });
    
    expect(chart.series[0].dataLabels?.position).toBe('outsideEnd');
    expect(chart.series[0].dataLabels?.showValue).toBe(true);
    expect(chart.series[1].dataLabels?.font?.bold).toBe(true);
  });

  test('sets data labels for specific series', () => {
    let chart = createChart('column');
    chart = addChartSeries(chart, 'Series 1', [1, 2, 3]);
    chart = addChartSeries(chart, 'Series 2', [4, 5, 6]);
    
    chart = setSeriesLabels(chart, 0, {
      position: 'center',
      showValue: true
    });
    
    expect(chart.series[0].dataLabels?.position).toBe('center');
    expect(chart.series[0].dataLabels?.showValue).toBe(true);
    expect(chart.series[1].dataLabels?.position).toBeUndefined();
  });

  test('sets custom label for specific point', () => {
    let chart = createChart('column');
    chart = addChartSeries(chart, 'Series 1', [1, 2, 3]);
    
    chart = setCustomLabel(chart, 0, 1, 'Custom Label');
    
    expect(chart.series[0].dataLabels?.customLabels?.[1]).toBe('Custom Label');
  });

  test('handles invalid series index', () => {
    let chart = createChart('column');
    chart = addChartSeries(chart, 'Series 1', [1, 2, 3]);
    
    chart = setSeriesLabels(chart, 1, {
      position: 'center'
    });
    
    expect(chart.series).toHaveLength(1);
    expect(chart.series[0].dataLabels?.position).toBeUndefined();
  });

  test('preserves existing label options', () => {
    let chart = createChart('column');
    chart = addChartSeries(chart, 'Series 1', [1, 2, 3]);
    
    chart = setDataLabels(chart, {
      position: 'center',
      showValue: true
    });
    
    chart = setDataLabels(chart, {
      showPercentage: true
    });
    
    expect(chart.series[0].dataLabels?.position).toBe('center');
    expect(chart.series[0].dataLabels?.showValue).toBe(true);
    expect(chart.series[0].dataLabels?.showPercentage).toBe(true);
  });
});