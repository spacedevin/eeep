import {
  createStreamState,
  createStreamReader,
  createStreamWriter,
  setStreamOptions,
  updateStreamStatus,
  clearStreamCache,
  addToCacheString,
  addToCacheStyle,
  addToCacheFormula,
  isMemoryWithinLimit,
  calculateMemoryUsage
} from '../streaming/streaming';

describe('Streaming', () => {
  describe('Stream State', () => {
    test('creates default stream state', () => {
      const state = createStreamState();
      expect(state.mode).toBe('read');
      expect(state.options.bufferSize).toBe(8192);
      expect(state.status.isOpen).toBe(false);
      expect(state.cache.strings.size).toBe(0);
    });

    test('updates stream options', () => {
      let state = createStreamState();
      state = setStreamOptions(state, {
        bufferSize: 16384,
        compression: false
      });
      expect(state.options.bufferSize).toBe(16384);
      expect(state.options.compression).toBe(false);
    });

    test('updates stream status', () => {
      let state = createStreamState();
      state = updateStreamStatus(state, {
        position: 100,
        rowCount: 10
      });
      expect(state.status.position).toBe(100);
      expect(state.status.rowCount).toBe(10);
    });
  });

  describe('Cache Management', () => {
    test('clears stream cache', () => {
      let state = createStreamState();
      state = addToCacheString(state, 0, 'test');
      state = addToCacheStyle(state, 0, { bold: true });
      state = clearStreamCache(state);
      expect(state.cache.strings.size).toBe(0);
      expect(state.cache.styles.size).toBe(0);
      expect(state.cache.formulas.size).toBe(0);
    });

    test('adds items to cache', () => {
      let state = createStreamState();
      state = addToCacheString(state, 0, 'test');
      state = addToCacheStyle(state, 0, { bold: true });
      state = addToCacheFormula(state, 'A1', '=SUM(B1:B10)');
      
      expect(state.cache.strings.get(0)).toBe('test');
      expect(state.cache.styles.get(0)).toEqual({ bold: true });
      expect(state.cache.formulas.get('A1')).toBe('=SUM(B1:B10)');
    });
  });

  describe('Memory Management', () => {
    test('checks memory limits', () => {
      const state = createStreamState();
      expect(isMemoryWithinLimit(state, 1024 * 1024)).toBe(true);
      expect(isMemoryWithinLimit(state, 2 * 1024 * 1024 * 1024)).toBe(false);
    });

    test('calculates memory usage', () => {
      let state = createStreamState();
      state = addToCacheString(state, 0, 'test');
      state = addToCacheStyle(state, 0, { bold: true });
      state = addToCacheFormula(state, 'A1', '=SUM(B1:B10)');
      
      const usage = calculateMemoryUsage(state);
      expect(usage).toBeGreaterThan(0);
    });
  });

  describe('Stream Reader/Writer', () => {
    test('creates stream reader', async () => {
      const reader = createStreamReader(16384);
      expect(reader.bufferSize).toBe(16384);
      expect(reader.position).toBe(0);
      
      const result = await reader.read();
      expect(Array.isArray(result.data)).toBe(true);
      expect(typeof result.hasMore).toBe('boolean');
    });

    test('creates stream writer', async () => {
      const writer = createStreamWriter(16384);
      expect(writer.bufferSize).toBe(16384);
      expect(writer.position).toBe(0);
      
      // Test write and flush (these are no-op in the implementation)
      await expect(writer.write([[1, 2], [3, 4]])).resolves.toBeUndefined();
      await expect(writer.flush()).resolves.toBeUndefined();
    });
  });
});