export interface AutoFilterState {
  range: string;
  columns: Map<number, {
    filterType: 'basic' | 'custom' | 'dynamic';
    criteria?: Array<{
      operator: 'equals' | 'notEquals' | 'greaterThan' | 'lessThan' | 'greaterOrEqual' | 'lessOrEqual' | 'contains' | 'notContains' | 'beginsWith' | 'endsWith' | 'between';
      value1: any;
      value2?: any;
      conjunction?: 'and' | 'or';
    }>;
    dynamicFilter?: {
      type: 'aboveAverage' | 'belowAverage' | 'tomorrow' | 'today' | 'yesterday' | 'nextWeek' | 'thisWeek' | 'lastWeek' | 'nextMonth' | 'thisMonth' | 'lastMonth' | 'nextQuarter' | 'thisQuarter' | 'lastQuarter' | 'nextYear' | 'thisYear' | 'lastYear' | 'yearToDate' | 'allDatesInPeriod';
      period?: 'year' | 'quarter' | 'month' | 'week' | 'day';
    };
    top10?: {
      percent?: boolean;
      bottom?: boolean;
      count: number;
    };
    customFilters?: Array<{
      field: string;
      criteria: string;
      value: any;
    }>;
    filterValues?: Set<any>;
    dateGrouping?: {
      groupBy: 'years' | 'quarters' | 'months' | 'days';
      startDate?: Date;
      endDate?: Date;
    };
  }>;
  showFilterButton?: boolean;
  reapply?: boolean;
  evalOrder?: number[];
}