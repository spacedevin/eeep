import { ThemeState } from '../../spec/Themes';

export function createTheme(): ThemeState {
  return {
    name: 'Default Theme',
    colors: {
      dark1: '#000000',
      light1: '#FFFFFF',
      dark2: '#444444',
      light2: '#F3F3F3',
      accent1: '#4472C4',
      accent2: '#ED7D31',
      accent3: '#A5A5A5',
      accent4: '#FFC000',
      accent5: '#5B9BD5',
      accent6: '#70AD47',
      hyperlink: '#0563C1',
      followedHyperlink: '#954F72',
      background1: '#FFFFFF',
      text1: '#000000',
      background2: '#F2F2F2',
      text2: '#444444'
    },
    fonts: {
      major: {
        latin: 'Calibri Light'
      },
      minor: {
        latin: 'Calibri'
      }
    },
    formatScheme: {
      fillStyles: [],
      lineStyles: [],
      effectStyles: [],
      backgroundFillStyles: []
    }
  };
}

export function setThemeColors(theme: ThemeState, colors: Partial<ThemeState['colors']>): ThemeState {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      ...colors
    }
  };
}

export function setThemeFonts(theme: ThemeState, fonts: Partial<ThemeState['fonts']>): ThemeState {
  return {
    ...theme,
    fonts: {
      ...theme.fonts,
      ...fonts
    }
  };
}

export function addFillStyle(theme: ThemeState, fill: any): ThemeState {
  return {
    ...theme,
    formatScheme: {
      ...theme.formatScheme,
      fillStyles: [...theme.formatScheme.fillStyles, fill]
    }
  };
}