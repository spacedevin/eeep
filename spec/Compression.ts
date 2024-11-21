export interface CompressionState {
  type: 'full' | 'part' | 'none';
  level: 'maximum' | 'fast' | 'none' | 'custom';
  
  options: {
    method: 'deflate' | 'store';
    windowBits: number;
    memLevel: number;
    strategy: 'default' | 'filtered' | 'huffmanOnly' | 'rle' | 'fixed';
  };
  
  streams: {
    buffer: number;
    threshold: number;
    tempPath?: string;
    cleanup: boolean;
  };
  
  resources: {
    maxMemory: number;
    useTemp: boolean;
    cacheSize: number;
    cleanupInterval: number;
  };
  
  statistics: {
    originalSize: number;
    compressedSize: number;
    ratio: number;
    duration: number;
  };
}