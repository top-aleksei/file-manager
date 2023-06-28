import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { makeAbsolutePath, parsePath } from './utils/changePath.js';
import path, { dirname } from 'path';
import { access } from 'fs/promises';

export async function runCompress(options) {
  try {
    const args = parsePath(options);
    if (!args.argRest) {
      throw new Error();
    }
    const fromPath = makeAbsolutePath(args.argPath);
    const ext = path.extname(fromPath);
    const toFilePath = makeAbsolutePath(args.argRest) + ext + '.brotli';
    const toFolderPath = dirname(toFilePath);
    await access(fromPath);
    await access(toFolderPath);
    const readStream = createReadStream(fromPath);
    const brotli = createBrotliCompress();
    const writeStream = createWriteStream(toFilePath);
    const zipStream = readStream.pipe(brotli).pipe(writeStream);
    zipStream.on('finish', () => console.log('file successfully compressed'));
  } catch {
    console.error('operation failed');
  }
}
export async function runDecompress(options) {
  try {
    const args = parsePath(options);
    if (!args.argRest) {
      throw new Error();
    }
    const fromPath = makeAbsolutePath(args.argPath);
    const ext = path.basename(fromPath).split('.').at(-2);
    const toFilePath = makeAbsolutePath(args.argRest) + '.' + ext;
    const toFolderPath = dirname(toFilePath);

    await access(fromPath);
    await access(toFolderPath);
    const readStream = createReadStream(fromPath);
    const brotli = createBrotliDecompress();
    const writeStream = createWriteStream(toFilePath);
    const zipStream = readStream.pipe(brotli).pipe(writeStream);
    zipStream.on('finish', () => console.log('file successfully decompressed'));
  } catch {
    console.error('operation failed');
  }
}
