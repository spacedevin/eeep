import {
  createScreenReaderState,
  addScreenReaderElement,
  addScreenReaderAnnouncement,
  addScreenReaderLandmark,
  addScreenReaderSkipLink
} from '../../accessibility/screenReader';

describe('Screen Reader Accessibility', () => {
  test('creates screen reader state', () => {
    const state = createScreenReaderState();
    expect(state.enabled).toBe(true);
    expect(state.elements.size).toBe(0);
    expect(state.navigation.landmarks).toHaveLength(0);
  });

  test('adds screen reader element', () => {
    let state = { screenReader: createScreenReaderState() };
    state = addScreenReaderElement(state, 'element1', {
      altText: 'Alternative text',
      ariaLabel: 'Label',
      role: 'button'
    });

    const element = state.screenReader.elements.get('element1');
    expect(element).toBeDefined();
    expect(element?.altText).toBe('Alternative text');
    expect(element?.ariaLabel).toBe('Label');
  });

  test('adds screen reader announcement', () => {
    let state = { screenReader: createScreenReaderState() };
    state = addScreenReaderAnnouncement(state, 'New content available');
    
    expect(state.screenReader.navigation.announcements).toContain('New content available');
  });

  test('adds screen reader landmark', () => {
    let state = { screenReader: createScreenReaderState() };
    state = addScreenReaderLandmark(state, 'main');
    
    expect(state.screenReader.navigation.landmarks).toContain('main');
  });

  test('adds screen reader skip link', () => {
    let state = { screenReader: createScreenReaderState() };
    state = addScreenReaderSkipLink(state, 'nav', 'main');
    
    expect(state.screenReader.navigation.skipLinks.get('nav')).toBe('main');
  });
});