export interface FontProperties {
  name?: string;
  size?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  color?: string;
  verticalAlign?: 'superscript' | 'subscript' | 'baseline';
}

export interface BorderProperties {
  style?: 'thin' | 'medium' | 'thick' | 'double' | 'dotted' | 'dashed';
  color?: string;
  width?: number;
}

export interface FillProperties {
  type: 'solid' | 'pattern' | 'gradient';
  color?: string;
  pattern?: string;
  gradient?: {
    type: 'linear' | 'radial';
    angle?: number;
    stops: Array<{
      position: number;
      color: string;
    }>;
  };
}

export interface AlignmentProperties {
  horizontal?: 'left' | 'center' | 'right' | 'justify';
  vertical?: 'top' | 'middle' | 'bottom';
  wrapText?: boolean;
  textRotation?: number;
  indent?: number;
}