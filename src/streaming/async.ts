import { StreamState } from '../../spec/Streaming';
import { StreamBuffer } from './buffer';
import { StreamChunker } from './chunker';

export class AsyncStreamProcessor {
  private buffer: StreamBuffer;
  private chunker: StreamChunker;
  private processing: boolean = false;
  private queue: Array<() => Promise<void>> = [];

  constructor(bufferSize: number = 8192, chunkSize: number = 1000) {
    this.buffer = new StreamBuffer(bufferSize);
    this.chunker = new StreamChunker(chunkSize);
  }

  async processStream<T>(
    input: AsyncIterable<T>,
    processor: (chunk: T[]) => Promise<any[]>,
    onProgress?: (processed: number, total: number) => void
  ): Promise<any[]> {
    const results: any[] = [];
    let processed = 0;
    let total = 0;

    for await (const item of input) {
      this.chunker.addItem(item);
      total++;

      if (this.chunker.getChunks().length > 0) {
        const chunks = this.chunker.getChunks();
        for (const chunk of chunks) {
          const processedChunk = await processor(chunk);
          results.push(...processedChunk);
          processed += chunk.length;
          onProgress?.(processed, total);
        }
      }
    }

    // Process remaining items
    const remainingChunks = this.chunker.getChunks();
    for (const chunk of remainingChunks) {
      const processedChunk = await processor(chunk);
      results.push(...processedChunk);
      processed += chunk.length;
      onProgress?.(processed, total);
    }

    return results;
  }

  async enqueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      if (!this.processing) {
        this.processQueue();
      }
    });
  }

  private async processQueue(): Promise<void> {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
      }
    }
    this.processing = false;
  }
}
