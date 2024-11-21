import { FormulaError } from '../errors';

export function column(reference?: string): number {
  try {
    if (!reference) {
      // Returns current column if no reference
      return 0; // Would need actual context in real implementation
    }

    const match = reference.match(/[A-Z]+/);
    if (!match) {
      throw new Error('Invalid column reference');
    }

    // Convert column letters to number (A=1, B=2, etc)
    return match[0].split('').reduce((acc, char) => 
      acc * 26 + char.charCodeAt(0) - 64, 0);
  } catch (error) {
    throw new FormulaError('Error in COLUMN function', error);
  }
}

export function columns(reference: string): number {
  try {
    const [start, end] = reference.split(':');
    if (!end) {
      return 1;
    }

    const startCol = column(start);
    const endCol = column(end);
    return endCol - startCol + 1;
  } catch (error) {
    throw new FormulaError('Error in COLUMNS function', error);
  }
}

export function row(reference?: string): number {
  try {
    if (!reference) {
      // Returns current row if no reference
      return 0; // Would need actual context in real implementation
    }

    const match = reference.match(/\d+/);
    if (!match) {
      throw new Error('Invalid row reference');
    }

    return parseInt(match[0]);
  } catch (error) {
    throw new FormulaError('Error in ROW function', error);
  }
}

export function rows(reference: string): number {
  try {
    const [start, end] = reference.split(':');
    if (!end) {
      return 1;
    }

    const startRow = row(start);
    const endRow = row(end);
    return endRow - startRow + 1;
  } catch (error) {
    throw new FormulaError('Error in ROWS function', error);
  }
}

export function address(row: number, column: number, absNum: number = 1, a1: boolean = true, sheetText?: string): string {
  try {
    // Convert column number to letter
    let columnStr = '';
    let col = column;
    while (col > 0) {
      const remainder = (col - 1) % 26;
      columnStr = String.fromCharCode(65 + remainder) + columnStr;
      col = Math.floor((col - 1) / 26);
    }

    // Handle absolute/relative references
    let result = '';
    switch (absNum) {
      case 1: // Both absolute
        result = `$${columnStr}$${row}`;
        break;
      case 2: // Row relative, column absolute
        result = `$${columnStr}${row}`;
        break;
      case 3: // Row absolute, column relative
        result = `${columnStr}$${row}`;
        break;
      case 4: // Both relative
        result = `${columnStr}${row}`;
        break;
      default:
        throw new Error('Invalid absNum parameter');
    }

    // Add sheet reference if provided
    if (sheetText) {
      result = `'${sheetText}'!${result}`;
    }

    // Convert to R1C1 style if requested
    if (!a1) {
      // Convert A1 to R1C1
      const r1c1Row = `R${row}`;
      const r1c1Col = `C${column}`;
      result = `${r1c1Row}${r1c1Col}`;
    }

    return result;
  } catch (error) {
    throw new FormulaError('Error in ADDRESS function', error);
  }
}

export function indirect(ref: string, a1: boolean = true): string {
  try {
    if (!a1) {
      // Convert R1C1 to A1 style
      const match = ref.match(/R(\d+)C(\d+)/);
      if (!match) {
        throw new Error('Invalid R1C1 reference');
      }
      const row = parseInt(match[1]);
      const col = parseInt(match[2]);
      return address(row, col, 1, true);
    }
    return ref;
  } catch (error) {
    throw new FormulaError('Error in INDIRECT function', error);
  }
}

export function offset(reference: string, rows: number, cols: number, height?: number, width?: number): string {
  try {
    // Get starting cell position
    const startCol = column(reference);
    const startRow = row(reference);

    // Calculate new position
    const newRow = startRow + rows;
    const newCol = startCol + cols;

    // Create range reference
    let result = address(newRow, newCol, 1, true);

    // Add range dimensions if specified
    if (height !== undefined && width !== undefined) {
      const endRow = newRow + height - 1;
      const endCol = newCol + width - 1;
      result += `:${address(endRow, endCol, 1, true)}`;
    }

    return result;
  } catch (error) {
    throw new FormulaError('Error in OFFSET function', error);
  }
}

export function areas(reference: string): number {
  try {
    // Count number of areas separated by commas
    return reference.split(',').length;
  } catch (error) {
    throw new FormulaError('Error in AREAS function', error);
  }
}

export function choose(index: number, ...values: any[]): any {
  try {
    if (index < 1 || index > values.length) {
      throw new Error('Index out of range');
    }
    return values[index - 1];
  } catch (error) {
    throw new FormulaError('Error in CHOOSE function', error);
  }
}