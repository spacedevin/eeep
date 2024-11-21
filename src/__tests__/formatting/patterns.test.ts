import {
  createPattern,
  setPatternColors,
  setPatternProperties,
  setBorderProperties,
  addCustomPattern
} from '../../formatting/patterns';

describe('Pattern Management', () => {
  test('creates pattern', () => {
    const pattern = createPattern('solid');
    expect(pattern.fills.type).toBe('solid');
    expect(pattern.fills.properties.colors).toHaveLength(0);
    expect(pattern.borders.style).toBe('solid');
  });

  test('sets pattern colors', () => {
    let pattern = createPattern('solid');
    pattern = setPatternColors(pattern, ['#FF0000', '#00FF00']);
    
    expect(pattern.fills.properties.colors).toHaveLength(2);
    expect(pattern.fills.properties.colors[0]).toBe('#FF0000');
  });

  test('sets pattern properties', () => {
    let pattern = createPattern('gradient');
    pattern = setPatternProperties(pattern, {
      opacity: 0.5,
      scale: 2
    });
    
    expect(pattern.fills.properties.opacity).toBe(0.5);
    expect(pattern.fills.properties.scale).toBe(2);
  });

  test('sets border properties', () => {
    let pattern = createPattern('solid');
    pattern = setBorderProperties(pattern, {
      width: 2,
      color: '#FF0000'
    });
    
    expect(pattern.borders.properties.width).toBe(2);
    expect(pattern.borders.properties.color).toBe('#FF0000');
  });

  test('adds custom pattern', () => {
    let pattern = createPattern('solid');
    const properties = new Map([['key', 'value']]);
    
    pattern = addCustomPattern(
      pattern,
      'CustomPattern',
      'fill',
      'pattern-definition',
      properties
    );
    
    const custom = pattern.custom.get('CustomPattern');
    expect(custom).toBeDefined();
    expect(custom?.type).toBe('fill');
    expect(custom?.definition).toBe('pattern-definition');
  });
});