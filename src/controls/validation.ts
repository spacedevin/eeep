import { FormControlState } from '../../spec/FormControls';

export function validateControl(
  state: FormControlState,
  name: string,
  type: string
): void {
  const control = state.controls.get(name);
  if (!control || control.type !== type) {
    throw new Error(`${type} control '${name}' not found`);
  }
}

export function validateValue(value: number, min: number, max: number): number {
  if (min >= max) {
    throw new Error('Minimum value must be less than maximum value');
  }
  return Math.max(min, Math.min(max, value));
}

export function validatePosition(
  x: number,
  y: number,
  width: number,
  height: number
): void {
  if (width <= 0 || height <= 0) {
    throw new Error('Width and height must be positive values');
  }
  if (x < 0 || y < 0) {
    throw new Error('Position coordinates must be non-negative');
  }
}

export function validateName(name: string): void {
  if (!name || typeof name !== 'string') {
    throw new Error('Control name must be a non-empty string');
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(name)) {
    throw new Error('Control name must start with a letter and contain only letters, numbers, and underscores');
  }
}