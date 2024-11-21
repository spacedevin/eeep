import { AsyncStreamProcessor } from '../../streaming/async';

describe('Async Stream Processing', () => {
  let processor: AsyncStreamProcessor;

  beforeEach(() => {
    processor = new AsyncStreamProcessor(3, 2);
  });

  test('processes async stream', async () => {
    async function* generateItems() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
    }

    const mockProcessor = jest.fn(async (chunk: number[]) => 
      chunk.map(n => n * 2)
    );

    const onProgress = jest.fn();

    const results = await processor.processStream(
      generateItems(),
      mockProcessor,
      onProgress
    );

    expect(results).toEqual([2, 4, 6, 8]);
    expect(mockProcessor).toHaveBeenCalled();
    expect(onProgress).toHaveBeenCalled();
  });

  test('handles empty stream', async () => {
    async function* generateItems() {
      // Empty generator
    }

    const mockProcessor = jest.fn(async (chunk: number[]) => chunk);
    const results = await processor.processStream(generateItems(), mockProcessor);
    
    expect(results).toEqual([]);
    expect(mockProcessor).not.toHaveBeenCalled();
  });

  test('processes queued tasks', async () => {
    const task1 = () => Promise.resolve(1);
    const task2 = () => Promise.resolve(2);

    const results = await Promise.all([
      processor.enqueue(task1),
      processor.enqueue(task2)
    ]);

    expect(results).toEqual([1, 2]);
  });

  test('handles task errors', async () => {
    const errorTask = () => Promise.reject(new Error('Task error'));
    await expect(processor.enqueue(errorTask)).rejects.toThrow('Task error');
  });
});
