import { StreamState } from '../../spec/Streaming';
import { StreamBuffer } from './buffer';
import { StreamChunker } from './chunker';

export class ParallelStreamProcessor {
  private workers: Worker[] = [];
  private maxWorkers: number;

  constructor(maxWorkers: number = navigator.hardwareConcurrency || 4) {
    this.maxWorkers = maxWorkers;
  }

  async processChunks(chunks: any[][], processor: (chunk: any[]) => Promise<any[]>): Promise<any[][]> {
    const results: any[][] = [];
    const chunkSize = Math.ceil(chunks.length / this.maxWorkers);
    const tasks: Promise<any[]>[] = [];

    for (let i = 0; i < chunks.length; i += chunkSize) {
      const chunkSlice = chunks.slice(i, i + chunkSize);
      tasks.push(this.processChunkSlice(chunkSlice, processor));
    }

    const processedChunks = await Promise.all(tasks);
    return processedChunks.flat();
  }

  private async processChunkSlice(chunks: any[][], processor: (chunk: any[]) => Promise<any[]>): Promise<any[][]> {
    const results: any[][] = [];
    for (const chunk of chunks) {
      const processed = await processor(chunk);
      results.push(processed);
    }
    return results;
  }

  terminate(): void {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
  }
}
