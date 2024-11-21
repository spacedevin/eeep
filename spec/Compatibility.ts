export interface CompatibilityState {
  fileFormat: {
    version: 'xlsx' | 'xlsm' | 'xltx' | 'xltm' | 'csv' | 'xml';
    minVersion: number;
    maxVersion: number;
    features: Set<string>;
  };
  
  runtime: {
    platform: 'node' | 'browser' | 'mobile';
    version: string;
    capabilities: Set<string>;
  };
  
  features: Map<string, {
    name: string;
    supported: boolean;
    minVersion?: number;
    maxVersion?: number;
    alternatives?: string[];
    warnings?: string[];
  }>;
  
  conversion: {
    enabled: boolean;
    mode: 'strict' | 'compatible' | 'loose';
    handlers: Map<string, (data: any) => any>;
  };
}