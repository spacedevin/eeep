import { ExternalDataState } from '../../../spec/ExternalData';
import { TransformationError } from '../errors';
import { validateFile } from '../validation';
import { handleError } from '../handlers/base';

export function parseXmlFile(
  state: ExternalDataState,
  sourceId: string,
  content: string
): any {
  const source = state.sources.file.get(sourceId);
  if (!source || source.type !== 'xml') {
    throw new TransformationError(`XML source ${sourceId} not found`);
  }

  try {
    // Use fast-xml-parser for XML parsing
    const parser = require('fast-xml-parser');
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      parseAttributeValue: true,
      trimValues: true
    };

    if (parser.validate(content) !== true) {
      throw new Error('Invalid XML content');
    }

    return parser.parse(content, options);
  } catch (error) {
    throw handleError(error, TransformationError, 'Failed to parse XML');
  }
}