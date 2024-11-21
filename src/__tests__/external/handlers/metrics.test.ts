import { metricsCollector } from '../../../external/handlers/metrics';

describe('Metrics Collection', () => {
  beforeEach(() => {
    metricsCollector.clear();
  });

  test('collects operation metrics', () => {
    metricsCollector.collect('test-op', {
      timestamp: Date.now(),
      duration: 100,
      success: true
    });

    const metrics = metricsCollector.getMetrics('test-op');
    expect(metrics).toHaveLength(1);
    expect(metrics[0].success).toBe(true);
  });

  test('calculates average duration', () => {
    metricsCollector.collect('test-op', {
      timestamp: Date.now(),
      duration: 100,
      success: true
    });
    metricsCollector.collect('test-op', {
      timestamp: Date.now(),
      duration: 200,
      success: true
    });

    expect(metricsCollector.getAverageDuration('test-op')).toBe(150);
  });

  test('calculates success rate', () => {
    metricsCollector.collect('test-op', {
      timestamp: Date.now(),
      duration: 100,
      success: true
    });
    metricsCollector.collect('test-op', {
      timestamp: Date.now(),
      duration: 100,
      success: false
    });

    expect(metricsCollector.getSuccessRate('test-op')).toBe(50);
  });

  test('clears metrics', () => {
    metricsCollector.collect('test-op', {
      timestamp: Date.now(),
      duration: 100,
      success: true
    });

    metricsCollector.clear('test-op');
    expect(metricsCollector.getMetrics('test-op')).toHaveLength(0);
  });
});
