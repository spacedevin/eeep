export interface StyleState {
  name?: string;
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
  numberFormat?: {
    formatCode: string;
    culture?: string;
  };
  protection?: {
    locked?: boolean;
    hidden?: boolean;
  };
}