import { ArrayFormulaState } from '../../spec/ArrayFormulas';

export class DynamicArrayManager {
  private maxArraySize: number = 1000000; // 1M cells default limit
  private maxMemoryUsage: number = 1024 * 1024 * 1024; // 1GB default limit
  private currentMemoryUsage: number = 0;

  constructor(
    maxArraySize?: number,
    maxMemoryUsage?: number
  ) {
    if (maxArraySize) this.maxArraySize = maxArraySize;
    if (maxMemoryUsage) this.maxMemoryUsage = maxMemoryUsage;
  }

  validateArraySize(rows: number, columns: number): boolean {
    const size = rows * columns;
    return size <= this.maxArraySize;
  }

  estimateMemoryUsage(data: any[][]): number {
    let size = 0;
    for (const row of data) {
      for (const cell of row) {
        size += this.estimateCellSize(cell);
      }
    }
    return size;
  }

  private estimateCellSize(value: any): number {
    if (typeof value === 'number') return 8;
    if (typeof value === 'boolean') return 4;
    if (typeof value === 'string') return value.length * 2;
    if (value instanceof Date) return 8;
    if (value === null || value === undefined) return 4;
    return 8; // Default size for other types
  }

  canAllocateArray(rows: number, columns: number, sampleData?: any[][]): boolean {
    if (!this.validateArraySize(rows, columns)) return false;

    let estimatedSize: number;
    if (sampleData) {
      // Estimate based on actual data
      estimatedSize = this.estimateMemoryUsage(sampleData);
    } else {
      // Conservative estimate assuming numbers
      estimatedSize = rows * columns * 8;
    }

    return (this.currentMemoryUsage + estimatedSize) <= this.maxMemoryUsage;
  }

  allocateArray(rows: number, columns: number, data: any[][]): void {
    const size = this.estimateMemoryUsage(data);
    if (!this.canAllocateArray(rows, columns) || 
        (this.currentMemoryUsage + size) > this.maxMemoryUsage) {
      throw new Error('Cannot allocate array: memory limits exceeded');
    }
    this.currentMemoryUsage += size;
  }

  releaseArray(data: any[][]): void {
    const size = this.estimateMemoryUsage(data);
    this.currentMemoryUsage = Math.max(0, this.currentMemoryUsage - size);
  }

  getCurrentMemoryUsage(): number {
    return this.currentMemoryUsage;
  }

  getMemoryLimit(): number {
    return this.maxMemoryUsage;
  }

  getArraySizeLimit(): number {
    return this.maxArraySize;
  }
}