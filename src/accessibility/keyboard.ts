import { AccessibilityState } from '../../spec/Accessibility';

export function createKeyboardState(): AccessibilityState['keyboard'] {
  return {
    focusable: new Set(),
    tabOrder: [],
    shortcuts: new Map(),
    selection: {
      mode: 'single',
      indicators: true
    }
  };
}

export function addFocusableElement(
  state: AccessibilityState,
  elementId: string
): AccessibilityState {
  const newFocusable = new Set(state.keyboard.focusable);
  newFocusable.add(elementId);

  return {
    ...state,
    keyboard: {
      ...state.keyboard,
      focusable: newFocusable
    }
  };
}

export function setTabOrder(
  state: AccessibilityState,
  order: string[]
): AccessibilityState {
  return {
    ...state,
    keyboard: {
      ...state.keyboard,
      tabOrder: order
    }
  };
}

export function addKeyboardShortcut(
  state: AccessibilityState,
  key: string,
  action: string,
  description: string
): AccessibilityState {
  const newShortcuts = new Map(state.keyboard.shortcuts);
  newShortcuts.set(key, { key, action, description });

  return {
    ...state,
    keyboard: {
      ...state.keyboard,
      shortcuts: newShortcuts
    }
  };
}

export function setSelectionMode(
  state: AccessibilityState,
  mode: 'single' | 'multiple' | 'range'
): AccessibilityState {
  return {
    ...state,
    keyboard: {
      ...state.keyboard,
      selection: {
        ...state.keyboard.selection,
        mode
      }
    }
  };
}