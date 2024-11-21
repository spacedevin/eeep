import { FileStream } from '../../../external/filesources/stream';
import { TransformationError } from '../../../external/errors';

describe('File Stream', () => {
  test('streams file content in chunks', async () => {
    const content = 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5';
    const stream = new FileStream(content, { chunkSize: 10 });
    
    const lines: string[] = [];
    for await (const line of stream.readLines()) {
      lines.push(line);
    }

    expect(lines).toHaveLength(5);
    expect(lines[0]).toBe('Line 1');
    expect(lines[4]).toBe('Line 5');
  });

  test('handles partial lines across chunks', async () => {
    const content = 'Long line that spans multiple chunks\nSecond line\nThird line';
    const stream = new FileStream(content, { chunkSize: 10 });
    
    const lines: string[] = [];
    for await (const line of stream.readLines()) {
      lines.push(line);
    }

    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe('Long line that spans multiple chunks');
  });

  test('throws error for oversized files', () => {
    const content = 'x'.repeat(1024 * 1024 * 200); // 200MB
    expect(() => new FileStream(content, { maxSize: 1024 * 1024 * 100 }))
      .toThrow(TransformationError);
  });

  test('respects custom chunk size', async () => {
    const content = 'Line 1\nLine 2\nLine 3';
    const stream = new FileStream(content, { chunkSize: 5 });
    
    const lines: string[] = [];
    for await (const line of stream.readLines()) {
      lines.push(line);
    }

    expect(lines).toHaveLength(3);
  });
});