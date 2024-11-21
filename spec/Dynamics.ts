export interface DynamicsState {
  arrays: {
    spillRanges: Map<string, {
      source: string;
      target: string;
      size: {
        rows: number;
        columns: number;
      };
      formula: string;
      isVolatile: boolean;
    }>;
    
    arrayFormulas: Map<string, {
      range: string;
      formula: string;
      dynamic: boolean;
      dependencies: string[];
    }>;
  };
  
  names: {
    dynamicRanges: Map<string, {
      name: string;
      formula: string;
      currentRange: string;
      updateTrigger: 'auto' | 'manual' | 'onCalculate';
    }>;
    
    calculatedRanges: Map<string, {
      name: string;
      formula: string;
      dependencies: string[];
      cache?: {
        value: string;
        timestamp: number;
      };
    }>;
  };
  
  formatting: {
    rules: Array<{
      target: string;
      condition: string;
      style: any;
      priority: number;
      dynamic: boolean;
    }>;
    
    autoFormat: Map<string, {
      trigger: 'value' | 'formula' | 'update';
      format: any;
      applyTo: 'cell' | 'row' | 'column' | 'range';
    }>;
  };
}