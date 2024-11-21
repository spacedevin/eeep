import {
  createMultiPage,
  setMultiPageProperties,
  addPage,
  removePage,
  setSelectedPage,
  addControlToPage,
  removeControlFromPage,
  setPageTransition
} from '../../../vba/controls/multipage';
import { createButton } from '../../../vba/controls/button';

describe('MultiPage Control', () => {
  test('creates multipage', () => {
    const state = createMultiPage('pages1');
    const control = state.controls.get('pages1');
    
    expect(control).toBeDefined();
    expect(control?.type).toBe('multipage');
    expect(control?.specific?.pages).toHaveLength(0);
    expect(control?.specific?.selectedIndex).toBe(0);
  });

  test('sets multipage properties', () => {
    let state = createMultiPage('pages1');
    state = setMultiPageProperties(state, 'pages1', {
      enabled: false,
      visible: false,
      position: {
        x: 10,
        y: 20,
        width: 400,
        height: 300
      }
    });

    const control = state.controls.get('pages1');
    expect(control?.properties.enabled).toBe(false);
    expect(control?.properties.visible).toBe(false);
    expect(control?.properties.position.width).toBe(400);
  });

  test('adds page', () => {
    let state = createMultiPage('pages1');
    state = addPage(state, 'pages1', {
      name: 'page1',
      caption: 'Page 1',
      visible: true,
      enabled: true,
      accelerator: 'P'
    });

    const control = state.controls.get('pages1');
    expect(control?.specific?.pages).toHaveLength(1);
    expect(control?.specific?.pages[0].name).toBe('page1');
    expect(control?.specific?.pages[0].index).toBe(0);
    expect(control?.specific?.pages[0].accelerator).toBe('P');
  });

  test('removes page', () => {
    let state = createMultiPage('pages1');
    state = addPage(state, 'pages1', {
      name: 'page1',
      caption: 'Page 1',
      visible: true,
      enabled: true
    });
    state = removePage(state, 'pages1', 0);

    const control = state.controls.get('pages1');
    expect(control?.specific?.pages).toHaveLength(0);
  });

  test('sets selected page', () => {
    let state = createMultiPage('pages1');
    state = addPage(state, 'pages1', {
      name: 'page1',
      caption: 'Page 1',
      visible: true,
      enabled: true
    });
    state = addPage(state, 'pages1', {
      name: 'page2',
      caption: 'Page 2',
      visible: true,
      enabled: true
    });
    state = setSelectedPage(state, 'pages1', 1);

    const control = state.controls.get('pages1');
    expect(control?.specific?.selectedIndex).toBe(1);
  });

  test('adds control to page', () => {
    let state = createMultiPage('pages1');
    state = addPage(state, 'pages1', {
      name: 'page1',
      caption: 'Page 1',
      visible: true,
      enabled: true
    });

    const buttonState = createButton('button1', 'Test Button');
    state.controls = new Map([...state.controls, ...buttonState.controls]);

    state = addControlToPage(state, 'pages1', 0, 'button1');

    const control = state.controls.get('pages1');
    expect(control?.specific?.pages[0].controls).toContain('button1');
  });

  test('removes control from page', () => {
    let state = createMultiPage('pages1');
    state = addPage(state, 'pages1', {
      name: 'page1',
      caption: 'Page 1',
      visible: true,
      enabled: true
    });

    const buttonState = createButton('button1', 'Test Button');
    state.controls = new Map([...state.controls, ...buttonState.controls]);

    state = addControlToPage(state, 'pages1', 0, 'button1');
    state = removeControlFromPage(state, 'pages1', 0, 'button1');

    const control = state.controls.get('pages1');
    expect(control?.specific?.pages[0].controls).not.toContain('button1');
  });

  test('sets page transition', () => {
    let state = createMultiPage('pages1');
    state = addPage(state, 'pages1', {
      name: 'page1',
      caption: 'Page 1',
      visible: true,
      enabled: true
    });

    state = setPageTransition(state, 'pages1', 0, 'fade', 500);

    const control = state.controls.get('pages1');
    expect(control?.specific?.pages[0].transitionEffect).toBe('fade');
    expect(control?.specific?.pages[0].transitionPeriod).toBe(500);
  });

  test('throws error for invalid control', () => {
    const state = createMultiPage('pages1');
    expect(() => setMultiPageProperties(state, 'invalid', {})).toThrow();
    expect(() => addPage(state, 'invalid', {
      name: 'page1',
      caption: 'Page 1',
      visible: true,
      enabled: true
    })).toThrow();
  });

  test('throws error for invalid page index', () => {
    const state = createMultiPage('pages1');
    expect(() => removePage(state, 'pages1', 0)).toThrow();
    expect(() => setSelectedPage(state, 'pages1', 0)).toThrow();
    expect(() => addControlToPage(state, 'pages1', 0, 'button1')).toThrow();
  });

  test('throws error for invalid control in page', () => {
    let state = createMultiPage('pages1');
    state = addPage(state, 'pages1', {
      name: 'page1',
      caption: 'Page 1',
      visible: true,
      enabled: true
    });

    expect(() => addControlToPage(state, 'pages1', 0, 'invalid')).toThrow();
    expect(() => removeControlFromPage(state, 'pages1', 0, 'invalid')).toThrow();
  });
});