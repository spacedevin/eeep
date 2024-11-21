import {
  createKeyboardState,
  addFocusableElement,
  setTabOrder,
  addKeyboardShortcut,
  setSelectionMode
} from '../../accessibility/keyboard';

describe('Keyboard Accessibility', () => {
  test('creates keyboard state', () => {
    const state = createKeyboardState();
    expect(state.focusable.size).toBe(0);
    expect(state.tabOrder).toHaveLength(0);
    expect(state.shortcuts.size).toBe(0);
    expect(state.selection.mode).toBe('single');
  });

  test('adds focusable element', () => {
    let state = { keyboard: createKeyboardState() };
    state = addFocusableElement(state, 'button1');
    
    expect(state.keyboard.focusable.has('button1')).toBe(true);
  });

  test('sets tab order', () => {
    let state = { keyboard: createKeyboardState() };
    const order = ['button1', 'input1', 'select1'];
    state = setTabOrder(state, order);
    
    expect(state.keyboard.tabOrder).toEqual(order);
  });

  test('adds keyboard shortcut', () => {
    let state = { keyboard: createKeyboardState() };
    state = addKeyboardShortcut(state, 'Ctrl+S', 'save', 'Save document');
    
    const shortcut = state.keyboard.shortcuts.get('Ctrl+S');
    expect(shortcut).toBeDefined();
    expect(shortcut?.action).toBe('save');
    expect(shortcut?.description).toBe('Save document');
  });

  test('sets selection mode', () => {
    let state = { keyboard: createKeyboardState() };
    state = setSelectionMode(state, 'multiple');
    
    expect(state.keyboard.selection.mode).toBe('multiple');
  });
});