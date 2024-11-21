export interface GlobalizationState {
  languages: Map<string, {
    code: string;
    name: string;
    native: string;
    fallback?: string;
    translations: Map<string, string>;
  }>;
  
  regions: Map<string, {
    code: string;
    formats: {
      number: string;
      currency: string;
      date: string;
      time: string;
    };
    calendar: {
      type: string;
      firstDayOfWeek: number;
      weekendDays: number[];
    };
  }>;
  
  formats: {
    patterns: Map<string, string>;
    custom: Map<string, {
      format: string;
      culture?: string;
      calendar?: string;
    }>;
  };
  
  culture: {
    current: string;
    fallback: string[];
    chain: string[];
    neutral: boolean;
  };
}