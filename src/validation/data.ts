import { ValidationError } from '../errors';

export function validateTransformation(source: string, target: string): void {
  if (!source || !target) {
    throw new ValidationError('Source and target fields are required for transformation');
  }
}

export function validateSchema(data: any, schema: any): void {
  if (schema.type === 'object' && typeof data !== 'object') {
    throw new ValidationError('Data must be an object');
  }
  if (schema.type === 'array' && !Array.isArray(data)) {
    throw new ValidationError('Data must be an array');
  }

  if (schema.required) {
    for (const prop of schema.required) {
      if (!(prop in data)) {
        throw new ValidationError(`Missing required property: ${prop}`);
      }
    }
  }

  if (schema.properties) {
    for (const [key, propSchema] of Object.entries<any>(schema.properties)) {
      if (key in data) {
        validateSchema(data[key], propSchema);
      }
    }
  }
}

export function validateDataType(value: any, expectedType: string): void {
  const type = Array.isArray(value) ? 'array' : typeof value;
  if (type !== expectedType) {
    throw new ValidationError(`Invalid data type. Expected ${expectedType}, got ${type}`);
  }
}