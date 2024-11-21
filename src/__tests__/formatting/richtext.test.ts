import {
  createRichText,
  addTextRun,
  setTextProperties,
  addPhoneticText
} from '../../formatting/richtext';

describe('Rich Text Management', () => {
  test('creates rich text', () => {
    const text = createRichText('Hello World');
    expect(text.runs).toHaveLength(1);
    expect(text.runs[0].text).toBe('Hello World');
    expect(text.properties.alignment.horizontal).toBe('left');
  });

  test('adds text run', () => {
    let text = createRichText('Hello');
    text = addTextRun(text, 'World', {
      bold: true,
      color: '#FF0000'
    });
    
    expect(text.runs).toHaveLength(2);
    expect(text.runs[1].text).toBe('World');
    expect(text.runs[1].font?.bold).toBe(true);
  });

  test('sets text properties', () => {
    let text = createRichText('Hello');
    text = setTextProperties(text, {
      alignment: {
        horizontal: 'center',
        vertical: 'middle'
      }
    });
    
    expect(text.properties.alignment.horizontal).toBe('center');
    expect(text.properties.alignment.vertical).toBe('middle');
  });

  test('adds phonetic text', () => {
    let text = createRichText('漢字');
    text = addPhoneticText(text, 'かんじ', {
      alignment: 'center',
      type: 'hiragana',
      fontSize: 8
    });
    
    expect(text.phonetic?.text).toBe('かんじ');
    expect(text.phonetic?.alignment).toBe('center');
    expect(text.phonetic?.type).toBe('hiragana');
  });
});