import { FormControlState } from '../../../spec/FormControls';
import { validateControlName } from '../../validation/control';
import { ControlProperties } from '../types';

export interface TabPage {
  name: string;
  caption: string;
  index: number;
  visible: boolean;
  enabled: boolean;
  controls: string[];
}

export function createTabStrip(name: string): FormControlState {
  validateControlName(name);

  return {
    controls: new Map([[name, {
      type: 'tabstrip',
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
        tabs: [],
        selectedIndex: 0,
        style: 'tabs',
        multiRow: false,
        tabOrientation: 'top'
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

export function setTabStripProperties(
  state: FormControlState,
  name: string,
  properties: Partial<ControlProperties>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'tabstrip') {
    throw new Error(`TabStrip control '${name}' not found`);
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

export function addTabPage(
  state: FormControlState,
  name: string,
  page: Omit<TabPage, 'index' | 'controls'>
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'tabstrip') {
    throw new Error(`TabStrip control '${name}' not found`);
  }

  const tabs = [...(control.specific?.tabs || [])];
  const newPage: TabPage = {
    ...page,
    index: tabs.length,
    controls: []
  };

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        tabs: [...tabs, newPage]
      }
    })
  };
}

export function removeTabPage(
  state: FormControlState,
  name: string,
  pageIndex: number
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'tabstrip') {
    throw new Error(`TabStrip control '${name}' not found`);
  }

  const tabs = [...(control.specific?.tabs || [])];
  if (pageIndex < 0 || pageIndex >= tabs.length) {
    throw new Error('Invalid page index');
  }

  tabs.splice(pageIndex, 1);
  // Update remaining tab indices
  tabs.forEach((tab, index) => {
    tab.index = index;
  });

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        tabs,
        selectedIndex: Math.min(control.specific?.selectedIndex || 0, tabs.length - 1)
      }
    })
  };
}

export function setSelectedTab(
  state: FormControlState,
  name: string,
  index: number
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'tabstrip') {
    throw new Error(`TabStrip control '${name}' not found`);
  }

  const tabs = control.specific?.tabs || [];
  if (index < 0 || index >= tabs.length) {
    throw new Error('Invalid tab index');
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

export function addControlToTab(
  state: FormControlState,
  name: string,
  pageIndex: number,
  controlName: string
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'tabstrip') {
    throw new Error(`TabStrip control '${name}' not found`);
  }

  const tabs = [...(control.specific?.tabs || [])];
  if (pageIndex < 0 || pageIndex >= tabs.length) {
    throw new Error('Invalid page index');
  }

  if (!state.controls.has(controlName)) {
    throw new Error(`Control '${controlName}' not found`);
  }

  tabs[pageIndex].controls.push(controlName);

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        tabs
      }
    })
  };
}

export function removeControlFromTab(
  state: FormControlState,
  name: string,
  pageIndex: number,
  controlName: string
): FormControlState {
  const control = state.controls.get(name);
  if (!control || control.type !== 'tabstrip') {
    throw new Error(`TabStrip control '${name}' not found`);
  }

  const tabs = [...(control.specific?.tabs || [])];
  if (pageIndex < 0 || pageIndex >= tabs.length) {
    throw new Error('Invalid page index');
  }

  const controlIndex = tabs[pageIndex].controls.indexOf(controlName);
  if (controlIndex === -1) {
    throw new Error(`Control '${controlName}' not found in tab`);
  }

  tabs[pageIndex].controls.splice(controlIndex, 1);

  return {
    ...state,
    controls: new Map(state.controls).set(name, {
      ...control,
      specific: {
        ...control.specific,
        tabs
      }
    })
  };
}