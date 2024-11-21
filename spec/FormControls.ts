export interface FormControlState {
  controls: Map<string, {
    type: 'button' | 'checkbox' | 'combobox' | 'listbox' | 'textbox' | 'spinbutton' | 
          'groupbox' | 'radio' | 'scrollbar' | 'image' | 'label' | 'tabstrip' | 'multipage' | 'frame';
    properties: {
      name: string;
      caption?: string;
      value?: any;
      enabled: boolean;
      visible: boolean;
      position: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
      style?: {
        font?: any;
        color?: string;
        background?: string;
        border?: any;
      };
    };
    specific?: {
      // Common properties
      items?: string[];
      multiSelect?: boolean;
      selection?: number[];
      groupName?: string;
      
      // SpinButton/ScrollBar specific
      min?: number;
      max?: number;
      step?: number;
      largeChange?: number;
      smallChange?: number;
      orientation?: 'horizontal' | 'vertical';

      // TabStrip specific
      tabs?: Array<{
        name: string;
        caption: string;
        index: number;
        visible: boolean;
        enabled: boolean;
        controls: string[];
      }>;

      // MultiPage specific
      pages?: Array<{
        name: string;
        caption: string;
        index: number;
        visible: boolean;
        enabled: boolean;
        controls: string[];
        accelerator?: string;
        transitionEffect?: 'none' | 'box' | 'cover' | 'dissolve' | 'fade' | 'push' | 'wipe';
        transitionPeriod?: number;
      }>;

      // Frame specific
      controls?: string[];

      // Image specific
      source?: string;
      sizeMode?: 'stretch' | 'zoom' | 'clip';
      borderStyle?: 'none' | 'single' | 'double';
      pictureAlignment?: 'center' | 'top' | 'bottom' | 'left' | 'right';

      // Common control properties
      selectedIndex?: number;
      style?: 'tabs' | 'buttons';
      multiRow?: boolean;
      tabOrientation?: 'top' | 'bottom' | 'left' | 'right';
    };
  }>;
  events: Map<string, {
    click?: () => void;
    change?: (value: any) => void;
    mouseEnter?: () => void;
    mouseLeave?: () => void;
  }>;
  validation: {
    enabled: boolean;
    rules: Map<string, {
      validate: (value: any) => boolean;
      message: string;
    }>;
  };
  bindings: Map<string, {
    source: string;
    target: string;
    mode: 'oneWay' | 'twoWay';
    format?: string;
  }>;
}