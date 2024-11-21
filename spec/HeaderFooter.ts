export interface HeaderFooterState {
  differentFirst: boolean;
  differentOddEven: boolean;
  scaleWithDoc: boolean;
  alignWithMargins: boolean;
  sections: {
    oddHeader?: HeaderFooterSection;
    oddFooter?: HeaderFooterSection;
    evenHeader?: HeaderFooterSection;
    evenFooter?: HeaderFooterSection;
    firstHeader?: HeaderFooterSection;
    firstFooter?: HeaderFooterSection;
  };
}

export interface HeaderFooterSection {
  left?: HeaderFooterContent;
  center?: HeaderFooterContent;
  right?: HeaderFooterContent;
}

export interface HeaderFooterContent {
  text: string;
  formatting?: {
    font?: {
      name?: string;
      size?: number;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      strikethrough?: boolean;
      color?: string;
    };
    alignment?: 'left' | 'center' | 'right';
  };
  fields?: Array<{
    type: 'pageNumber' | 'numberOfPages' | 'date' | 'time' | 'fileName' | 'sheetName' | 'filePath' | 'picture';
    format?: string;
    picture?: {
      path: string;
      width?: number;
      height?: number;
    };
  }>;
}

export interface HeaderFooterOptions {
  defaultFont: {
    name: string;
    size: number;
  };
  margins: {
    top: number;
    bottom: number;
  };
  scaling: boolean;
  alignment: boolean;
}