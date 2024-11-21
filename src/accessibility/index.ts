import {
  createScreenReaderState,
  addScreenReaderElement,
  addScreenReaderAnnouncement,
  addScreenReaderLandmark,
  addScreenReaderSkipLink
} from './screenReader';

import {
  createKeyboardState,
  addFocusableElement,
  setTabOrder,
  addKeyboardShortcut,
  setSelectionMode
} from './keyboard';

import {
  createVisualState,
  setContrastMode,
  addCustomContrastColor,
  setScaling,
  setIndicators
} from './visual';

export {
  // Screen Reader
  createScreenReaderState,
  addScreenReaderElement,
  addScreenReaderAnnouncement,
  addScreenReaderLandmark,
  addScreenReaderSkipLink,

  // Keyboard
  createKeyboardState,
  addFocusableElement,
  setTabOrder,
  addKeyboardShortcut,
  setSelectionMode,

  // Visual
  createVisualState,
  setContrastMode,
  addCustomContrastColor,
  setScaling,
  setIndicators
};