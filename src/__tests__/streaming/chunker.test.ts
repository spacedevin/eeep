import { StreamChunker } from '../../streaming/chunker';

describe('Stream Chunker', () => {
  test('creates chunks of specified size', () => {
    const chunker = new StreamChunker(2);
    chunker.addItems([1, 2, 3, 4, 5]);
    
    const chunks = chunker.getChunks();
    expect(chunks).toHaveLength(3);
    expect(chunks[0]).toEqual([1, 2]);
    expect(chunks[1]).toEqual([3, 4]);
    expect(chunks[2]).toEqual([5]);
  });

  test('flushes incomplete chunk', () => {
    const chunker = new StreamChunker(3);
    chunker.addItems([1, 2]);
    chunker.flushChunk();
    
    const chunks = chunker.getChunks();
    expect(chunks).toHaveLength(1);
    expect(chunks[0]).toEqual([1, 2]);
  });

  test('iterates over chunks', () => {
    const chunker = new StreamChunker(2);
    chunker.addItems([1, 2, 3, 4]);
    
    const result: number[][] = [];
    for (const chunk of chunker) {
      result.push(chunk);
    }
    
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual([1, 2]);
    expect(result[1]).toEqual([3, 4]);
  });

  test('clears chunks', () => {
    const chunker = new StreamChunker(2);
    chunker.addItems([1, 2, 3, 4]);
    chunker.clear();
    
    const chunks = chunker.getChunks();
    expect(chunks).toHaveLength(0);
  });
});
