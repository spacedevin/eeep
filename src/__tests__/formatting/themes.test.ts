import {
  createTheme,
  setThemeColors,
  setThemeFonts,
  addFillStyle
} from '../../formatting/themes';

describe('Theme Management', () => {
  test('creates default theme', () => {
    const theme = createTheme();
    expect(theme.name).toBe('Default Theme');
    expect(theme.colors.dark1).toBe('#000000');
    expect(theme.fonts.major.latin).toBe('Calibri Light');
  });

  test('sets theme colors', () => {
    let theme = createTheme();
    theme = setThemeColors(theme, {
      accent1: '#FF0000',
      accent2: '#00FF00'
    });
    
    expect(theme.colors.accent1).toBe('#FF0000');
    expect(theme.colors.accent2).toBe('#00FF00');
  });

  test('sets theme fonts', () => {
    let theme = createTheme();
    theme = setThemeFonts(theme, {
      major: { latin: 'Arial' },
      minor: { latin: 'Times New Roman' }
    });
    
    expect(theme.fonts.major.latin).toBe('Arial');
    expect(theme.fonts.minor.latin).toBe('Times New Roman');
  });

  test('adds fill style', () => {
    let theme = createTheme();
    const fill = {
      name: 'Custom Fill',
      fill: { type: 'solid', color: '#FF0000' }
    };
    
    theme = addFillStyle(theme, fill);
    expect(theme.formatScheme.fillStyles).toHaveLength(1);
    expect(theme.formatScheme.fillStyles[0]).toEqual(fill);
  });
});