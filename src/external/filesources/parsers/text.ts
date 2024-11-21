import { ExternalDataState } from '../../../../spec/ExternalData';
import { TransformationError } from '../../errors';
import { ParserOptions } from '../../types';
import { BaseParser, ParserResult } from './base';

export class TextParser extends BaseParser<string[]> {
  validate(content: string): boolean {
    return typeof content === 'string';
  }

  parse(content: string): string[] {
    return content.split('\n')
      .map(line => line.trim())
      .filter(Boolean);
  }
}

export async function parseTextContent(
  state: ExternalDataState,
  sourceId: string,
  content: string,
  options: ParserOptions = {}
): Promise<ParserResult<string[]>> {
  const parser = new TextParser();
  return parser.parseContent(state, sourceId, content, options);
}