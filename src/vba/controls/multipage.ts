import { FormControlState } from '../../../spec/FormControls';
import { validateControlName } from '../../validation/control';
import { ControlProperties } from '../types';

export interface MultiPagePage {
  name: string;
  caption: string;
  index: number;
  visible: boolean;
  enabled: boolean;
  controls: string[];
  accelerator?: string;
  transitionEffect?: 'none' | 'box' | 'cover' | 'dissolve' | 'fade' | 'push' | 'wipe';
  transitionPeriod?: number;
}

export function createMultiPage(name: string): FormControlState {
  validateControlName(name);

  return {
    controls: new Map([[name, {
      type: 'multipage',
      properties: {
        name,
        enabled: true,
        visible: true,
        position: {
          x: 0,
          y: 0,
          width: 300,
          height: 200
        }
      },
      specific: {
        pages: [],
        selectedIndex: 0,
        style: 'tabs', // tabs, buttons
        multiRow: false,
        tabOrientation: 'top', // top, bottom, left, right
        scrollOpposite: false,
        tabFixedWidth: 0, // 0 = auto
        tabsPerRow: 0 // 0 = auto
      }
    }]]),
    events: new Map(),
    validation: {
      enabled: true,
      rules: new Map()
    },
    bindings: new Map()
  };
}

export function setMultiPageProperties(
  state: FormControlState,
  name: string,
  properties: Partial<ControlProperties>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'multipage') {
    throw new Error(`MultiPage control '${name}' not found`);
  }

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      properties: {
        ...control.properties,
        ...properties
      }
    })
  };
}

export function addPage(
  state: FormControlState,
  name: string,
  page: Omit<MultiPagePage, 'index' | 'controls'>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'multipage') {
    throw new Error(`MultiPage control '${name}' not found`);
  }

  const pages = [...(control.specific?.pages || [])];
  const newPage: MultiPagePage = {
    ...page,
    index: pages.length,
    controls: []
  };

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        pages: [...pages, newPage]
      }
    })
  };
}

export function removePage(
  state: FormControlState,
  name: string,
  pageIndex: number
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'multipage') {
    throw new Error(`MultiPage control '${name}' not found`);
  }

  const pages = [...(control.specific?.pages || [])];
  if (pageIndex < 0 || pageIndex >= pages.length) {
    throw new Error('Invalid page index');
  }

  pages.splice(pageIndex, 1);
  // Update remaining page indices
  pages.forEach((page, index) => {
    page.index = index;
  });

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        pages,
        selectedIndex: Math.min(control.specific?.selectedIndex || 0, pages.length - 1)
      }
    })
  };
}

export function setSelectedPage(
  state: FormControlState,
  name: string,
  index: number
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'multipage') {
    throw new Error(`MultiPage control '${name}' not found`);
  }

  const pages = control.specific?.pages || [];
  if (index < 0 || index >= pages.length) {
    throw new Error('Invalid page index');
  }

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        selectedIndex: index
      }
    })
  };
}

export function addControlToPage(
  state: FormControlState,
  name: string,
  pageIndex: number,
  controlName: string
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'multipage') {
    throw new Error(`MultiPage control '${name}' not found`);
  }

  const pages = [...(control.specific?.pages || [])];
  if (pageIndex < 0 || pageIndex >= pages.length) {
    throw new Error('Invalid page index');
  }

  if (!state.controls.has(controlName)) {
    throw new Error(`Control '${controlName}' not found`);
  }

  pages[pageIndex].controls.push(controlName);

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        pages
      }
    })
  };
}

export function removeControlFromPage(
  state: FormControlState,
  name: string,
  pageIndex: number,
  controlName: string
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'multipage') {
    throw new Error(`MultiPage control '${name}' not found`);
  }

  const pages = [...(control.specific?.pages || [])];
  if (pageIndex < 0 || pageIndex >= pages.length) {
    throw new Error('Invalid page index');
  }

  const controlIndex = pages[pageIndex].controls.indexOf(controlName);
  if (controlIndex === -1) {
    throw new Error(`Control '${controlName}' not found in page`);
  }

  pages[pageIndex].controls.splice(controlIndex, 1);

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        pages
      }
    })
  };
}

export function setPageTransition(
  state: FormControlState,
  name: string,
  pageIndex: number,
  effect: MultiPagePage['transitionEffect'],
  period?: number
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'multipage') {
    throw new Error(`MultiPage control '${name}' not found`);
  }

  const pages = [...(control.specific?.pages || [])];
  if (pageIndex < 0 || pageIndex >= pages.length) {
    throw new Error('Invalid page index');
  }

  pages[pageIndex] = {
    ...pages[pageIndex],
    transitionEffect: effect,
    transitionPeriod: period
  };

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        pages
      }
    })
  };
}