export interface LocalizationState {
  culture: {
    language: string;
    country?: string;
    calendar: 'gregorian' | 'lunar' | 'hijri' | 'hebrew';
    firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  };
  
  numberFormat: {
    decimalSeparator: string;
    groupSeparator: string;
    currencySymbol: string;
    percentSymbol: string;
    negativePattern: string;
    positivePattern?: string;
    decimalDigits: number;
    groupSizes: number[];
  };
  
  dateFormat: {
    shortDate: string;
    longDate: string;
    shortTime: string;
    longTime: string;
    monthNames: string[];
    monthNamesShort: string[];
    dayNames: string[];
    dayNamesShort: string[];
    amDesignator: string;
    pmDesignator: string;
    dateSeparator: string;
    timeSeparator: string;
  };
  
  customFormats: Map<string, {
    format: string;
    culture?: string;
    calendar?: string;
  }>;
  
  resources: Map<string, {
    strings: Map<string, string>;
    errors: Map<string, string>;
    help: Map<string, string>;
  }>;
}