import {
  createPageBreaks,
  addHorizontalBreak,
  addVerticalBreak,
  addRangeBreak,
  setPageBreakOptions
} from '../../printing/pagebreaks';

describe('Page Breaks', () => {
  test('creates page breaks state', () => {
    const state = createPageBreaks();
    expect(state.horizontal).toHaveLength(0);
    expect(state.vertical).toHaveLength(0);
    expect(state.options.view).toBe('normal');
  });

  test('adds horizontal break', () => {
    let state = createPageBreaks();
    state = addHorizontalBreak(state, 10, 'manual', {
      keepTogether: true,
      splitAllowed: false
    });
    
    expect(state.horizontal).toHaveLength(1);
    expect(state.horizontal[0].row).toBe(10);
    expect(state.horizontal[0].properties?.keepTogether).toBe(true);
  });

  test('adds vertical break', () => {
    let state = createPageBreaks();
    state = addVerticalBreak(state, 5, 'manual', {
      forceBreak: true
    });
    
    expect(state.vertical).toHaveLength(1);
    expect(state.vertical[0].column).toBe(5);
    expect(state.vertical[0].properties?.forceBreak).toBe(true);
  });

  test('adds range break', () => {
    let state = createPageBreaks();
    state = addRangeBreak(state, 'A1:D10', 'manual', 'horizontal', {
      keepTogether: true
    });
    
    expect(state.ranges).toHaveLength(1);
    expect(state.ranges[0].range).toBe('A1:D10');
    expect(state.ranges[0].direction).toBe('horizontal');
  });

  test('sets page break options', () => {
    let state = createPageBreaks();
    state = setPageBreakOptions(state, {
      view: 'pageBreakPreview',
      fitToPage: true
    });
    
    expect(state.options.view).toBe('pageBreakPreview');
    expect(state.options.fitToPage).toBe(true);
  });
});