import { FileStream } from '../stream';
import { compressContent, decompressContent } from '../compression';
import { parseCsvContent } from './csv';
import { parseXmlContent } from './xml';
import { parseJsonContent } from './json';
import { parseTextContent } from './text';
import { parseCustomContent } from './custom';
import { ExternalDataState } from '../../../../spec/ExternalData';
import { TransformationError } from '../../errors';
import { ParserOptions, FileSourceType } from '../../types';
import { DEFAULT_SETTINGS } from '../../constants';

export async function parseFileContent(
  state: ExternalDataState,
  sourceId: string,
  content: string | Buffer,
  options: ParserOptions = {}
): Promise<any> {
  const source = state.sources.file.get(sourceId);
  if (!source) {
    throw new Error(`File source ${sourceId} not found`);
  }

  // Handle compression if needed
  let processedContent = content;
  if (options.compression) {
    if (content instanceof Buffer) {
      processedContent = await decompressContent(content);
    } else {
      const compressed = await compressContent(content);
      processedContent = await decompressContent(compressed);
    }
  }

  // Convert Buffer to string if needed
  if (processedContent instanceof Buffer) {
    processedContent = processedContent.toString(source.options.encoding || 'utf8');
  }

  // Select and use appropriate parser
  const localParserOptions = {
    ...options,
    parserOptions: {
      ...source.options.parserOptions,
      ...options.parserOptions
    }
  };

  switch (source.type) {
    case 'csv':
      return parseCsvContent(state, sourceId, processedContent as string, localParserOptions);
    case 'xml':
      return parseXmlContent(state, sourceId, processedContent as string, localParserOptions);
    case 'json':
      return parseJsonContent(state, sourceId, processedContent as string, localParserOptions);
    case 'text':
      return parseTextContent(state, sourceId, processedContent as string, localParserOptions);
    case 'xlsx':
    case 'xls':
      throw new Error('Excel parsing not implemented');
    default:
      if (source.options.parserOptions?.customParser) {
        return parseCustomContent(state, sourceId, processedContent as string, localParserOptions);
      }
      throw new Error(`Unsupported file type: ${source.type}`);
  }
}