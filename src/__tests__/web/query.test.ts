import { executeWebQuery } from '../../web/query';
import { createWebQuery } from '../../web';
import { FormulaError } from '../../errors';

describe('Web Query', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('executes web query', async () => {
    const mockResponse = { data: 'test' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    let state = createWebQuery('https://api.example.com', 'GET');
    const result = await executeWebQuery(state, 'https://api.example.com');
    
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com',
      expect.any(Object)
    );
  });

  test('handles query parameters', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({})
    });

    let state = createWebQuery('https://api.example.com', 'GET');
    await executeWebQuery(state, 'https://api.example.com', {
      params: { key: 'value' }
    });
    
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com?key=value',
      expect.any(Object)
    );
  });

  test('retries failed requests', async () => {
    (global.fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({})
      });

    let state = createWebQuery('https://api.example.com', 'GET');
    await executeWebQuery(state, 'https://api.example.com');
    
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test('throws error after max retries', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    let state = createWebQuery('https://api.example.com', 'GET');
    await expect(executeWebQuery(state, 'https://api.example.com'))
      .rejects.toThrow(FormulaError);
  });
});
