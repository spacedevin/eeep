export interface StreamState {
  mode: 'read' | 'write';
  options: {
    bufferSize: number;
    cacheSize: number;
    memoryLimit: number;
    compression: boolean;
    async: boolean;
    parallel: boolean;
  };
  status: {
    position: number;
    rowCount: number;
    cellCount: number;
    memoryUsed: number;
    isOpen: boolean;
  };
  cache: {
    strings: Map<number, string>;
    styles: Map<number, any>;
    formulas: Map<string, string>;
  };
}

export interface StreamReader {
  position: number;
  bufferSize: number;
  read(options?: {
    rows?: number;
    cells?: number;
    parseOptions?: {
      values?: boolean;
      formulas?: boolean;
      styles?: boolean;
    };
  }): Promise<{
    data: any[][];
    position: number;
    hasMore: boolean;
  }>;
}

export interface StreamWriter {
  position: number;
  bufferSize: number;
  write(data: any[][], options?: {
    flush?: boolean;
    styles?: boolean;
    formulas?: boolean;
  }): Promise<void>;
  flush(): Promise<void>;
}