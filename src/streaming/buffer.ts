import { StreamState } from '../../spec/Streaming';

export class StreamBuffer {
  private buffer: any[] = [];
  private position = 0;

  constructor(
    private maxSize: number = 8192,
    private flushCallback?: (data: any[]) => Promise<void>
  ) {}

  async write(data: any): Promise<void> {
    this.buffer.push(data);
    
    if (this.buffer.length >= this.maxSize) {
      await this.flush();
    }
  }

  async writeMany(data: any[]): Promise<void> {
    for (const item of data) {
      await this.write(item);
    }
  }

  async flush(): Promise<void> {
    if (this.buffer.length > 0 && this.flushCallback) {
      await this.flushCallback(this.buffer);
      this.buffer = [];
    }
  }

  async read(count: number = 1): Promise<any[]> {
    const result = this.buffer.slice(this.position, this.position + count);
    this.position += count;
    return result;
  }

  clear(): void {
    this.buffer = [];
    this.position = 0;
  }

  get length(): number {
    return this.buffer.length;
  }

  get remaining(): number {
    return this.buffer.length - this.position;
  }
}
