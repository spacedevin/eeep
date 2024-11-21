import { ExternalDataState } from '../../../../spec/ExternalData';
import { TransformationError } from '../../errors';
import { ParserOptions } from '../../types';
import { BaseParser, ParserResult } from './base';
import { customParsers } from '../custom';

export class CustomContentParser extends BaseParser<any> {
  validate(content: string): boolean {
    return true; // Custom parsers handle their own validation
  }

  parse(content: string, options: ParserOptions): any {
    const { customParser: parserName, parserOptions } = options;
    
    if (!parserName) {
      throw new TransformationError('Custom parser name is required');
    }

    const parser = customParsers.get(parserName);
    if (!parser) {
      throw new TransformationError(`Custom parser '${parserName}' not found`);
    }

    if (parser.validate && !parser.validate(content)) {
      throw new TransformationError('Content validation failed');
    }

    try {
      return parser.parse(content, parserOptions);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new TransformationError(`Custom parser error: ${message}`, error);
    }
  }
}

export async function parseCustomContent(
  state: ExternalDataState,
  sourceId: string,
  content: string,
  options: ParserOptions = {}
): Promise<ParserResult<any>> {
  const parser = new CustomContentParser();
  return parser.parseContent(state, sourceId, content, options);
}