export interface SmartTagState {
  tags: Map<string, {
    name: string;
    type: 'builtin' | 'custom';
    value: any;
    metadata?: Map<string, any>;
    properties?: {
      url?: string;
      tooltip?: string;
      visible?: boolean;
      category?: string;
    };
  }>;
  
  definitions: Map<string, {
    name: string;
    namespace: string;
    recognizer?: (value: any) => boolean;
    formatter?: (value: any) => string;
    validator?: (value: any) => boolean;
  }>;
  
  options: {
    enabled: boolean;
    showIndicator: boolean;
    autoRecognize: boolean;
    caseSensitive: boolean;
  };
}