export interface PrintState {
  pageSetup: {
    paperSize?: number;
    orientation?: 'portrait' | 'landscape';
    scale?: number;
    fitToWidth?: number;
    fitToHeight?: number;
    firstPageNumber?: number;
    useFirstPageNumber?: boolean;
    usePrinterDefaults?: boolean;
    blackAndWhite?: boolean;
    draft?: boolean;
    cellComments?: 'none' | 'asDisplayed' | 'atEnd';
    errors?: 'displayed' | 'blank' | 'dash' | 'NA';
    horizontalDpi?: number;
    verticalDpi?: number;
    copies?: number;
  };
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    header: number;
    footer: number;
    centerHorizontally?: boolean;
    centerVertically?: boolean;
  };
  printArea?: {
    ranges: string[];
    titles?: {
      rowStart?: number;
      rowEnd?: number;
      columnStart?: number;
      columnEnd?: number;
    };
  };
  pageBreaks: {
    horizontal: number[];
    vertical: number[];
    manual?: boolean;
  };
  headerFooter: {
    differentFirst?: boolean;
    differentOddEven?: boolean;
    scaleWithDoc?: boolean;
    alignWithMargins?: boolean;
    oddHeader?: string;
    oddFooter?: string;
    evenHeader?: string;
    evenFooter?: string;
    firstHeader?: string;
    firstFooter?: string;
  };
  printOptions: {
    gridLines?: boolean;
    gridLinesSet?: boolean;
    headings?: boolean;
    horizontalCentered?: boolean;
    verticalCentered?: boolean;
    printArea?: string;
    printTitleRows?: string;
    printTitleColumns?: string;
  };
}

export interface HeaderFooterText {
  left?: string;
  center?: string;
  right?: string;
  formatting?: {
    font?: string;
    size?: number;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    color?: string;
  };
  fields?: {
    pageNumber?: boolean;
    numberOfPages?: boolean;
    date?: boolean;
    time?: boolean;
    fileName?: boolean;
    sheetName?: boolean;
    filePath?: boolean;
  };
}