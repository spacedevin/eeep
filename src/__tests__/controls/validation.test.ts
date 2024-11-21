import {
  validateControl,
  validateValue,
  validatePosition,
  validateName
} from '../../controls/validation';
import { createScrollBar } from '../../controls/scrollbar';

describe('Form Control Validation', () => {
  describe('Control Validation', () => {
    test('validates existing control', () => {
      const state = createScrollBar('scroll1');
      expect(() => validateControl(state, 'scroll1', 'scrollbar')).not.toThrow();
    });

    test('throws error for non-existent control', () => {
      const state = createScrollBar('scroll1');
      expect(() => validateControl(state, 'invalid', 'scrollbar')).toThrow();
    });

    test('throws error for wrong control type', () => {
      const state = createScrollBar('scroll1');
      expect(() => validateControl(state, 'scroll1', 'button')).toThrow();
    });
  });

  describe('Value Validation', () => {
    test('clamps value to limits', () => {
      expect(validateValue(50, 0, 100)).toBe(50);
      expect(validateValue(-10, 0, 100)).toBe(0);
      expect(validateValue(150, 0, 100)).toBe(100);
    });

    test('throws error for invalid limits', () => {
      expect(() => validateValue(50, 100, 0)).toThrow();
      expect(() => validateValue(50, 50, 50)).toThrow();
    });
  });

  describe('Position Validation', () => {
    test('validates valid position', () => {
      expect(() => validatePosition(0, 0, 100, 100)).not.toThrow();
    });

    test('throws error for negative position', () => {
      expect(() => validatePosition(-1, 0, 100, 100)).toThrow();
      expect(() => validatePosition(0, -1, 100, 100)).toThrow();
    });

    test('throws error for invalid dimensions', () => {
      expect(() => validatePosition(0, 0, 0, 100)).toThrow();
      expect(() => validatePosition(0, 0, 100, 0)).toThrow();
      expect(() => validatePosition(0, 0, -1, 100)).toThrow();
      expect(() => validatePosition(0, 0, 100, -1)).toThrow();
    });
  });

  describe('Name Validation', () => {
    test('validates valid names', () => {
      expect(() => validateName('control1')).not.toThrow();
      expect(() => validateName('myControl')).not.toThrow();
      expect(() => validateName('my_control_1')).not.toThrow();
    });

    test('throws error for invalid names', () => {
      expect(() => validateName('')).toThrow();
      expect(() => validateName('1control')).toThrow();
      expect(() => validateName('my-control')).toThrow();
      expect(() => validateName('my control')).toThrow();
    });
  });
});