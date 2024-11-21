import {
  createImage,
  setImageProperties,
  setImageSource,
  setImageSizeMode,
  setImageBorderStyle,
  setImageAlignment
} from '../../../vba/controls/image';

describe('Image Control', () => {
  test('creates image', () => {
    const state = createImage('image1');
    const control = state.controls.get('image1');
    
    expect(control).toBeDefined();
    expect(control?.type).toBe('image');
    expect(control?.specific?.source).toBe('');
    expect(control?.specific?.sizeMode).toBe('stretch');
  });

  test('sets image properties', () => {
    let state = createImage('image1');
    state = setImageProperties(state, 'image1', {
      enabled: false,
      visible: false,
      position: {
        x: 10,
        y: 20,
        width: 200,
        height: 150
      }
    });

    const control = state.controls.get('image1');
    expect(control?.properties.enabled).toBe(false);
    expect(control?.properties.visible).toBe(false);
    expect(control?.properties.position.width).toBe(200);
  });

  test('sets image source', () => {
    let state = createImage('image1');
    state = setImageSource(state, 'image1', 'path/to/image.png');

    const control = state.controls.get('image1');
    expect(control?.specific?.source).toBe('path/to/image.png');
  });

  test('sets image size mode', () => {
    let state = createImage('image1');
    state = setImageSizeMode(state, 'image1', 'zoom');

    const control = state.controls.get('image1');
    expect(control?.specific?.sizeMode).toBe('zoom');
  });

  test('sets image border style', () => {
    let state = createImage('image1');
    state = setImageBorderStyle(state, 'image1', 'single');

    const control = state.controls.get('image1');
    expect(control?.specific?.borderStyle).toBe('single');
  });

  test('sets image alignment', () => {
    let state = createImage('image1');
    state = setImageAlignment(state, 'image1', 'center');

    const control = state.controls.get('image1');
    expect(control?.specific?.pictureAlignment).toBe('center');
  });

  test('throws error for invalid control', () => {
    const state = createImage('image1');
    expect(() => setImageProperties(state, 'invalid', {})).toThrow();
    expect(() => setImageSource(state, 'invalid', '')).toThrow();
    expect(() => setImageSizeMode(state, 'invalid', 'stretch')).toThrow();
    expect(() => setImageBorderStyle(state, 'invalid', 'none')).toThrow();
    expect(() => setImageAlignment(state, 'invalid', 'center')).toThrow();
  });
});