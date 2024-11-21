export interface FontProperties {
  name?: string;
  size?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  color?: string;
  verticalAlign?: 'superscript' | 'subscript' | 'baseline';
  spacing?: number;
  kerning?: number;
  position?: 'normal' | 'superscript' | 'subscript';
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

export interface MetadataState {
  core: {
    title?: string;
    subject?: string;
    creator?: string;
    keywords?: string[];
    description?: string;
    lastModifiedBy?: string;
    revision?: number;
    created?: Date;
    modified?: Date;
  };
  custom: Map<string, {
    name: string;
    value: any;
    type: 'text' | 'date' | 'number' | 'boolean';
    namespace?: string;
  }>;
}