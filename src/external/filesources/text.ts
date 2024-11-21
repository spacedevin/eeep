import { ExternalDataState } from '../../../spec/ExternalData';
import { TransformationError } from '../errors';
import { validateFile } from '../validation';

export function parseTextFile(
  state: ExternalDataState,
  sourceId: string,
  content: string
): string[] {
  const source = state.sources.file.get(sourceId);
  if (!source || source.type !== 'text') {
    throw new TransformationError(`Text source ${sourceId} not found`);
  }

  // Split content into lines and trim whitespace
  return content.split('\n').map(line => line.trim()).filter(Boolean);
}