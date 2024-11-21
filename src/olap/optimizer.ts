import { MDXQuery } from './types';

export class OLAPQueryOptimizer {
  private maxComplexity: number = 1000;
  private maxDimensions: number = 10;
  private maxMeasures: number = 20;

  constructor(
    maxComplexity?: number,
    maxDimensions?: number,
    maxMeasures?: number
  ) {
    if (maxComplexity) this.maxComplexity = maxComplexity;
    if (maxDimensions) this.maxDimensions = maxDimensions;
    if (maxMeasures) this.maxMeasures = maxMeasures;
  }

  optimizeQuery(query: MDXQuery): MDXQuery {
    // Validate and optimize dimensions
    const dimensions = this.optimizeDimensions(query.dimensions);

    // Validate and optimize measures
    const measures = this.optimizeMeasures(query.measures);

    // Optimize filters
    const filters = this.optimizeFilters(query.filters);

    // Optimize sort conditions
    const orderBy = this.optimizeOrderBy(query.orderBy);

    return {
      ...query,
      dimensions,
      measures,
      filters,
      orderBy
    };
  }

  private optimizeDimensions(dimensions: string[]): string[] {
    if (dimensions.length > this.maxDimensions) {
      console.warn(`Reducing dimensions from ${dimensions.length} to ${this.maxDimensions}`);
      return dimensions.slice(0, this.maxDimensions);
    }
    return dimensions;
  }

  private optimizeMeasures(measures: string[]): string[] {
    if (measures.length > this.maxMeasures) {
      console.warn(`Reducing measures from ${measures.length} to ${this.maxMeasures}`);
      return measures.slice(0, this.maxMeasures);
    }
    return measures;
  }

  private optimizeFilters(filters?: Record<string, any>): Record<string, any> | undefined {
    if (!filters) return undefined;

    // Remove redundant filters
    const optimizedFilters: Record<string, any> = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        optimizedFilters[key] = value;
      }
    }

    return Object.keys(optimizedFilters).length > 0 ? optimizedFilters : undefined;
  }

  private optimizeOrderBy(orderBy?: string): string | undefined {
    // Validate and optimize sort conditions
    if (!orderBy) return undefined;

    // Remove unnecessary sort conditions
    const sortParts = orderBy.split(',').map(part => part.trim());
    if (sortParts.length > this.maxDimensions) {
      console.warn(`Reducing sort conditions from ${sortParts.length} to ${this.maxDimensions}`);
      return sortParts.slice(0, this.maxDimensions).join(', ');
    }

    return orderBy;
  }

  calculateQueryComplexity(query: MDXQuery): number {
    let complexity = 0;

    // Add dimension complexity
    complexity += query.dimensions.length * 10;

    // Add measure complexity
    complexity += query.measures.length * 5;

    // Add filter complexity
    if (query.filters) {
      complexity += Object.keys(query.filters).length * 15;
    }

    // Add sorting complexity
    if (query.orderBy) {
      complexity += query.orderBy.split(',').length * 20;
    }

    return complexity;
  }

  isQueryOptimizable(query: MDXQuery): boolean {
    const complexity = this.calculateQueryComplexity(query);
    return complexity <= this.maxComplexity;
  }

  setMaxComplexity(value: number): void {
    this.maxComplexity = value;
  }

  setMaxDimensions(value: number): void {
    this.maxDimensions = value;
  }

  setMaxMeasures(value: number): void {
    this.maxMeasures = value;
  }
}