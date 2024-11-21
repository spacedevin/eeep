export interface GradientState {
  type: 'linear' | 'radial';
  
  stops: Array<{
    position: number;
    color: string;
    opacity?: number;
    transition?: 'linear' | 'ease' | 'step';
  }>;

  settings: {
    direction?: number;
    spreadMethod: 'pad' | 'reflect' | 'repeat';
    colorSpace: 'rgb' | 'hsl' | 'lab';
    interpolation: 'linear' | 'spline';
  };

  radial?: {
    shape: 'circle' | 'ellipse';
    size: 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner';
    center: {
      x: number;
      y: number;
    };
    focal?: {
      x: number;
      y: number;
      radius: number;
    };
  };

  linear?: {
    angle: number;
    start?: {
      x: number;
      y: number;
    };
    end?: {
      x: number;
      y: number;
    };
  };
}