import { ExternalDataState } from '../../../../spec/ExternalData';
import { TransformationError } from '../../errors';
import { ParserOptions } from '../../types';
import { BaseParser, ParserResult } from './base';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

export class XmlParser extends BaseParser<any> {
  validate(content: string): boolean {
    return XMLValidator.validate(content) === true;
  }

  parse(content: string, options: any = {}): any {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      parseAttributeValue: true,
      trimValues: true,
      ...options
    });

    return parser.parse(content);
  }
}

export async function parseXmlContent(
  state: ExternalDataState,
  sourceId: string,
  content: string,
  options: ParserOptions = {}
): Promise<ParserResult<any>> {
  const parser = new XmlParser();
  return parser.parseContent(state, sourceId, content, options);
}