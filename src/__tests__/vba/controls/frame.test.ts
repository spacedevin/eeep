import {
  createFrame,
  setFrameProperties,
  addControlToFrame,
  removeControlFromFrame
} from '../../../vba/controls/frame';
import { createButton } from '../../../vba/controls/button';

describe('Frame Control', () => {
  test('creates frame', () => {
    const state = createFrame('frame1', 'Test Frame');
    const control = state.controls.get('frame1');
    
    expect(control).toBeDefined();
    expect(control?.type).toBe('frame');
    expect(control?.properties.caption).toBe('Test Frame');
    expect(control?.specific?.controls).toHaveLength(0);
  });

  test('sets frame properties', () => {
    let state = createFrame('frame1', 'Test Frame');
    state = setFrameProperties(state, 'frame1', {
      enabled: false,
      visible: false,
      position: {
        x: 10,
        y: 20,
        width: 300,
        height: 200
      }
    });

    const control = state.controls.get('frame1');
    expect(control?.properties.enabled).toBe(false);
    expect(control?.properties.visible).toBe(false);
    expect(control?.properties.position.x).toBe(10);
    expect(control?.properties.position.width).toBe(300);
  });

  test('adds control to frame', () => {
    let state = createFrame('frame1', 'Test Frame');
    const buttonState = createButton('button1', 'Test Button');
    
    // Merge button into state
    state.controls = new Map([...state.controls, ...buttonState.controls]);
    
    state = addControlToFrame(state, 'frame1', 'button1');
    
    const frame = state.controls.get('frame1');
    expect(frame?.specific?.controls).toContain('button1');
  });

  test('removes control from frame', () => {
    let state = createFrame('frame1', 'Test Frame');
    const buttonState = createButton('button1', 'Test Button');
    
    // Merge button into state
    state.controls = new Map([...state.controls, ...buttonState.controls]);
    
    state = addControlToFrame(state, 'frame1', 'button1');
    state = removeControlFromFrame(state, 'frame1', 'button1');
    
    const frame = state.controls.get('frame1');
    expect(frame?.specific?.controls).not.toContain('button1');
  });

  test('throws error for invalid frame', () => {
    const state = createFrame('frame1', 'Test Frame');
    expect(() => addControlToFrame(state, 'invalid', 'button1')).toThrow();
    expect(() => removeControlFromFrame(state, 'invalid', 'button1')).toThrow();
  });

  test('throws error for invalid control', () => {
    const state = createFrame('frame1', 'Test Frame');
    expect(() => addControlToFrame(state, 'frame1', 'invalid')).toThrow();
  });

  test('handles multiple controls', () => {
    let state = createFrame('frame1', 'Test Frame');
    
    // Add multiple buttons
    const button1State = createButton('button1', 'Button 1');
    const button2State = createButton('button2', 'Button 2');
    
    // Merge buttons into state
    state.controls = new Map([
      ...state.controls,
      ...button1State.controls,
      ...button2State.controls
    ]);
    
    state = addControlToFrame(state, 'frame1', 'button1');
    state = addControlToFrame(state, 'frame1', 'button2');
    
    const frame = state.controls.get('frame1');
    expect(frame?.specific?.controls).toHaveLength(2);
    expect(frame?.specific?.controls).toContain('button1');
    expect(frame?.specific?.controls).toContain('button2');
  });
});