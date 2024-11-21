export interface ShapeState {
  type: 'basic' | 'auto' | 'custom';
  shapeType: string;
  geometry: {
    points?: Array<{
      x: number;
      y: number;
      type?: 'point' | 'bezier' | 'curve';
      controlPoints?: Array<{
        x: number;
        y: number;
      }>;
    }>;
    path?: string;
    adjustments?: Array<{
      name: string;
      value: number;
      minimum?: number;
      maximum?: number;
    }>;
    presetGeometry?: {
      type: string;
      avLst?: Array<{
        name: string;
        value: number;
      }>;
    };
  };
  style: {
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
    outline?: {
      type: 'solid' | 'dash' | 'dot';
      color?: string;
      width?: number;
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
      reflection?: {
        transparency?: number;
        distance?: number;
        size?: number;
        blur?: number;
      };
      glow?: {
        color: string;
        size?: number;
        transparency?: number;
      };
      softEdge?: {
        radius: number;
      };
      bevel?: {
        type: 'circle' | 'relaxedInset' | 'cross' | 'coolSlant' | 'angle' | 'softRound' | 'convex' | 'slope' | 'divot' | 'riblet' | 'hardEdge' | 'artDeco';
        width?: number;
        height?: number;
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
    wordWrap?: boolean;
    overflow?: 'overflow' | 'clip' | 'ellipsis';
  };
}