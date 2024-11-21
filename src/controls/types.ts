import { FormControlState } from '../../spec/FormControls';

export interface ControlProperties {
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
}

export interface ControlSpecific {
  items?: string[];
  min?: number;
  max?: number;
  step?: number;
  multiSelect?: boolean;
  selection?: number[];
  groupName?: string;
  largeChange?: number;
  smallChange?: number;
  orientation?: 'horizontal' | 'vertical';
}

export interface ControlEvents {
  click?: () => void;
  change?: (value: any) => void;
  mouseEnter?: () => void;
  mouseLeave?: () => void;
}

export interface ControlValidation {
  validate: (value: any) => boolean;
  message: string;
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  custom?: (value: any) => boolean;
}

export interface ControlBinding {
  source: string;
  target: string;
  mode: 'oneWay' | 'twoWay';
  format?: string;
  transform?: (value: any) => any;
}