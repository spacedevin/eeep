export interface Font {
  name?: string;
  size?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  color?: string;
}

export interface Border {
  style?: 'thin' | 'medium' | 'thick' | 'dashed' | 'dotted' | 'double';
  color?: string;
}

export interface CellStyle {
  font?: Font;
  fill?: {
    type: 'pattern' | 'gradient';
    color?: string;
    pattern?: string;
  };
  border?: {
    top?: Border;
    right?: Border;
    bottom?: Border;
    left?: Border;
  };
  alignment?: {
    horizontal?: 'left' | 'center' | 'right';
    vertical?: 'top' | 'middle' | 'bottom';
    wrapText?: boolean;
    textRotation?: number;
  };
  numberFormat?: string;
}