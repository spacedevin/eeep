export interface PatternState {
  fills: {
    type: 'solid' | 'gradient' | 'linear' | 'radial' | 'texture';
    properties: {
      colors: string[];
      opacity?: number;
      direction?: number;
      scale?: number;
      angle?: number;
      positions?: number[];
    };
    texture?: {
      type: string;
      file?: string;
      data?: Uint8Array;
      repeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
    };
  };

  borders: {
    style: 'solid' | 'dashed' | 'dotted' | 'double' | 'custom';
    properties: {
      width: number;
      color: string;
      opacity?: number;
      dashPattern?: number[];
      dotSpacing?: number;
      cornerStyle?: 'miter' | 'round' | 'bevel';
    };
    compound?: {
      type: 'single' | 'double' | 'triple';
      spacing: number[];
      widths: number[];
    };
  };

  custom: Map<string, {
    name: string;
    type: 'fill' | 'border';
    definition: string;
    properties: Map<string, any>;
  }>;
}