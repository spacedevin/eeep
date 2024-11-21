export interface DrawingState {
  type: 'shape' | 'picture' | 'chart' | 'smartArt';
  id: string;
  name?: string;
  position: {
    from: {
      row: number;
      rowOffset?: number;
      column: number;
      columnOffset?: number;
    };
    to?: {
      row: number;
      rowOffset?: number;
      column: number;
      columnOffset?: number;
    };
  };
  size: {
    width: number;
    height: number;
    scaleX?: number;
    scaleY?: number;
    lockAspectRatio?: boolean;
  };
  style?: {
    fill?: {
      type: 'solid' | 'pattern' | 'gradient' | 'picture' | 'none';
      color?: string;
      transparency?: number;
      pattern?: string;
      gradient?: {
        type: 'linear' | 'radial' | 'rectangular' | 'path';
        angle?: number;
        stops: Array<{
          position: number;
          color: string;
        }>;
      };
    };
    line?: {
      type: 'solid' | 'dash' | 'dot';
      color?: string;
      width?: number;
      transparency?: number;
      compound?: 'single' | 'double' | 'thickThin' | 'thinThick';
      endStyle?: 'none' | 'arrow' | 'diamond' | 'oval' | 'stealth' | 'triangle';
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
  };
  text?: {
    content: string;
    font?: {
      name?: string;
      size?: number;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      color?: string;
    };
    alignment?: {
      horizontal?: 'left' | 'center' | 'right';
      vertical?: 'top' | 'middle' | 'bottom';
      rotation?: number;
    };
    margins?: {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
    };
  };
  layout?: {
    zOrder: number;
    groupId?: string;
    locked?: boolean;
    printWithSheet?: boolean;
    hidden?: boolean;
  };
}