import { AccessibilityState } from '../../spec/Accessibility';

export function createScreenReaderState(): AccessibilityState['screenReader'] {
  return {
    enabled: true,
    elements: new Map(),
    navigation: {
      landmarks: [],
      skipLinks: new Map(),
      announcements: []
    }
  };
}

export function addScreenReaderElement(
  state: AccessibilityState,
  elementId: string,
  properties: {
    altText: string;
    ariaLabel?: string;
    ariaDescribedBy?: string;
    role?: string;
    readingOrder?: number;
  }
): AccessibilityState {
  const newElements = new Map(state.screenReader.elements);
  newElements.set(elementId, properties);

  return {
    ...state,
    screenReader: {
      ...state.screenReader,
      elements: newElements
    }
  };
}

export function addScreenReaderAnnouncement(
  state: AccessibilityState,
  announcement: string
): AccessibilityState {
  return {
    ...state,
    screenReader: {
      ...state.screenReader,
      navigation: {
        ...state.screenReader.navigation,
        announcements: [...state.screenReader.navigation.announcements, announcement]
      }
    }
  };
}

export function addScreenReaderLandmark(
  state: AccessibilityState,
  landmark: string
): AccessibilityState {
  return {
    ...state,
    screenReader: {
      ...state.screenReader,
      navigation: {
        ...state.screenReader.navigation,
        landmarks: [...state.screenReader.navigation.landmarks, landmark]
      }
    }
  };
}

export function addScreenReaderSkipLink(
  state: AccessibilityState,
  from: string,
  to: string
): AccessibilityState {
  const newSkipLinks = new Map(state.screenReader.navigation.skipLinks);
  newSkipLinks.set(from, to);

  return {
    ...state,
    screenReader: {
      ...state.screenReader,
      navigation: {
        ...state.screenReader.navigation,
        skipLinks: newSkipLinks
      }
    }
  };
}