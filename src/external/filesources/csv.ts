import { ExternalDataState } from '../../../spec/ExternalData';
import { TransformationError } from '../errors';
import { validateFile } from '../validation';

interface CsvRecord {
  [key: string]: string;
}

export function parseCsvFile(
  state: ExternalDataState,
  sourceId: string,
  content: string
): CsvRecord[] | string[][] {
  const source = state.sources.file.get(sourceId);
  if (!source || source.type !== 'csv') {
    throw new TransformationError(`CSV source ${sourceId} not found`);
  }

  const { delimiter = ',', hasHeader = true } = source.options;
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