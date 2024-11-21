export interface Drawing3DState {
  type: '3DColumn' | '3DBar' | '3DPie' | '3DSurface';
  
  view: {
    rotation: {
      x: number;
      y: number;
      z: number;
    };
    perspective: number;
    zoom: number;
    camera: {
      latitude: number;
      longitude: number;
      revolution: number;
    };
  };
  
  effects: {
    lighting: {
      type: 'bright' | 'normal' | 'soft' | 'harsh';
      direction: {
        altitude: number;
        azimuth: number;
      };
      ambient: number;
    };
    material: {
      type: 'matte' | 'plastic' | 'metal' | 'wireframe';
      specularity: number;
      diffuse: number;
    };
    surface: {
      texture?: string;
      finish: 'standard' | 'matte' | 'glossy';
      transparency: number;
    };
    shadow: {
      type: 'inner' | 'outer' | 'perspective';
      color: string;
      size: number;
      blur: number;
      angle: number;
    };
  };
  
  options: {
    rightAngleAxes: boolean;
    floorWall: boolean;
    sideWall: boolean;
    backWall: boolean;
  };
}