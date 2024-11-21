import { CacheManager } from '../../../external/handlers/cache';

describe('Cache Management', () => {
  let cache: CacheManager;

  beforeEach(() => {
    cache = new CacheManager(2, 100); // Small size and TTL for testing
  });

  test('sets and gets cache entries', () => {
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
  });

  test('handles cache size limits', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3'); // Should evict key1

    expect(cache.get('key1')).toBeUndefined();
    expect(cache.get('key2')).toBe('value2');
    expect(cache.get('key3')).toBe('value3');
  });

  test('handles TTL expiration', async () => {
    cache.set('key1', 'value1');
    await new Promise(resolve => setTimeout(resolve, 150));
    expect(cache.get('key1')).toBeUndefined();
  });

  test('cleans up expired entries', async () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    
    await new Promise(resolve => setTimeout(resolve, 150));
    cache.cleanup();
    
    expect(cache.get('key1')).toBeUndefined();
    expect(cache.get('key2')).toBeUndefined();
  });

  test('checks cache existence', () => {
    cache.set('key1', 'value1');
    expect(cache.has('key1')).toBe(true);
    expect(cache.has('key2')).toBe(false);
  });

  test('deletes cache entries', () => {
    cache.set('key1', 'value1');
    cache.delete('key1');
    expect(cache.get('key1')).toBeUndefined();
  });

  test('clears all cache entries', () => {
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.clear();
    expect(cache.get('key1')).toBeUndefined();
    expect(cache.get('key2')).toBeUndefined();
  });
});
