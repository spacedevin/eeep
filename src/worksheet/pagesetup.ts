import { WorksheetState } from './types';
import { PageSetup, PageMargins } from '../interfaces/pagesetup';
import { PageBreakState, createPageBreaks, addHorizontalBreak, addVerticalBreak, setPageBreakOptions } from '../printing/pagebreaks';

export function setPageSetup(state: WorksheetState, setup: PageSetup): WorksheetState {
  const newState = { ...state };
  newState.pageSetup = { ...newState.pageSetup, ...setup };
  newState.sheet['!pageSetup'] = newState.pageSetup;
  return newState;
}

export function getPageSetup(state: WorksheetState): PageSetup {
  return { ...state.pageSetup };
}

export function setPageMargins(state: WorksheetState, margins: Partial<PageMargins>): WorksheetState {
  const newState = { ...state };
  newState.pageMargins = { ...newState.pageMargins, ...margins };
  newState.sheet['!margins'] = newState.pageMargins;
  return newState;
}

export function getPageMargins(state: WorksheetState): PageMargins {
  return { ...state.pageMargins };
}

export function initializePageBreaks(state: WorksheetState): WorksheetState {
  return {
    ...state,
    pageBreaks: createPageBreaks()
  };
}

export function addPageBreak(
  state: WorksheetState,
  position: number,
  type: 'horizontal' | 'vertical'
): WorksheetState {
  if (!state.pageBreaks) {
    state = initializePageBreaks(state);
  }

  const pageBreaks = type === 'horizontal' 
    ? addHorizontalBreak(state.pageBreaks!, position)
    : addVerticalBreak(state.pageBreaks!, position);

  return {
    ...state,
    pageBreaks
  };
}

export function setPageBreakView(
  state: WorksheetState,
  view: 'normal' | 'pageBreakPreview' | 'pageLayout'
): WorksheetState {
  if (!state.pageBreaks) {
    state = initializePageBreaks(state);
  }

  const pageBreaks = setPageBreakOptions(state.pageBreaks!, {
    view,
    showBreaks: view !== 'normal'
  });

  return {
    ...state,
    pageBreaks
  };
}