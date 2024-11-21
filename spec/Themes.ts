export interface ThemeState {
  name: string;
  colors: {
    dark1: string;
    light1: string;
    dark2: string;
    light2: string;
    accent1: string;
    accent2: string;
    accent3: string;
    accent4: string;
    accent5: string;
    accent6: string;
    hyperlink: string;
    followedHyperlink: string;
    background1: string;
    text1: string;
    background2: string;
    text2: string;
  };
  fonts: {
    major: {
      latin?: string;
      eastAsian?: string;
      complexScript?: string;
    };
    minor: {
      latin?: string;
      eastAsian?: string;
      complexScript?: string;
    };
  };
  formatScheme: {
    fillStyles: Array<{
      name: string;
      fill: {
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
      };
    }>;
    lineStyles: Array<{
      name: string;
      line: {
        type: 'solid' | 'dash' | 'dot';
        color: string;
        width: number;
        compound?: 'single' | 'double' | 'thickThin' | 'thinThick';
      };
    }>;
    effectStyles: Array<{
      name: string;
      effects: {
        shadow?: {
          type: 'outer' | 'inner';
          color: string;
          blur?: number;
          distance?: number;
          angle?: number;
        };
        glow?: {
          color: string;
          radius?: number;
        };
        softEdge?: {
          radius: number;
        };
      };
    }>;
    backgroundFillStyles: Array<{
      name: string;
      fill: {
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
      };
    }>;
  };
}