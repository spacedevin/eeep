import { compressContent, decompressContent } from '../../../external/filesources/compression';
import { TransformationError } from '../../../external/errors';

describe('File Compression', () => {
  test('compresses and decompresses content', async () => {
    const original = 'Test content for compression';
    
    const compressed = await compressContent(original);
    expect(compressed.length).toBeLessThan(original.length);
    
    const decompressed = await decompressContent(compressed);
    expect(decompressed).toBe(original);
  });

  test('compresses large content', async () => {
    const original = 'x'.repeat(10000);
    
    const compressed = await compressContent(original);
    expect(compressed.length).toBeLessThan(original.length);
    
    const decompressed = await decompressContent(compressed);
    expect(decompressed).toBe(original);
  });

  test('handles empty content', async () => {
    const original = '';
    
    const compressed = await compressContent(original);
    const decompressed = await decompressContent(compressed);
    expect(decompressed).toBe(original);
  });

  test('throws error for invalid compressed data', async () => {
    const invalidData = Buffer.from('invalid data');
    await expect(decompressContent(invalidData)).rejects.toThrow(TransformationError);
  });
});