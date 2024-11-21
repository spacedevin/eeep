export interface SelectionState {
  mode: 'single' | 'multiple' | 'extended' | 'custom';
  
  current: {
    active: string;
    ranges: string[];
    type: 'cell' | 'range' | 'row' | 'column';
    discontinuous: boolean;
  };

  operations: {
    allowed: Set<'copy' | 'move' | 'clear' | 'fill'>;
    handlers: Map<string, (selection: any) => void>;
    validation: (range: string) => boolean;
  };

  highlight: {
    enabled: boolean;
    color: string;
    opacity: number;
    border: {
      style: string;
      color: string;
      width: number;
    };
  };

  events: {
    onSelect?: (range: string) => void;
    onDeselect?: (range: string) => void;
    onChange?: (selections: string[]) => void;
  };
}