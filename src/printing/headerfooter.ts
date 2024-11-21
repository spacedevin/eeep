import { HeaderFooterState } from '../../spec/HeaderFooter';

export function createHeaderFooter(): HeaderFooterState {
  return {
    differentFirst: false,
    differentOddEven: false,
    scaleWithDoc: true,
    alignWithMargins: true,
    sections: {}
  };
}

export function setHeaderFooterSection(
  state: HeaderFooterState,
  type: 'oddHeader' | 'oddFooter' | 'evenHeader' | 'evenFooter' | 'firstHeader' | 'firstFooter',
  content: {
    left?: {
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
    };
    center?: {
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
    };
    right?: {
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
    };
  }
): HeaderFooterState {
  return {
    ...state,
    sections: {
      ...state.sections,
      [type]: content
    }
  };
}

export function addHeaderFooterField(
  state: HeaderFooterState,
  type: 'oddHeader' | 'oddFooter' | 'evenHeader' | 'evenFooter' | 'firstHeader' | 'firstFooter',
  section: 'left' | 'center' | 'right',
  field: {
    type: 'pageNumber' | 'numberOfPages' | 'date' | 'time' | 'fileName' | 'sheetName' | 'filePath' | 'picture';
    format?: string;
    picture?: {
      path: string;
      width?: number;
      height?: number;
    };
  }
): HeaderFooterState {
  const sectionContent = state.sections[type] || {};
  const sectionFields = sectionContent[section]?.fields || [];

  return {
    ...state,
    sections: {
      ...state.sections,
      [type]: {
        ...sectionContent,
        [section]: {
          ...sectionContent[section],
          fields: [...sectionFields, field]
        }
      }
    }
  };
}