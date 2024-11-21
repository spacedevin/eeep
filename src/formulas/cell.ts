import { FormulaError } from '../errors';

export interface CellInfo {
  address?: string;
  col?: number;
  color?: number;
  contents?: string;
  filename?: string;
  format?: string;
  parentheses?: number;
  prefix?: string;
  protect?: boolean;
  row?: number;
  type?: string;
  width?: number;
}

export function cell(infoType: string, reference?: string): string | number | boolean {
  try {
    if (!reference) {
      throw new Error('Reference is required');
    }

    const info: CellInfo = {};
    
    // Parse reference to get row and column
    const match = reference.match(/([A-Z]+)([0-9]+)/);
    if (!match) {
      throw new Error('Invalid cell reference');
    }

    const col = match[1].split('').reduce((acc, char) => acc * 26 + char.charCodeAt(0) - 64, 0);
    const row = parseInt(match[2]);

    info.row = row;
    info.col = col;
    info.address = reference;

    switch (infoType.toUpperCase()) {
      case 'ADDRESS':
        return info.address || '';
      case 'COL':
        return info.col || 0;
      case 'COLOR':
        return info.color || 0;
      case 'CONTENTS':
        return info.contents || '';
      case 'FILENAME':
        return info.filename || '';
      case 'FORMAT':
        return info.format || '';
      case 'PARENTHESES':
        return info.parentheses || 0;
      case 'PREFIX':
        return info.prefix || '';
      case 'PROTECT':
        return info.protect || false;
      case 'ROW':
        return info.row || 0;
      case 'TYPE':
        return info.type || '';
      case 'WIDTH':
        return info.width || 0;
      default:
        throw new Error('Invalid info type');
    }
  } catch (error) {
    throw new FormulaError('Error in CELL function', error);
  }
}

export function errorType(value: any): number | undefined {
  try {
    if (value instanceof Error) {
      switch (value.name) {
        case '#NULL!':
          return 1;
        case '#DIV/0!':
          return 2;
        case '#VALUE!':
          return 3;
        case '#REF!':
          return 4;
        case '#NAME?':
          return 5;
        case '#NUM!':
          return 6;
        case '#N/A':
          return 7;
        default:
          return undefined;
      }
    }
    return undefined;
  } catch (error) {
    throw new FormulaError('Error in ERROR.TYPE function', error);
  }
}

export function info(type: string): string {
  try {
    switch (type.toUpperCase()) {
      case 'DIRECTORY':
        return process.cwd();
      case 'NUMFILE':
        return '1'; // Placeholder - would need actual workbook context
      case 'ORIGIN':
        return 'A1';
      case 'OSVERSION':
        return process.platform;
      case 'RECALC':
        return 'Automatic';
      case 'RELEASE':
        return '1.0.0'; // Version number
      case 'SYSTEM':
        return process.platform;
      default:
        throw new Error('Invalid info type');
    }
  } catch (error) {
    throw new FormulaError('Error in INFO function', error);
  }
}