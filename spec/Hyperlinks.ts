export interface HyperlinkState {
  type: 'url' | 'internal' | 'file' | 'document';
  target: string;
  display?: string;
  tooltip?: string;
  location?: string;
  email?: {
    address: string;
    subject?: string;
    body?: string;
  };
  internal?: {
    sheet?: string;
    reference?: string;
    namedRange?: string;
  };
  file?: {
    path: string;
    relativePath?: boolean;
    bookmarkId?: string;
  };
  style?: {
    color?: string;
    underline?: boolean;
    visited?: {
      color?: string;
      underline?: boolean;
    };
  };
  targetWindow?: '_blank' | '_self' | '_parent' | '_top' | string;
  screenTip?: string;
  history?: {
    visited?: boolean;
    lastVisited?: Date;
  };
}

export interface HyperlinkCollection {
  links: Map<string, HyperlinkState>;
  defaultStyle?: {
    color: string;
    underline: boolean;
    visitedColor: string;
  };
  baseUrl?: string;
  workbookPath?: string;
}