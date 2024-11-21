export interface CommentState {
  text: string;
  author?: string;
  date?: Date;
  richText?: Array<{
    text: string;
    font?: {
      name?: string;
      size?: number;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      color?: string;
    };
  }>;
  visibility: 'visible' | 'hidden' | 'hover';
  position?: {
    x: number;
    y: number;
    relative?: boolean;
  };
  size?: {
    width: number;
    height: number;
    autoSize?: boolean;
    minWidth?: number;
    minHeight?: number;
  };
  style?: {
    fill?: {
      color: string;
      transparency?: number;
    };
    border?: {
      color: string;
      style: 'solid' | 'dashed' | 'dotted';
      width: number;
    };
    shadow?: boolean;
  };
  thread?: Array<{
    text: string;
    author: string;
    date: Date;
    resolved?: boolean;
  }>;
}

export interface CommentCollection {
  comments: Map<string, CommentState>;
  defaultAuthor?: string;
  defaultStyle?: {
    fill?: {
      color: string;
      transparency?: number;
    };
    border?: {
      color: string;
      style: string;
      width: number;
    };
    font?: {
      name: string;
      size: number;
    };
  };
}