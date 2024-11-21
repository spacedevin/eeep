import { PivotTableState } from '../../spec/PivotTables';
import { addDays, addMonths, startOfMonth, startOfQuarter, startOfYear } from 'date-fns';

export function setPivotFieldGrouping(
  state: PivotTableState,
  fieldType: 'rows' | 'columns',
  fieldIndex: number,
  grouping: {
    type: 'date' | 'number' | 'text';
    start?: Date | number;
    end?: Date | number;
    interval?: number;
    items?: string[];
  }
): PivotTableState {
  const fields = state.fields[fieldType];
  if (!fields || fieldIndex >= fields.length) {
    throw new Error(`Invalid field index ${fieldIndex} for ${fieldType}`);
  }

  return {
    ...state,
    fields: {
      ...state.fields,
      [fieldType]: fields.map((field, i) => 
        i === fieldIndex ? {
          ...field,
          grouping
        } : field
      )
    }
  };
}

export function groupPivotData(
  data: any[],
  field: string,
  grouping: {
    type: 'date' | 'number' | 'text';
    start?: Date | number;
    end?: Date | number;
    interval?: number;
    items?: string[];
  }
): Map<string, any[]> {
  switch (grouping.type) {
    case 'date':
      return groupByDate(data, field, {
        start: grouping.start as Date,
        end: grouping.end as Date,
        interval: grouping.interval
      });
    case 'number':
      return groupByNumber(data, field, {
        start: grouping.start as number,
        end: grouping.end as number,
        interval: grouping.interval
      });
    case 'text':
      return groupByText(data, field, {
        items: grouping.items
      });
    default:
      throw new Error(`Invalid grouping type: ${grouping.type}`);
  }
}

function groupByDate(
  data: any[],
  field: string,
  grouping: {
    start?: Date;
    end?: Date;
    interval?: number;
  }
): Map<string, any[]> {
  const groups = new Map<string, any[]>();
  const { start, end, interval = 1 } = grouping;

  data.forEach(item => {
    const date = new Date(item[field]);
    if (start && date < start) return;
    if (end && date > end) return;

    let groupKey: string;
    if (interval >= 365) {
      groupKey = startOfYear(date).toISOString();
    } else if (interval >= 90) {
      groupKey = startOfQuarter(date).toISOString();
    } else if (interval >= 30) {
      groupKey = startOfMonth(date).toISOString();
    } else {
      groupKey = date.toISOString().split('T')[0];
    }

    const group = groups.get(groupKey) || [];
    group.push(item);
    groups.set(groupKey, group);
  });

  return groups;
}

function groupByNumber(
  data: any[],
  field: string,
  grouping: {
    start?: number;
    end?: number;
    interval?: number;
  }
): Map<string, any[]> {
  const groups = new Map<string, any[]>();
  const { start = 0, interval = 1 } = grouping;

  data.forEach(item => {
    const value = item[field];
    if (typeof value !== 'number') return;
    if (grouping.end && value > grouping.end) return;

    const groupIndex = Math.floor((value - start) / interval);
    const groupStart = start + groupIndex * interval;
    const groupEnd = groupStart + interval;
    const groupKey = `${groupStart}-${groupEnd}`;

    const group = groups.get(groupKey) || [];
    group.push(item);
    groups.set(groupKey, group);
  });

  return groups;
}

function groupByText(
  data: any[],
  field: string,
  grouping: {
    items?: string[];
  }
): Map<string, any[]> {
  const groups = new Map<string, any[]>();
  const { items } = grouping;

  data.forEach(item => {
    const value = item[field]?.toString();
    if (!value) return;

    if (items && !items.includes(value)) {
      const group = groups.get('Other') || [];
      group.push(item);
      groups.set('Other', group);
    } else {
      const group = groups.get(value) || [];
      group.push(item);
      groups.set(value, group);
    }
  });

  return groups;
}