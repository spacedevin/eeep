export class FileStream {
  private position = 0;
  private buffer: string[] = [];
  private eof = false;

  constructor(
    private content: string,
    private options: {
      chunkSize?: number;
      maxSize?: number;
    } = {}
  ) {
    if (content.length > (options.maxSize || Number.MAX_SAFE_INTEGER)) {
      throw new Error(`File size exceeds maximum allowed size of ${options.maxSize} bytes`);
    }
  }

  async *readLines(): AsyncGenerator<string, void, unknown> {
    while (!this.eof) {
      const chunk = this.readChunk();
      const lines = chunk.split('\n');
      
      // Handle partial line from previous chunk
      if (this.buffer.length > 0) {
        lines[0] = this.buffer.pop()! + lines[0];
      }
      
      // Save partial line for next chunk
      if (!this.eof) {
        this.buffer.push(lines.pop()!);
      }

      for (const line of lines) {
        if (line.trim()) {
          yield line.trim();
        }
      }
    }
  }

  private readChunk(): string {
    const start = this.position;
    const end = Math.min(this.content.length, start + (this.options.chunkSize || 8192));
    this.position = end;
    this.eof = end >= this.content.length;
    return this.content.slice(start, end);
  }
}