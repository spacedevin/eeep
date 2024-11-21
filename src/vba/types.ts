export interface ControlValidation {
  validate: (value: any) => boolean;
  message: string;
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  custom?: (value: any) => boolean;
}

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

export interface ControlEvents {
  click?: () => void;
  change?: (value: any) => void;
  mouseEnter?: () => void;
  mouseLeave?: () => void;
}