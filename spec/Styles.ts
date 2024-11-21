export interface StyleState {
  name?: string;
  numberFormat?: {
    format: string;
    culture?: string;
  };
  font?: {
    name?: string;
    size?: number;
    family?: number;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    color?: string;
    verticalAlign?: 'superscript' | 'subscript' | 'baseline';
    spacing?: number;
    kerning?: number;
    position?: 'normal' | 'superscript' | 'subscript';
  };
  fill?: {
    type: 'pattern' | 'gradient';
    pattern?: 'solid' | 'darkGray' | 'mediumGray' | 'lightGray' | 'gray125' | 'gray0625';
    color?: string;
    backgroundColor?: string;
    gradientType?: 'linear' | 'path';
    gradientDegree?: number;
    gradientStops?: Array<{
      position: number;
      color: string;
    }>;
  };
  border?: {
    top?: {
      style?: 'thin' | 'medium' | 'thick' | 'double' | 'dotted' | 'dashed';
      color?: string;
    };
    right?: {
      style?: 'thin' | 'medium' | 'thick' | 'double' | 'dotted' | 'dashed';
      color?: string;
    };
    bottom?: {
      style?: 'thin' | 'medium' | 'thick' | 'double' | 'dotted' | 'dashed';
      color?: string;
    };
    left?: {
      style?: 'thin' | 'medium' | 'thick' | 'double' | 'dotted' | 'dashed';
      color?: string;
    };
    diagonal?: {
      style?: 'thin' | 'medium' | 'thick' | 'double' | 'dotted' | 'dashed';
      color?: string;
      up?: boolean;
      down?: boolean;
    };
  };
  alignment?: {
    horizontal?: 'left' | 'center' | 'right' | 'fill' | 'justify' | 'centerContinuous';
    vertical?: 'top' | 'middle' | 'bottom' | 'justify' | 'distributed';
    wrapText?: boolean;
    shrinkToFit?: boolean;
    indent?: number;
    textRotation?: number;
    readingOrder?: 'contextDependent' | 'leftToRight' | 'rightToLeft';
  };
  protection?: {
    locked?: boolean;
    hidden?: boolean;
  };
  effects?: {
    shadow?: {
      type: 'outer' | 'inner';
      color: string;
      transparency?: number;
      blur?: number;
      distance?: number;
      angle?: number;
    };
    glow?: {
      color: string;
      transparency?: number;
      radius?: number;
    };
    softEdge?: {
      radius: number;
    };
  };
  quotePrefix?: boolean;
  pivotButton?: boolean;
  xfId: number;
}