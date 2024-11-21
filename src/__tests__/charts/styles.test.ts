import {
  setChartFill,
  setChartBorder,
  setChartEffects
} from '../../charts/styles';
import { createChart } from '../../charts/chart';

describe('Chart Styles', () => {
  test('sets chart fill', () => {
    let chart = createChart('column');
    chart = setChartFill(chart, {
      type: 'solid',
      color: '#FF0000',
      transparency: 0.5
    });
    
    expect(chart.style.fill?.type).toBe('solid');
    expect(chart.style.fill?.color).toBe('#FF0000');
    expect(chart.style.fill?.transparency).toBe(0.5);
  });

  test('sets gradient fill', () => {
    let chart = createChart('column');
    chart = setChartFill(chart, {
      type: 'gradient',
      gradient: {
        type: 'linear',
        angle: 45,
        stops: [
          { position: 0, color: '#FF0000' },
          { position: 1, color: '#0000FF' }
        ]
      }
    });
    
    expect(chart.style.fill?.type).toBe('gradient');
    expect(chart.style.fill?.gradient?.stops).toHaveLength(2);
  });

  test('sets chart border', () => {
    let chart = createChart('column');
    chart = setChartBorder(chart, {
      type: 'dash',
      color: '#000000',
      width: 2,
      transparency: 0.3
    });
    
    expect(chart.style.border?.type).toBe('dash');
    expect(chart.style.border?.width).toBe(2);
  });

  test('sets chart effects', () => {
    let chart = createChart('column');
    chart = setChartEffects(chart, {
      shadow: {
        type: 'outer',
        color: '#000000',
        blur: 5,
        distance: 3,
        angle: 45
      },
      glow: {
        color: '#FF0000',
        radius: 10
      }
    });
    
    expect(chart.style.effects?.shadow?.type).toBe('outer');
    expect(chart.style.effects?.glow?.radius).toBe(10);
  });
});