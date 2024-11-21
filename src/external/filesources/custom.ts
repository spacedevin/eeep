export interface CustomParserDefinition {
  name: string;
  parse: (content: string, options?: any) => any;
  validate?: (content: string) => boolean;
}

export class CustomParser {
  private parsers = new Map<string, CustomParserDefinition>();

  register(definition: CustomParserDefinition): void {
    if (this.parsers.has(definition.name)) {
      throw new Error(`Parser '${definition.name}' is already registered`);
    }
    this.parsers.set(definition.name, definition);
  }

  unregister(name: string): void {
    if (!this.parsers.has(name)) {
      throw new Error(`Parser '${name}' is not registered`);
    }
    this.parsers.delete(name);
  }

  get(name: string): CustomParserDefinition | undefined {
    return this.parsers.get(name);
  }

  parse(name: string, content: string, options?: any): any {
    const parser = this.parsers.get(name);
    if (!parser) {
      throw new Error(`Parser '${name}' not found`);
    }

    if (parser.validate && !parser.validate(content)) {
      throw new Error('Content validation failed');
    }

    return parser.parse(content, options);
  }
}

export const customParsers = new CustomParser();