import { OLAPQueryExecutor } from './query';
import { OLAPResult, MDXQuery } from './types';

export class OLAPPerformanceMonitor {
  private metrics: Map<string, {
    executionTime: number[];
    cacheHits: number;
    cacheMisses: number;
    errors: number;
    lastExecutionTime?: number;
  }> = new Map();

  private thresholds = {
    executionTime: 5000, // 5 seconds
    cacheHitRate: 0.7,   // 70%
    errorRate: 0.1       // 10%
  };

  trackQueryExecution(queryId: string, startTime: number, endTime: number, cached: boolean, error?: Error): void {
    const executionTime = endTime - startTime;
    let metric = this.metrics.get(queryId) || {
      executionTime: [],
      cacheHits: 0,
      cacheMisses: 0,
      errors: 0
    };

    metric.executionTime.push(executionTime);
    metric.lastExecutionTime = executionTime;
    
    if (cached) {
      metric.cacheHits++;
    } else {
      metric.cacheMisses++;
    }

    if (error) {
      metric.errors++;
    }

    // Keep only last 100 execution times
    if (metric.executionTime.length > 100) {
      metric.executionTime.shift();
    }

    this.metrics.set(queryId, metric);
  }

  getQueryMetrics(queryId: string) {
    const metric = this.metrics.get(queryId);
    if (!metric) return null;

    const totalExecutions = metric.cacheHits + metric.cacheMisses;
    const avgExecutionTime = metric.executionTime.reduce((a, b) => a + b, 0) / metric.executionTime.length;
    const cacheHitRate = totalExecutions > 0 ? metric.cacheHits / totalExecutions : 0;
    const errorRate = totalExecutions > 0 ? metric.errors / totalExecutions : 0;

    return {
      averageExecutionTime: avgExecutionTime,
      lastExecutionTime: metric.lastExecutionTime,
      cacheHitRate,
      errorRate,
      totalExecutions,
      needsOptimization: this.needsOptimization(avgExecutionTime, cacheHitRate, errorRate)
    };
  }

  private needsOptimization(executionTime: number, cacheHitRate: number, errorRate: number): boolean {
    return executionTime > this.thresholds.executionTime ||
           cacheHitRate < this.thresholds.cacheHitRate ||
           errorRate > this.thresholds.errorRate;
  }

  setThresholds(thresholds: Partial<typeof OLAPPerformanceMonitor.prototype.thresholds>): void {
    this.thresholds = { ...this.thresholds, ...thresholds };
  }

  clearMetrics(): void {
    this.metrics.clear();
  }
}

export class OLAPPerformanceOptimizer {
  constructor(
    private queryExecutor: OLAPQueryExecutor,
    private performanceMonitor: OLAPPerformanceMonitor
  ) {}

  async executeOptimizedQuery(query: MDXQuery): Promise<OLAPResult> {
    const startTime = Date.now();
    const queryId = this.generateQueryId(query);
    let error: Error | undefined;
    let result: OLAPResult;
    let cached = false;

    try {
      // Check if query needs optimization
      const metrics = this.performanceMonitor.getQueryMetrics(queryId);
      if (metrics?.needsOptimization) {
        query = this.optimizeQuery(query);
      }

      // Execute query
      result = await this.queryExecutor.executeQuery(query);
      cached = this.queryExecutor.wasLastQueryCached();

    } catch (e) {
      error = e as Error;
      throw e;
    } finally {
      const endTime = Date.now();
      this.performanceMonitor.trackQueryExecution(queryId, startTime, endTime, cached, error);
    }

    return result;
  }

  private generateQueryId(query: MDXQuery): string {
    return JSON.stringify({
      cube: query.cube,
      dimensions: query.dimensions.sort(),
      measures: query.measures.sort(),
      filters: query.filters,
      orderBy: query.orderBy
    });
  }

  private optimizeQuery(query: MDXQuery): MDXQuery {
    // Apply various optimization strategies
    return {
      ...query,
      dimensions: this.optimizeDimensions(query.dimensions),
      measures: this.optimizeMeasures(query.measures),
      filters: this.optimizeFilters(query.filters),
      orderBy: this.optimizeOrderBy(query.orderBy)
    };
  }

  private optimizeDimensions(dimensions: string[]): string[] {
    // Limit number of dimensions to improve performance
    const MAX_DIMENSIONS = 5;
    if (dimensions.length > MAX_DIMENSIONS) {
      console.warn(`Reducing dimensions from ${dimensions.length} to ${MAX_DIMENSIONS}`);
      return dimensions.slice(0, MAX_DIMENSIONS);
    }
    return dimensions;
  }

  private optimizeMeasures(measures: string[]): string[] {
    // Limit number of measures to improve performance
    const MAX_MEASURES = 10;
    if (measures.length > MAX_MEASURES) {
      console.warn(`Reducing measures from ${measures.length} to ${MAX_MEASURES}`);
      return measures.slice(0, MAX_MEASURES);
    }
    return measures;
  }

  private optimizeFilters(filters?: Record<string, any>): Record<string, any> | undefined {
    if (!filters) return undefined;

    // Remove redundant or overly complex filters
    const optimizedFilters: Record<string, any> = {};
    for (const [key, value] of Object.entries(filters)) {
      if (this.isFilterOptimizable(value)) {
        optimizedFilters[key] = value;
      }
    }

    return Object.keys(optimizedFilters).length > 0 ? optimizedFilters : undefined;
  }

  private optimizeOrderBy(orderBy?: string): string | undefined {
    if (!orderBy) return undefined;

    // Limit number of sort conditions
    const MAX_SORT_CONDITIONS = 2;
    const sortParts = orderBy.split(',').map(part => part.trim());
    if (sortParts.length > MAX_SORT_CONDITIONS) {
      console.warn(`Reducing sort conditions from ${sortParts.length} to ${MAX_SORT_CONDITIONS}`);
      return sortParts.slice(0, MAX_SORT_CONDITIONS).join(', ');
    }

    return orderBy;
  }

  private isFilterOptimizable(value: any): boolean {
    // Check if filter value is simple enough to be optimized
    if (value === null || value === undefined) return false;
    if (typeof value === 'object' && Object.keys(value).length > 5) return false;
    if (Array.isArray(value) && value.length > 100) return false;
    return true;
  }
}