import { PageBreakState } from '../../spec/PageBreaks';

export { PageBreakState };

export function createPageBreaks(): PageBreakState {
  return {
    horizontal: [],
    vertical: [],
    ranges: [],
    options: {
      view: 'normal',
      showBreaks: true,
      fitToPage: false,
      scaleToFit: false
    }
  };
}

export function addHorizontalBreak(
  state: PageBreakState,
  row: number,
  type: 'manual' | 'automatic' = 'manual',
  properties?: {
    keepTogether?: boolean;
    splitAllowed?: boolean;
    forceBreak?: boolean;
  }
): PageBreakState {
  return {
    ...state,
    horizontal: [...state.horizontal, {
      row,
      type,
      visible: true,
      properties
    }]
  };
}

export function addVerticalBreak(
  state: PageBreakState,
  column: number,
  type: 'manual' | 'automatic' = 'manual',
  properties?: {
    keepTogether?: boolean;
    splitAllowed?: boolean;
    forceBreak?: boolean;
  }
): PageBreakState {
  return {
    ...state,
    vertical: [...state.vertical, {
      column,
      type,
      visible: true,
      properties
    }]
  };
}

export function setPageBreakOptions(
  state: PageBreakState,
  options: Partial<PageBreakState['options']>
): PageBreakState {
  return {
    ...state,
    options: {
      ...state.options,
      ...options
    }
  };
}