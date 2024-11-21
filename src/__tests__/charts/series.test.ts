import {
  setSeriesStyle,
  setSeriesMarkers,
  setSeriesDataLabels,
  setSeriesTrendline
} from '../../charts/series';
import { createChart, addChartSeries } from '../../charts/chart';

describe('Chart Series Management', () => {
  test('sets series style', () => {
    let chart = createChart('line');
    chart = addChartSeries(chart, 'Series 1', [1, 2, 3]);
    
    chart = setSeriesStyle(chart, 0, {
      fill: {
        type: 'solid',
        color: '#FF0000',
        transparency: 0.5
      },
      line: {
        type: 'dash',
        color: '#000000',
        width: 2
      }
    });
    
    expect(chart.series[0].style?.fill?.color).toBe('#FF0000');
    expect(chart.series[0].style?.line?.type).toBe('dash');
  });

  test('sets series markers', () => {
    let chart = createChart('line');
    chart = addChartSeries(chart, 'Series 1', [1, 2, 3]);
    
    chart = setSeriesMarkers(chart, 0, {
      visible: true,
      size: 8,
      style: {
        fill: { color: '#FF0000' },
        border: { color: '#000000', width: 1 }
      }
    });
    
    expect(chart.series[0].markers?.visible).toBe(true);
    expect(chart.series[0].markers?.size).toBe(8);
    expect(chart.series[0].markers?.style?.fill?.color).toBe('#FF0000');
  });

  test('sets series data labels', () => {
    let chart = createChart('column');
    chart = addChartSeries(chart, 'Series 1', [1, 2, 3]);
    
    chart = setSeriesDataLabels(chart, 0, {
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
    expect(chart.series[0].dataLabels?.font?.bold).toBe(true);
  });

  test('sets series trendline', () => {
    let chart = createChart('scatter');
    chart = addChartSeries(chart, 'Series 1', [1, 2, 3]);
    
    chart = setSeriesTrendline(chart, 0, {
      type: 'linear',
      displayEquation: true,
      displayRSquared: true,
      forward: 2
    });
    
    expect(chart.series[0].trendline?.type).toBe('linear');
    expect(chart.series[0].trendline?.displayEquation).toBe(true);
    expect(chart.series[0].trendline?.forward).toBe(2);
  });

  test('handles invalid series index', () => {
    let chart = createChart('line');
    chart = addChartSeries(chart, 'Series 1', [1, 2, 3]);
    
    chart = setSeriesStyle(chart, 1, {
      fill: { type: 'solid', color: '#FF0000' }
    });
    
    expect(chart.series).toHaveLength(1);
    expect(chart.series[0].style?.fill?.color).toBeUndefined();
  });
});
