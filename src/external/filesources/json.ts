import { ExternalDataState } from '../../../spec/ExternalData';
import { TransformationError } from '../errors';
import { validateFile } from '../validation';

export function parseJsonFile(
  state: ExternalDataState,
  sourceId: string,
  content: string
): any {
  const source = state.sources.file.get(sourceId);
  if (!source || source.type !== 'json') {
    throw new TransformationError(`JSON source ${sourceId} not found`);
  }

  try {
    const data = JSON.parse(content);
    
    // Apply schema validation if provided
    if (source.options.schema) {
      validateJsonSchema(data, source.options.schema);
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new TransformationError(`Failed to parse JSON: ${message}`, error);
  }
}

function validateJsonSchema(data: any, schema: any): void {
  // Validate type
  if (schema.type) {
    if (schema.type === 'array' && !Array.isArray(data)) {
      throw new TransformationError('Data must be an array');
    }
    if (schema.type === 'object' && (typeof data !== 'object' || Array.isArray(data))) {
      throw new TransformationError('Data must be an object');
    }
    if (schema.type === 'string' && typeof data !== 'string') {
      throw new TransformationError('Data must be a string');
    }
    if (schema.type === 'number' && typeof data !== 'number') {
      throw new TransformationError('Data must be a number');
    }
    if (schema.type === 'boolean' && typeof data !== 'boolean') {
      throw new TransformationError('Data must be a boolean');
    }
  }

  // Validate required properties
  if (schema.required && Array.isArray(schema.required)) {
    for (const prop of schema.required) {
      if (!(prop in data)) {
        throw new TransformationError(`Missing required property: ${prop}`);
      }
    }
  }

  // Validate properties
  if (schema.properties && typeof data === 'object') {
    for (const [key, propSchema] of Object.entries<any>(schema.properties)) {
      if (key in data) {
        validateJsonSchema(data[key], propSchema);
      }
    }
  }

  // Validate array items
  if (schema.items && Array.isArray(data)) {
    for (const item of data) {
      validateJsonSchema(item, schema.items);
    }
  }

  // Validate enum values
  if (schema.enum && !schema.enum.includes(data)) {
    throw new TransformationError(`Value must be one of: ${schema.enum.join(', ')}`);
  }

  // Validate string patterns
  if (schema.pattern && typeof data === 'string') {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(data)) {
      throw new TransformationError(`String does not match pattern: ${schema.pattern}`);
    }
  }

  // Validate numeric constraints
  if (typeof data === 'number') {
    if (schema.minimum !== undefined && data < schema.minimum) {
      throw new TransformationError(`Value must be >= ${schema.minimum}`);
    }
    if (schema.maximum !== undefined && data > schema.maximum) {
      throw new TransformationError(`Value must be <= ${schema.maximum}`);
    }
    if (schema.multipleOf !== undefined && data % schema.multipleOf !== 0) {
      throw new TransformationError(`Value must be multiple of ${schema.multipleOf}`);
    }
  }

  // Validate string length
  if (typeof data === 'string') {
    if (schema.minLength !== undefined && data.length < schema.minLength) {
      throw new TransformationError(`String length must be >= ${schema.minLength}`);
    }
    if (schema.maxLength !== undefined && data.length > schema.maxLength) {
      throw new TransformationError(`String length must be <= ${schema.maxLength}`);
    }
  }

  // Validate array length
  if (Array.isArray(data)) {
    if (schema.minItems !== undefined && data.length < schema.minItems) {
      throw new TransformationError(`Array length must be >= ${schema.minItems}`);
    }
    if (schema.maxItems !== undefined && data.length > schema.maxItems) {
      throw new TransformationError(`Array length must be <= ${schema.maxItems}`);
    }
    if (schema.uniqueItems && new Set(data).size !== data.length) {
      throw new TransformationError('Array items must be unique');
    }
  }

  // Validate additional properties
  if (schema.additionalProperties === false && typeof data === 'object') {
    const extraProps = Object.keys(data).filter(key => !schema.properties?.[key]);
    if (extraProps.length > 0) {
      throw new TransformationError(`Additional properties not allowed: ${extraProps.join(', ')}`);
    }
  }
}