import { ExternalDataState } from '../../spec/ExternalData';
import { FileSourceType } from './types';
import { validateFile } from '../validation';

export function createFileSource(type: FileSourceType): ExternalDataState {
  return {
    sources: {
      web: new Map(),
      file: new Map()
    },
    processing: {
      cache: {
        enabled: true,
        duration: 300000,
        size: 1024 * 1024 * 10,
        strategy: 'lru'
      },
      pagination: {
        enabled: true,
        pageSize: 1000,
        parameters: {
          page: 'page',
          size: 'size'
        }
      },
      rateLimit: {
        enabled: true,
        requests: 100,
        interval: 60000,
        delay: 1000
      }
    },
    transformation: {
      mappings: new Map(),
      validation: [],
      error: {
        handling: 'skip',
        defaultValues: new Map(),
        logging: true
      }
    }
  };
}

export function addFileSource(
  state: ExternalDataState,
  id: string,
  path: string,
  type: FileSourceType,
  options?: {
    encoding?: BufferEncoding;
    delimiter?: string;
    hasHeader?: boolean;
    schema?: any;
  }
): ExternalDataState {
  validateFile(path);

  const newSources = new Map(state.sources.file);
  newSources.set(id, {
    type,
    path,
    options: {
      encoding: options?.encoding || ('utf8' as BufferEncoding),
      delimiter: options?.delimiter || ',',
      hasHeader: options?.hasHeader ?? true,
      schema: options?.schema
    }
  });

  return {
    ...state,
    sources: {
      ...state.sources,
      file: newSources
    }
  };
}

export function addTransformationMapping(
  state: ExternalDataState,
  source: string,
  target: string,
  transform?: (value: any) => any
): ExternalDataState {
  const newMappings = new Map(state.transformation.mappings);
  newMappings.set(source, {
    source,
    target,
    transform
  });

  return {
    ...state,
    transformation: {
      ...state.transformation,
      mappings: newMappings
    }
  };
}