import { PivotTableState } from '../../spec/PivotTables';

export function addPivotFilter(
  state: PivotTableState,
  field: {
    sourceField: string;
    name?: string;
    filterType: 'value' | 'label' | 'date' | 'custom';
    criteria?: Array<{
      operator: string;
      value: any;
      conjunction?: 'and' | 'or';
    }>;
    items?: string[];
    exclude?: boolean;
  }
): PivotTableState {
  return {
    ...state,
    fields: {
      ...state.fields,
      filters: [...state.fields.filters, field]
    }
  };
}

export function updatePivotFilter(
  state: PivotTableState,
  index: number,
  updates: Partial<PivotTableState['fields']['filters'][0]>
): PivotTableState {
  const filters = [...state.fields.filters];
  if (index >= 0 && index < filters.length) {
    filters[index] = {
      ...filters[index],
      ...updates
    };
  }

  return {
    ...state,
    fields: {
      ...state.fields,
      filters
    }
  };
}

export function removePivotFilter(
  state: PivotTableState,
  index: number
): PivotTableState {
  const filters = [...state.fields.filters];
  filters.splice(index, 1);

  return {
    ...state,
    fields: {
      ...state.fields,
      filters
    }
  };
}

export function applyPivotFilters(
  state: PivotTableState,
  data: any[]
): any[] {
  return state.fields.filters.reduce((filteredData, filter) => {
    switch (filter.filterType) {
      case 'value':
        return filterByValue(filteredData, filter);
      case 'label':
        return filterByLabel(filteredData, filter);
      case 'date':
        return filterByDate(filteredData, filter);
      case 'custom':
        return filterByCustom(filteredData, filter);
      default:
        return filteredData;
    }
  }, data);
}

function filterByValue(data: any[], filter: any): any[] {
  return data.filter(item => {
    const value = item[filter.sourceField];
    return filter.criteria?.every((criterion: any) => {
      switch (criterion.operator) {
        case 'equals':
          return value === criterion.value;
        case 'notEquals':
          return value !== criterion.value;
        case 'greaterThan':
          return value > criterion.value;
        case 'lessThan':
          return value < criterion.value;
        case 'between':
          return value >= criterion.value[0] && value <= criterion.value[1];
        default:
          return true;
      }
    });
  });
}

function filterByLabel(data: any[], filter: any): any[] {
  return data.filter(item => {
    const label = item[filter.sourceField]?.toString();
    return filter.items?.includes(label) !== filter.exclude;
  });
}

function filterByDate(data: any[], filter: any): any[] {
  return data.filter(item => {
    const date = new Date(item[filter.sourceField]);
    return filter.criteria?.every((criterion: any) => {
      const compareDate = new Date(criterion.value);
      switch (criterion.operator) {
        case 'equals':
          return date.getTime() === compareDate.getTime();
        case 'before':
          return date < compareDate;
        case 'after':
          return date > compareDate;
        case 'between':
          const [start, end] = criterion.value.map((d: string) => new Date(d));
          return date >= start && date <= end;
        default:
          return true;
      }
    });
  });
}

function filterByCustom(data: any[], filter: any): any[] {
  // Placeholder for custom filter implementation
  // In a real implementation, this would:
  // 1. Evaluate custom filter expression
  // 2. Apply filter to data
  // 3. Return filtered results
  return data;
}
