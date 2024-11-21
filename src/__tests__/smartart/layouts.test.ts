import {
  setSmartArtLayoutType,
  setSmartArtAnimation,
  setSmartArtCustomLayout
} from '../../smartart/layouts';
import { createSmartArt } from '../../smartart/smartart';

describe('SmartArt Layouts', () => {
  test('sets layout type', () => {
    let state = createSmartArt('list');
    state = setSmartArtLayoutType(state, 'hierarchy');
    
    expect(state.layout.type).toBe('hierarchy');
  });

  test('sets animation', () => {
    let state = createSmartArt('list');
    state = setSmartArtAnimation(state, {
      type: 'byNode',
      sequence: 'inOrder',
      timing: {
        duration: 500,
        delay: 100,
        easing: 'ease-in-out'
      }
    });
    
    expect(state.animation.type).toBe('byNode');
    expect(state.animation.timing.duration).toBe(500);
  });

  test('sets custom layout', () => {
    let state = createSmartArt('list');
    const parameters = new Map([
      ['spacing', 20],
      ['nodeSize', { width: 100, height: 50 }]
    ]);
    
    state = setSmartArtCustomLayout(state, 'customTemplate', parameters);
    
    expect(state.layout.type).toBe('custom');
    expect(state.layout.custom?.template).toBe('customTemplate');
    expect(state.layout.custom?.parameters).toBe(parameters);
  });
});
