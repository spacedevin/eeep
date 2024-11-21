import { ExternalDataState } from '../../../../spec/ExternalData';
import { TransformationError } from '../../errors';
import { ParserOptions } from '../../types';
import { BaseParser, ParserResult } from './base';

interface CsvRecord {
  [key: string]: string;
}

export class CsvParser extends BaseParser<CsvRecord[] | string[][]> {
  validate(content: string): boolean {
    return content.trim().length > 0;
  }

  parse(content: string, options: ParserOptions): CsvRecord[] | string[][] {
    const { delimiter = ',', hasHeader = true } = options;
    const lines = content.split('\n').map(line => line.trim()).filter(Boolean);

    if (lines.length === 0) {
      return [];
    }

    const headers = hasHeader ? lines[0].split(delimiter).map(h => h.trim()) : [];
    const data = hasHeader ? lines.slice(1) : lines;

    if (hasHeader) {
      return data.map(line => {
        const values = line.split(delimiter).map(v => v.trim());
        return headers.reduce<CsvRecord>((obj, header, index) => {
          obj[header] = values[index] ?? '';
          return obj;
        }, {});
      });
    }

    return data.map(line => line.split(delimiter).map(v => v.trim()));
  }
}

export async function parseCsvContent(
  state: ExternalDataState,
  sourceId: string,
  content: string,
  options: ParserOptions = {}
): Promise<ParserResult<CsvRecord[] | string[][]>> {
  const parser = new CsvParser();
  return parser.parseContent(state, sourceId, content, options);
}