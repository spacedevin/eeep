import { StreamState } from '../../spec/Streaming';

export class StreamChunker {
  private chunks: any[][] = [];
  private currentChunk: any[] = [];

  constructor(private chunkSize: number = 1000) {}

  addItem(item: any): void {
    this.currentChunk.push(item);
    
    if (this.currentChunk.length >= this.chunkSize) {
      this.flushChunk();
    }
  }

  addItems(items: any[]): void {
    for (const item of items) {
      this.addItem(item);
    }
  }

  flushChunk(): void {
    if (this.currentChunk.length > 0) {
      this.chunks.push([...this.currentChunk]);
      this.currentChunk = [];
    }
  }

  getChunks(): any[][] {
    this.flushChunk();
    return this.chunks;
  }

  clear(): void {
    this.chunks = [];
    this.currentChunk = [];
  }

  *[Symbol.iterator](): Iterator<any[]> {
    this.flushChunk();
    for (const chunk of this.chunks) {
      yield chunk;
    }
  }
}
