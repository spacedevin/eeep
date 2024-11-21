import {
  setInputMessage,
  setErrorMessage,
  formatMessage,
  localizeMessage
} from '../../validation/messages';
import { createValidation } from '../../validation/validation';

describe('Validation Messages', () => {
  test('sets input message', () => {
    const validation = createValidation('list');
    const result = setInputMessage(
      validation,
      'Select Value',
      'Please select a value from the list'
    );

    expect(result.inputTitle).toBe('Select Value');
    expect(result.inputMessage).toBe('Please select a value from the list');
    expect(result.showInputMessage).toBe(true);
  });

  test('sets error message', () => {
    const validation = createValidation('list');
    const result = setErrorMessage(
      validation,
      'Invalid Value',
      'The value you entered is not in the list',
      'warning'
    );

    expect(result.errorTitle).toBe('Invalid Value');
    expect(result.error).toBe('The value you entered is not in the list');
    expect(result.errorStyle).toBe('warning');
    expect(result.showErrorMessage).toBe(true);
  });

  test('formats message with parameters', () => {
    const message = 'Value must be between {min} and {max}';
    const params = { min: 1, max: 100 };
    const result = formatMessage(message, params);

    expect(result).toBe('Value must be between 1 and 100');
  });

  test('handles missing parameters in message format', () => {
    const message = 'Value must be {comparison} {value}';
    const params = { comparison: 'greater than' };
    const result = formatMessage(message, params);

    expect(result).toBe('Value must be greater than ');
  });

  test('localizes messages', () => {
    const message = 'Please enter a valid value';
    const result = localizeMessage(message, 'en');

    expect(result).toBe(message); // Default implementation returns original
  });
});
