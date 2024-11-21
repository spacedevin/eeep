export interface MetricData {
  timestamp: number;
  duration: number;
  success: boolean;
  error?: string;
  context?: Record<string, any>;
}

class MetricsCollector {
  private metrics: Map<string, MetricData[]> = new Map();
  private maxSize: number = 1000;

  collect(operation: string, data: MetricData): void {
    const metrics = this.metrics.get(operation) || [];
    metrics.push(data);

    // Trim old metrics if exceeding max size
    if (metrics.length > this.maxSize) {
      metrics.splice(0, metrics.length - this.maxSize);
    }

    this.metrics.set(operation, metrics);
  }

  getMetrics(operation: string): MetricData[] {
    return this.metrics.get(operation) || [];
  }

  getAverageDuration(operation: string): number {
    const metrics = this.getMetrics(operation);
    if (metrics.length === 0) return 0;

    const totalDuration = metrics.reduce((sum, m) => sum + m.duration, 0);
    return totalDuration / metrics.length;
  }

  getSuccessRate(operation: string): number {
    const metrics = this.getMetrics(operation);
    if (metrics.length === 0) return 0;

    const successCount = metrics.filter(m => m.success).length;
    return (successCount / metrics.length) * 100;
  }

  clear(operation?: string): void {
    if (operation) {
      this.metrics.delete(operation);
    } else {
      this.metrics.clear();
    }
  }
}

export const metricsCollector = new MetricsCollector();
