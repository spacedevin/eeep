import { StreamBuffer } from '../../streaming/buffer';

describe('Stream Buffer', () => {
  test('writes and reads data', async () => {
    const buffer = new StreamBuffer(3);
    await buffer.write('item1');
    await buffer.write('item2');
    
    const result = await buffer.read(2);
    expect(result).toEqual(['item1', 'item2']);
  });

  test('handles buffer overflow', async () => {
    const flushMock = jest.fn();
    const buffer = new StreamBuffer(2, flushMock);
    
    await buffer.writeMany(['item1', 'item2', 'item3']);
    expect(flushMock).toHaveBeenCalledTimes(1);
    expect(flushMock).toHaveBeenCalledWith(['item1', 'item2']);
  });

  test('flushes buffer manually', async () => {
    const flushMock = jest.fn();
    const buffer = new StreamBuffer(5, flushMock);
    
    await buffer.write('item1');
    await buffer.flush();
    
    expect(flushMock).toHaveBeenCalledWith(['item1']);
  });

  test('clears buffer', async () => {
    const buffer = new StreamBuffer();
    await buffer.writeMany(['item1', 'item2']);
    buffer.clear();
    
    expect(buffer.length).toBe(0);
    expect(buffer.remaining).toBe(0);
  });

  test('tracks buffer position', async () => {
    const buffer = new StreamBuffer();
    await buffer.writeMany(['item1', 'item2', 'item3']);
    
    await buffer.read(2);
    expect(buffer.remaining).toBe(1);
  });
});
