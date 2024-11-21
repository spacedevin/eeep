export function validateName(name: string): void {
  if (!name || typeof name !== 'string') {
    throw new Error('Name must be a non-empty string');
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(name)) {
    throw new Error('Name must start with a letter and contain only letters, numbers, and underscores');
  }
}

export function validateRange(range: string): void {
  if (!range || typeof range !== 'string') {
    throw new Error('Range must be a non-empty string');
  }
  if (!/^[A-Z]+[0-9]+:[A-Z]+[0-9]+$/.test(range)) {
    throw new Error('Invalid range format. Expected format: A1:B2');
  }
}

export function validateCell(cell: string): void {
  if (!cell || typeof cell !== 'string') {
    throw new Error('Cell reference must be a non-empty string');
  }
  if (!/^[A-Z]+[0-9]+$/.test(cell)) {
    throw new Error('Invalid cell reference format. Expected format: A1');
  }
}

export function validateValue(value: number, min: number, max: number): number {
  if (min >= max) {
    throw new Error('Minimum value must be less than maximum value');
  }
  return Math.max(min, Math.min(max, value));
}

export function validatePosition(x: number, y: number, width: number, height: number): void {
  if (width <= 0 || height <= 0) {
    throw new Error('Width and height must be positive values');
  }
  if (x < 0 || y < 0) {
    throw new Error('Position coordinates must be non-negative');
  }
}

export function validateConnectionString(connectionString: string): void {
  if (!connectionString || typeof connectionString !== 'string') {
    throw new Error('Connection string must be a non-empty string');
  }
}

export function validateUrl(url: string): void {
  try {
    new URL(url);
  } catch {
    throw new Error('Invalid URL format');
  }
}

export function validateFile(filePath: string): void {
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('File path must be a non-empty string');
  }
}

export function validateTransformation(source: string, target: string): void {
  if (!source || !target) {
    throw new Error('Source and target fields are required for transformation');
  }
}