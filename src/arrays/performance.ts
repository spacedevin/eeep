import { ArrayFormulaState } from '../../spec/ArrayFormulas';

export class DynamicArrayOptimizer {
  private chunkSize: number = 1000; // Process arrays in chunks
  private useParallel: boolean = true;
  private maxWorkers: number = navigator.hardwareConcurrency || 4;

  constructor(
    chunkSize?: number,
    useParallel?: boolean,
    maxWorkers?: number
  ) {
    if (chunkSize) this.chunkSize = chunkSize;
    if (useParallel !== undefined) this.useParallel = useParallel;
    if (maxWorkers) this.maxWorkers = maxWorkers;
  }

  async processArray<T>(
    data: T[][],
    processor: (chunk: T[][]) => Promise<any[][]>
  ): Promise<any[][]> {
    const chunks = this.chunkArray(data);
    
    if (this.useParallel && chunks.length > 1) {
      return this.processChunksParallel(chunks, processor);
    } else {
      return this.processChunksSequential(chunks, processor);
    }
  }

  private chunkArray<T>(data: T[][]): T[][][] {
    const chunks: T[][][] = [];
    for (let i = 0; i < data.length; i += this.chunkSize) {
      chunks.push(data.slice(i, i + this.chunkSize));
    }
    return chunks;
  }

  private async processChunksSequential<T>(
    chunks: T[][][],
    processor: (chunk: T[][]) => Promise<any[][]>
  ): Promise<any[][]> {
    const results: any[][] = [];
    for (const chunk of chunks) {
      const processed = await processor(chunk);
      results.push(...processed);
    }
    return results;
  }

  private async processChunksParallel<T>(
    chunks: T[][][],
    processor: (chunk: T[][]) => Promise<any[][]>
  ): Promise<any[][]> {
    const workers = Math.min(this.maxWorkers, chunks.length);
    const chunkSize = Math.ceil(chunks.length / workers);
    const promises: Promise<any[][]>[] = [];

    for (let i = 0; i < chunks.length; i += chunkSize) {
      const workerChunks = chunks.slice(i, i + chunkSize);
      promises.push(this.processChunksSequential(workerChunks, processor));
    }

    const results = await Promise.all(promises);
    return results.flat();
  }

  optimizeSpillRanges(state: ArrayFormulaState): ArrayFormulaState {
    if (!state.spill.isBlocked) return state;

    // Find alternative spill range if blocked
    const newRange = this.findAlternativeSpillRange(state);
    if (newRange) {
      return {
        ...state,
        spill: {
          ...state.spill,
          range: newRange,
          isBlocked: false
        }
      };
    }

    return state;
  }

  private findAlternativeSpillRange(state: ArrayFormulaState): string | undefined {
    // This is a placeholder implementation
    // In a real implementation, this would:
    // 1. Analyze current worksheet state
    // 2. Find next available range of sufficient size
    // 3. Return range reference if found
    return undefined;
  }

  setChunkSize(size: number): void {
    this.chunkSize = size;
  }

  setUseParallel(parallel: boolean): void {
    this.useParallel = parallel;
  }

  setMaxWorkers(workers: number): void {
    this.maxWorkers = workers;
  }
}