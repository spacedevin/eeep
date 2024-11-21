import { VBAState } from '../../../spec/VBA';

export interface WorkbookEvent {
  type: 'Open' | 'Close' | 'BeforeSave' | 'AfterSave' | 'SheetActivate' | 'SheetDeactivate';
  handler: string;
  context?: any;
}

export function registerWorkbookEvent(
  state: VBAState,
  eventType: WorkbookEvent['type'],
  handler: string
): VBAState {
  const module = state.modules.get('ThisWorkbook');
  if (!module) {
    throw new Error('ThisWorkbook module not found');
  }

  // Add event handler to module code
  const eventHandler = `
Private Sub Workbook_${eventType}()
${handler}
End Sub
`;

  return {
    ...state,
    modules: new Map(state.modules).set('ThisWorkbook', {
      ...module,
      code: module.code + eventHandler
    })
  };
}