import { PivotTableState } from '../../spec/PivotTables';

export function setPivotFieldSort(
  state: PivotTableState,
  fieldType: 'rows' | 'columns',
  fieldIndex: number,
  sort: {
    order: 'ascending' | 'descending';
    customList?: string[];
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
          sort
        } : field
      )
    }
  };
}

export function sortPivotData(
  data: any[],
  field: string,
  order: 'ascending' | 'descending',
  customList?: string[]
): any[] {
  if (customList) {
    return sortByCustomList(data, field, customList, order);
  }

  return data.sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    
    if (order === 'ascending') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });
}

function sortByCustomList(
  data: any[],
  field: string,
  customList: string[],
  order: 'ascending' | 'descending'
): any[] {
  const indexMap = new Map(customList.map((item, index) => [item, index]));

  return data.sort((a, b) => {
    const aIndex = indexMap.get(a[field]) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = indexMap.get(b[field]) ?? Number.MAX_SAFE_INTEGER;
    
    if (order === 'ascending') {
      return aIndex - bIndex;
    } else {
      return bIndex - aIndex;
    }
  });
}
