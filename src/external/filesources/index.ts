import { parseCsvFile } from './csv';
import { parseXmlFile } from './xml';
import { parseJsonFile } from './json';
import { parseTextFile } from './text';
import { ExternalDataState } from '../../../spec/ExternalData';
import { TransformationError } from '../errors';

export type FileParser = (state: ExternalDataState, sourceId: string, content: string) => any;

const parsers: Record<string, FileParser> = {
  csv: parseCsvFile,
  xml: parseXmlFile,
  json: parseJsonFile,
  text: parseTextFile
};

export function parseFile(
  state: ExternalDataState,
  sourceId: string,
  content: string
): any {
  const source = state.sources.file.get(sourceId);
  if (!source) {
    throw new TransformationError(`File source ${sourceId} not found`);
  }

  const parser = parsers[source.type];
  if (!parser) {
    throw new TransformationError(`No parser available for file type: ${source.type}`);
  }

  return parser(state, sourceId, content);
}

export {
  parseCsvFile,
  parseXmlFile,
  parseJsonFile,
  parseTextFile
};