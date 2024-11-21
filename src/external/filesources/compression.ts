import { ExternalDataState } from '../../../spec/ExternalData';
import { TransformationError } from '../errors';
import * as zlib from 'zlib';
import { promisify } from 'util';

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

export async function compressContent(content: string): Promise<Buffer> {
  try {
    return await gzip(Buffer.from(content));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new TransformationError(`Failed to compress content: ${message}`, error);
  }
}

export async function decompressContent(content: Buffer): Promise<string> {
  try {
    const buffer = await gunzip(content);
    return buffer.toString('utf8');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new TransformationError(`Failed to decompress content: ${message}`, error);
  }
}