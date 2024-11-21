import { ExternalDataState } from '../../../../spec/ExternalData';
import { ParserOptions } from '../../types';
import { TransformationError } from '../../errors';
import { FileStream } from '../stream';
import { DEFAULT_SETTINGS } from '../../constants';

export interface ParserResult<T = any> {
  data: T;
  metadata?: Record<string, any>;
}

export abstract class BaseParser<T = any> {
  abstract parse(content: string, options?: any): T;
  abstract validate(content: string): boolean;

  public async parseContent(
    state: ExternalDataState,
    sourceId: string,
    content: string,
    options: ParserOptions = {}
  ): Promise<ParserResult<T>> {
    this.validateSource(state, sourceId);
    const source = state.sources.file.get(sourceId)!;
    const processedContent = await this.readContent(content, options);

    if (!this.validate(processedContent)) {
      throw new TransformationError('Content validation failed');
    }

    try {
      const data = this.parse(processedContent, {
        ...source.options,
        ...options,
        parserOptions: {
          ...source.options?.parserOptions,
          ...options.parserOptions
        }
      });

      return { data };
    } catch (error) {
      if (error instanceof Error) {
        throw new TransformationError(`Parse error: ${error.message}`, error);
      }
      throw new TransformationError('Parse error');
    }
  }

  protected validateSource(
    state: ExternalDataState,
    sourceId: string
  ): void {
    const source = state.sources.file.get(sourceId);
    if (!source) {
      throw new TransformationError(`Source ${sourceId} not found`);
    }
  }

  protected async readContent(
    content: string,
    options: ParserOptions = {}
  ): Promise<string> {
    if (options.streaming) {
      const stream = new FileStream(content, {
        chunkSize: options.chunkSize || DEFAULT_SETTINGS.file.bufferSize,
        maxSize: options.maxSize || DEFAULT_SETTINGS.file.maxFileSize
      });

      const chunks: string[] = [];
      for await (const chunk of stream.readLines()) {
        chunks.push(chunk);
      }
      return chunks.join('\n');
    }
    return content;
  }
}