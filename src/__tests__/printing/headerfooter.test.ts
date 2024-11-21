import {
  createHeaderFooter,
  setHeaderFooterSection,
  addHeaderFooterField
} from '../../printing/headerfooter';

describe('Header/Footer Management', () => {
  test('creates header/footer state', () => {
    const state = createHeaderFooter();
    expect(state.differentFirst).toBe(false);
    expect(state.differentOddEven).toBe(false);
    expect(state.scaleWithDoc).toBe(true);
  });

  test('sets header section', () => {
    let state = createHeaderFooter();
    state = setHeaderFooterSection(state, 'oddHeader', {
      left: {
        text: 'Left Header',
        formatting: {
          font: { bold: true }
        }
      },
      center: {
        text: 'Center Header'
      }
    });
    
    expect(state.sections.oddHeader?.left?.text).toBe('Left Header');
    expect(state.sections.oddHeader?.center?.text).toBe('Center Header');
  });

  test('adds header field', () => {
    let state = createHeaderFooter();
    state = addHeaderFooterField(state, 'oddHeader', 'right', {
      type: 'pageNumber',
      format: 'Page &P'
    });
    
    const fields = state.sections.oddHeader?.right?.fields || [];
    expect(fields).toHaveLength(1);
    expect(fields[0].type).toBe('pageNumber');
  });

  test('adds picture field', () => {
    let state = createHeaderFooter();
    state = addHeaderFooterField(state, 'oddHeader', 'left', {
      type: 'picture',
      picture: {
        path: 'logo.png',
        width: 100,
        height: 50
      }
    });
    
    const fields = state.sections.oddHeader?.left?.fields || [];
    expect(fields[0].type).toBe('picture');
    expect(fields[0].picture?.path).toBe('logo.png');
  });
});