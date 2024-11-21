import { FormulaError } from '../errors';
import { CompressionFormat, CompressionOptions, DecompressionOptions } from '../types/compression';

export class CompressionHandler {
  private supportedEncodings = new Set<CompressionFormat>(['gzip', 'deflate']);

  constructor(private preferredEncoding: CompressionFormat = 'gzip') {
    if (!this.supportedEncodings.has(preferredEncoding)) {
      throw new Error(`Unsupported encoding: ${preferredEncoding}`);
    }
  }

  async compressRequest(
    data: string | Uint8Array,
    options?: CompressionOptions
  ): Promise<Uint8Array> {
    try {
      // Convert string to Uint8Array if needed
      const buffer = typeof data === 'string' ? 
        new TextEncoder().encode(data) : 
        data;

      // Use CompressionStream API for compression
      const stream = new Blob([buffer])
        .stream()
        .pipeThrough(new CompressionStream(options?.format || this.preferredEncoding));

      return new Uint8Array(await new Response(stream).arrayBuffer());
    } catch (error) {
      throw new FormulaError('Error compressing request data', error);
    }
  }

  async decompressResponse(
    data: Uint8Array,
    format: CompressionFormat,
    options?: DecompressionOptions
  ): Promise<string> {
    try {
      if (!this.supportedEncodings.has(format)) {
        throw new Error(`Unsupported encoding: ${format}`);
      }

      // Use DecompressionStream API for decompression
      const stream = new Blob([data])
        .stream()
        .pipeThrough(new DecompressionStream(format));

      const buffer = await new Response(stream).arrayBuffer();
      return new TextDecoder().decode(buffer);
    } catch (error) {
      throw new FormulaError('Error decompressing response data', error);
    }
  }

  getSupportedEncodings(): CompressionFormat[] {
    return Array.from(this.supportedEncodings);
  }

  setPreferredEncoding(encoding: CompressionFormat): void {
    if (!this.supportedEncodings.has(encoding)) {
      throw new Error(`Unsupported encoding: ${encoding}`);
    }
    this.preferredEncoding = encoding;
  }

  getPreferredEncoding(): CompressionFormat {
    return this.preferredEncoding;
  }

  supportsEncoding(encoding: string): encoding is CompressionFormat {
    return this.supportedEncodings.has(encoding as CompressionFormat);
  }
}