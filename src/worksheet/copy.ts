import { WorksheetState } from './types';
import { createWorksheet } from './createworksheet';

export function copyWorksheet(state: WorksheetState): WorksheetState {
  const newSheet = JSON.parse(JSON.stringify(state.sheet));
  const copiedState = createWorksheet(state.name + ' (Copy)', newSheet);
  
  // Copy styles
  if (state.sheet['!styles']) {
    copiedState.sheet['!styles'] = JSON.parse(JSON.stringify(state.sheet['!styles']));
    copiedState.styles = new Map();
    state.styles.forEach((style, cell) => {
      copiedState.styles.set(cell, JSON.parse(JSON.stringify(style)));
    });
  }
  
  // Copy page setup and margins
  if (state.sheet['!pageSetup']) {
    copiedState.pageSetup = { ...state.pageSetup };
    copiedState.sheet['!pageSetup'] = { ...state.sheet['!pageSetup'] };
  }
  
  if (state.sheet['!margins']) {
    copiedState.pageMargins = { ...state.pageMargins };
    copiedState.sheet['!margins'] = { ...state.sheet['!margins'] };
  }
  
  return copiedState;
}