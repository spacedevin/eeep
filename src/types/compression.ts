export type CompressionFormat = 'gzip' | 'deflate';

export interface CompressionOptions {
  format?: CompressionFormat;
  level?: number;
  chunkSize?: number;
  memoryLevel?: number;
  strategy?: 'default' | 'filtered' | 'huffmanOnly' | 'rle' | 'fixed';
}

export interface DecompressionOptions {
  format?: CompressionFormat;
  chunkSize?: number;
  maxOutputSize?: number;
}