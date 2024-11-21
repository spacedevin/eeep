export interface RichTextState {
  runs: Array<{
    text: string;
    font?: {
      name?: string;
      size?: number;
      family?: number;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      strike?: boolean;
      color?: string;
      verticalAlign?: 'superscript' | 'subscript' | 'baseline';
      characterSpacing?: number;
      kerning?: number;
    };
    language?: {
      lcid?: number;
      spellCheck?: boolean;
      eastAsian?: boolean;
      complexScript?: boolean;
    };
    effects?: {
      outline?: boolean;
      shadow?: boolean;
      emboss?: boolean;
      imprint?: boolean;
    };
  }>;
  properties?: {
    alignment?: {
      horizontal?: 'left' | 'center' | 'right' | 'justify';
      vertical?: 'top' | 'middle' | 'bottom';
    };
    indent?: {
      left?: number;
      right?: number;
      firstLine?: number;
      hanging?: number;
    };
    spacing?: {
      before?: number;
      after?: number;
      line?: number;
      lineRule?: 'atLeast' | 'exactly' | 'multiple';
    };
  };
  phonetic?: {
    text: string;
    alignment?: 'left' | 'center' | 'right' | 'distributed';
    type?: 'noConversion' | 'katakana' | 'fullWidth' | 'hiragana';
    fontSize?: number;
  };
}