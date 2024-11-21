import { ExternalDataState } from '../../../spec/ExternalData';
import { TransformationError } from '../errors';
import { FileSourceType } from '../types';
import { read, utils, WorkBook } from 'xlsx';

interface ExcelParseOptions {
  sheetName?: string;
  range?: string;
  header?: boolean;
  dateNF?: string;
  defval?: any;
  blankrows?: boolean;
}

export function parseExcelFile(
  state: ExternalDataState,
  sourceId: string,
  content: Buffer
): any[] {
  const source = state.sources.file.get(sourceId);
  if (!source || !(source.type === 'xls' || source.type === 'xlsx' as FileSourceType)) {
    throw new TransformationError(`Excel source ${sourceId} not found`);
  }

  try {
    // Parse workbook
    const workbook = read(content, {
      type: 'buffer',
      cellDates: true,
      cellNF: true
    });

    // Get parsing options
    const options: ExcelParseOptions = {
      header: source.options?.hasHeader ?? true,
      dateNF: source.options?.dateFormat,
      defval: '',
      blankrows: false,
      ...source.options
    };

    // Get sheet
    const sheetName = options.sheetName || workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found`);
    }

    // Convert to array of objects or arrays
    if (options.header) {
      return utils.sheet_to_json(sheet, {
        header: 1,
        range: options.range,
        dateNF: options.dateNF,
        defval: options.defval,
        blankrows: options.blankrows
      });
    } else {
      return utils.sheet_to_json(sheet, {
        range: options.range,
        dateNF: options.dateNF,
        defval: options.defval,
        blankrows: options.blankrows
      });
    }
  } catch (error) {
    throw new TransformationError('Failed to parse Excel file', error);
  }
}

export function validateExcelFile(workbook: WorkBook): boolean {
  try {
    // Basic validation
    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      return false;
    }

    // Check each sheet
    for (const name of workbook.SheetNames) {
      const sheet = workbook.Sheets[name];
      if (!sheet || !sheet['!ref']) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

export function getExcelSheetNames(workbook: WorkBook): string[] {
  return workbook.SheetNames;
}

export function getExcelSheetRange(workbook: WorkBook, sheetName: string): string | undefined {
  const sheet = workbook.Sheets[sheetName];
  return sheet?.['!ref'];
}