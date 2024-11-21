import {
  createTabStrip,
  setTabStripProperties,
  addTabPage,
  removeTabPage,
  setSelectedTab,
  addControlToTab,
  removeControlFromTab
} from '../../../vba/controls/tabstrip';
import { createButton } from '../../../vba/controls/button';

describe('TabStrip Control', () => {
  test('creates tabstrip', () => {
    const state = createTabStrip('tabs1');
    const control = state.controls.get('tabs1');
    
    expect(control).toBeDefined();
    expect(control?.type).toBe('tabstrip');
    expect(control?.specific?.tabs).toHaveLength(0);
    expect(control?.specific?.selectedIndex).toBe(0);
  });

  test('sets tabstrip properties', () => {
    let state = createTabStrip('tabs1');
    state = setTabStripProperties(state, 'tabs1', {
      enabled: false,
      visible: false,
      position: {
        x: 10,
        y: 20,
        width: 400,
        height: 300
      }
    });

    const control = state.controls.get('tabs1');
    expect(control?.properties.enabled).toBe(false);
    expect(control?.properties.visible).toBe(false);
    expect(control?.properties.position.width).toBe(400);
  });

  test('adds tab page', () => {
    let state = createTabStrip('tabs1');
    state = addTabPage(state, 'tabs1', {
      name: 'tab1',
      caption: 'Tab 1',
      visible: true,
      enabled: true
    });

    const control = state.controls.get('tabs1');
    expect(control?.specific?.tabs).toHaveLength(1);
    expect(control?.specific?.tabs[0].name).toBe('tab1');
    expect(control?.specific?.tabs[0].index).toBe(0);
  });

  test('removes tab page', () => {
    let state = createTabStrip('tabs1');
    state = addTabPage(state, 'tabs1', {
      name: 'tab1',
      caption: 'Tab 1',
      visible: true,
      enabled: true
    });
    state = removeTabPage(state, 'tabs1', 0);

    const control = state.controls.get('tabs1');
    expect(control?.specific?.tabs).toHaveLength(0);
  });

  test('sets selected tab', () => {
    let state = createTabStrip('tabs1');
    state = addTabPage(state, 'tabs1', {
      name: 'tab1',
      caption: 'Tab 1',
      visible: true,
      enabled: true
    });
    state = addTabPage(state, 'tabs1', {
      name: 'tab2',
      caption: 'Tab 2',
      visible: true,
      enabled: true
    });
    state = setSelectedTab(state, 'tabs1', 1);

    const control = state.controls.get('tabs1');
    expect(control?.specific?.selectedIndex).toBe(1);
  });

  test('adds control to tab', () => {
    let state = createTabStrip('tabs1');
    state = addTabPage(state, 'tabs1', {
      name: 'tab1',
      caption: 'Tab 1',
      visible: true,
      enabled: true
    });

    const buttonState = createButton('button1', 'Test Button');
    state.controls = new Map([...state.controls, ...buttonState.controls]);

    state = addControlToTab(state, 'tabs1', 0, 'button1');

    const control = state.controls.get('tabs1');
    expect(control?.specific?.tabs[0].controls).toContain('button1');
  });

  test('removes control from tab', () => {
    let state = createTabStrip('tabs1');
    state = addTabPage(state, 'tabs1', {
      name: 'tab1',
      caption: 'Tab 1',
      visible: true,
      enabled: true
    });

    const buttonState = createButton('button1', 'Test Button');
    state.controls = new Map([...state.controls, ...buttonState.controls]);

    state = addControlToTab(state, 'tabs1', 0, 'button1');
    state = removeControlFromTab(state, 'tabs1', 0, 'button1');

    const control = state.controls.get('tabs1');
    expect(control?.specific?.tabs[0].controls).not.toContain('button1');
  });

  test('throws error for invalid control', () => {
    const state = createTabStrip('tabs1');
    expect(() => setTabStripProperties(state, 'invalid', {})).toThrow();
    expect(() => addTabPage(state, 'invalid', {
      name: 'tab1',
      caption: 'Tab 1',
      visible: true,
      enabled: true
    })).toThrow();
  });

  test('throws error for invalid page index', () => {
    const state = createTabStrip('tabs1');
    expect(() => removeTabPage(state, 'tabs1', 0)).toThrow();
    expect(() => setSelectedTab(state, 'tabs1', 0)).toThrow();
    expect(() => addControlToTab(state, 'tabs1', 0, 'button1')).toThrow();
  });

  test('throws error for invalid control in tab', () => {
    let state = createTabStrip('tabs1');
    state = addTabPage(state, 'tabs1', {
      name: 'tab1',
      caption: 'Tab 1',
      visible: true,
      enabled: true
    });

    expect(() => addControlToTab(state, 'tabs1', 0, 'invalid')).toThrow();
    expect(() => removeControlFromTab(state, 'tabs1', 0, 'invalid')).toThrow();
  });
});