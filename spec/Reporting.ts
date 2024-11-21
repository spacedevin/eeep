export interface ReportingState {
  type: 'static' | 'dynamic';
  
  layout: {
    pages: Array<{
      id: string;
      size: { width: number; height: number };
      orientation: 'portrait' | 'landscape';
      margins: {
        top: number;
        right: number;
        bottom: number;
        left: number;
      };
      sections: Array<{
        id: string;
        type: 'header' | 'body' | 'footer' | 'group';
        height: number;
        elements: Array<{
          type: string;
          position: { x: number; y: number };
          size: { width: number; height: number };
          content: any;
          format?: any;
        }>;
      }>;
    }>;
  };
  
  data: {
    sources: Map<string, {
      type: string;
      connection: any;
      query: string;
      parameters?: Map<string, any>;
    }>;
    
    bindings: Map<string, {
      source: string;
      target: string;
      transform?: (data: any) => any;
      format?: string;
    }>;
    
    aggregations: Map<string, {
      type: 'sum' | 'average' | 'count' | 'min' | 'max';
      field: string;
      groupBy?: string[];
      filter?: string;
    }>;
  };
  
  interaction?: {
    parameters: Map<string, {
      name: string;
      type: string;
      default?: any;
      values?: any[];
    }>;
    
    drilldown: Map<string, {
      target: string;
      parameters: Map<string, string>;
      condition?: string;
    }>;
  };
}