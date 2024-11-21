export interface EventState {
  handlers: Map<string, Array<{
    handler: (sender: any, args: any) => void;
    priority: number;
    once?: boolean;
  }>>;
  bubbling: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
}

export interface EventArgs {
  type: string;
  source: any;
  target: any;
  cancelable?: boolean;
  defaultPrevented?: boolean;
  timestamp: number;
  data?: any;
}

export interface WorkbookEventArgs extends EventArgs {
  workbook: any;
  type: 'open' | 'beforeSave' | 'afterSave' | 'beforeClose' | 'calculate' | 'protectionChange';
}

export interface WorksheetEventArgs extends EventArgs {
  worksheet: any;
  type: 'selectionChange' | 'beforeRightClick' | 'beforeDoubleClick' | 'change' | 'calculate' | 'protectionChange';
  range?: string;
}

export interface RangeEventArgs extends EventArgs {
  range: string;
  type: 'change' | 'calculate' | 'validate' | 'beforeEdit' | 'afterEdit';
  value?: any;
  formula?: string;
  oldValue?: any;
  oldFormula?: string;
}