import { ParallelStreamProcessor } from '../../streaming/parallel';

describe('Parallel Stream Processing', () => {
  let processor: ParallelStreamProcessor;

  beforeEach(() => {
    processor = new ParallelStreamProcessor(2);
  });

  afterEach(() => {
    processor.terminate();
  });

  test('processes chunks in parallel', async () => {
    const chunks = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12]
    ];

    const mockProcessor = jest.fn(async (chunk: number[]) => 
      chunk.map(n => n * 2)
    );

    const results = await processor.processChunks(chunks, mockProcessor);
    
    expect(results.flat()).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]);
    expect(mockProcessor).toHaveBeenCalledTimes(4);
  });

  test('handles empty chunks', async () => {
    const chunks: number[][] = [];
    const mockProcessor = jest.fn(async (chunk: number[]) => chunk);

    const results = await processor.processChunks(chunks, mockProcessor);
    
    expect(results).toEqual([]);
    expect(mockProcessor).not.toHaveBeenCalled();
  });

  test('handles processor errors', async () => {
    const chunks = [[1, 2], [3, 4]];
    const mockProcessor = jest.fn(async () => {
      throw new Error('Processing error');
    });

    await expect(processor.processChunks(chunks, mockProcessor))
      .rejects.toThrow('Processing error');
  });
});
