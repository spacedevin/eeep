import { ExternalDataState } from '../../../../spec/ExternalData';
import { TransformationError } from '../../errors';
import { ParserOptions } from '../../types';
import { BaseParser, ParserResult } from './base';

export class JsonParser extends BaseParser<any> {
  validate(content: string): boolean {
    try {
      JSON.parse(content);
      return true;
    } catch {
      return false;
    }
  }

  parse(content: string, options: any): any {
    const data = JSON.parse(content);
    
    if (options.schema) {
      this.validateSchema(data, options.schema);
    }

    return data;
  }

  private validateSchema(data: any, schema: any): void {
    if (schema.type === 'object' && typeof data !== 'object') {
      throw new Error('Data must be an object');
    }
    if (schema.type === 'array' && !Array.isArray(data)) {
      throw new Error('Data must be an array');
    }

    if (schema.required) {
      for (const prop of schema.required) {
        if (!(prop in data)) {
          throw new Error(`Missing required property: ${prop}`);
        }
      }
    }

    if (schema.properties) {
      for (const [key, propSchema] of Object.entries<any>(schema.properties)) {
        if (key in data) {
          this.validateSchema(data[key], propSchema);
        }
      }
    }
  }
}

export async function parseJsonContent(
  state: ExternalDataState,
  sourceId: string,
  content: string,
  options: ParserOptions = {}
): Promise<ParserResult<any>> {
  const parser = new JsonParser();
  return parser.parseContent(state, sourceId, content, options);
}