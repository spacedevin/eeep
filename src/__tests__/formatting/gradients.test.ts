import {
  createGradient,
  addGradientStop,
  setGradientSettings,
  setRadialGradientShape
} from '../../formatting/gradients';

describe('Gradient Management', () => {
  test('creates linear gradient', () => {
    const gradient = createGradient('linear');
    expect(gradient.type).toBe('linear');
    expect(gradient.stops).toHaveLength(0);
    expect(gradient.settings.colorSpace).toBe('rgb');
  });

  test('creates radial gradient', () => {
    const gradient = createGradient('radial');
    expect(gradient.type).toBe('radial');
    expect(gradient.stops).toHaveLength(0);
  });

  test('adds gradient stop', () => {
    let gradient = createGradient('linear');
    gradient = addGradientStop(gradient, 0, '#000000', {
      opacity: 1,
      transition: 'linear'
    });
    
    expect(gradient.stops).toHaveLength(1);
    expect(gradient.stops[0].color).toBe('#000000');
    expect(gradient.stops[0].position).toBe(0);
  });

  test('sets gradient settings', () => {
    let gradient = createGradient('linear');
    gradient = setGradientSettings(gradient, {
      spreadMethod: 'reflect',
      colorSpace: 'hsl'
    });
    
    expect(gradient.settings.spreadMethod).toBe('reflect');
    expect(gradient.settings.colorSpace).toBe('hsl');
  });

  test('sets radial gradient shape', () => {
    let gradient = createGradient('radial');
    gradient = setRadialGradientShape(gradient, 'circle', {
      size: 'closest-side',
      center: { x: 0.5, y: 0.5 }
    });
    
    expect(gradient.radial?.shape).toBe('circle');
    expect(gradient.radial?.size).toBe('closest-side');
  });

  test('throws error setting radial shape on linear gradient', () => {
    const gradient = createGradient('linear');
    expect(() => setRadialGradientShape(gradient, 'circle')).toThrow();
  });
});