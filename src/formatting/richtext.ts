import { RichTextState } from '../../spec/RichText';

export function createRichText(text: string): RichTextState {
  return {
    runs: [{
      text,
      font: undefined
    }],
    properties: {
      alignment: {
        horizontal: 'left',
        vertical: 'top'
      }
    }
  };
}

export function addTextRun(
  state: RichTextState,
  text: string,
  font?: RichTextState['runs'][0]['font']
): RichTextState {
  return {
    ...state,
    runs: [...state.runs, { text, font }]
  };
}

export function setTextProperties(
  state: RichTextState,
  properties: RichTextState['properties']
): RichTextState {
  return {
    ...state,
    properties: {
      ...state.properties,
      ...properties
    }
  };
}

export function addPhoneticText(
  state: RichTextState,
  text: string,
  options?: {
    alignment?: 'left' | 'center' | 'right' | 'distributed';
    type?: 'noConversion' | 'katakana' | 'fullWidth' | 'hiragana';
    fontSize?: number;
  }
): RichTextState {
  return {
    ...state,
    phonetic: {
      text,
      ...options
    }
  };
}