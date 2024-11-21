import { AccessibilityState } from '../../spec/Accessibility';

export function createVisualState(): AccessibilityState['visual'] {
  return {
    contrast: {
      mode: 'normal',
      ratio: 4.5,
      customColors: new Map()
    },
    scaling: {
      enabled: true,
      factor: 1,
      minSize: 12,
      maxSize: 32
    },
    indicators: {
      focus: true,
      selection: true,
      errors: true,
      required: true
    }
  };
}

export function setContrastMode(
  state: AccessibilityState,
  mode: 'normal' | 'high' | 'custom',
  ratio?: number
): AccessibilityState {
  return {
    ...state,
    visual: {
      ...state.visual,
      contrast: {
        ...state.visual.contrast,
        mode,
        ratio: ratio || state.visual.contrast.ratio
      }
    }
  };
}

export function addCustomContrastColor(
  state: AccessibilityState,
  original: string,
  replacement: string
): AccessibilityState {
  const newColors = new Map(state.visual.contrast.customColors);
  newColors.set(original, replacement);

  return {
    ...state,
    visual: {
      ...state.visual,
      contrast: {
        ...state.visual.contrast,
        customColors: newColors
      }
    }
  };
}

export function setScaling(
  state: AccessibilityState,
  options: {
    enabled?: boolean;
    factor?: number;
    minSize?: number;
    maxSize?: number;
  }
): AccessibilityState {
  return {
    ...state,
    visual: {
      ...state.visual,
      scaling: {
        ...state.visual.scaling,
        ...options
      }
    }
  };
}

export function setIndicators(
  state: AccessibilityState,
  options: {
    focus?: boolean;
    selection?: boolean;
    errors?: boolean;
    required?: boolean;
  }
): AccessibilityState {
  return {
    ...state,
    visual: {
      ...state.visual,
      indicators: {
        ...state.visual.indicators,
        ...options
      }
    }
  };
}