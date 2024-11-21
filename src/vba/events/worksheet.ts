import { VBAState } from '../../../spec/VBA';

export interface WorksheetEvent {
  type: 'Change' | 'SelectionChange' | 'Calculate' | 'BeforeDoubleClick' | 'BeforeRightClick';
  handler: string;
  context?: any;
}

export function registerWorksheetEvent(
  state: VBAState,
  sheetName: string,
  eventType: WorksheetEvent['type'],
  handler: string
): VBAState {
  const module = state.modules.get(sheetName);
  if (!module) {
    throw new Error(`Sheet module ${sheetName} not found`);
  }

  // Add event handler to module code
  const eventHandler = `
Private Sub Worksheet_${eventType}()
${handler}
End Sub
`;

  return {
    ...state,
    modules: new Map(state.modules).set(sheetName, {
      ...module,
      code: module.code + eventHandler
    })
  };
}