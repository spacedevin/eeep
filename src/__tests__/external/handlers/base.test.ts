import { handleError, formatErrorMessage, retryOperation } from '../../../external/handlers/base';
import { FormulaError } from '../../../errors';

describe('Base Handler', () => {
  describe('Error Handling', () => {
    test('handles Error objects', () => {
      const error = new Error('Test error');
      expect(() => handleError(error, FormulaError, 'Default message'))
        .toThrow(FormulaError);
    });

    test('handles non-Error objects', () => {
      expect(() => handleError('string error', FormulaError, 'Default message'))
        .toThrow(FormulaError);
    });

    test('formats error messages', () => {
      const error = new Error('Test error');
      expect(formatErrorMessage(error)).toBe('Test error');
      expect(formatErrorMessage('string error')).toBe('string error');
    });
  });

  describe('Retry Operations', () => {
    test('retries failed operations', async () => {
      let attempts = 0;
      const operation = jest.fn().mockImplementation(() => {
        attempts++;
        if (attempts < 2) throw new Error('Temporary failure');
        return Promise.resolve('success');
      });

      const result = await retryOperation(operation, 3, 100);
      expect(result).toBe('success');
      expect(attempts).toBe(2);
    });

    test('fails after max retries', async () => {
      const operation = jest.fn().mockRejectedValue(new Error('Persistent failure'));
      await expect(retryOperation(operation, 2, 100)).rejects.toThrow('Persistent failure');
      expect(operation).toHaveBeenCalledTimes(3);
    });
  });
});
