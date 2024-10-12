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
    let { base } = path.parse(fromPath);

    const toFilePath = path.join(makeAbsolutePath(args.argRest), base + '.brotli');
    const toFolderPath = dirname(toFilePath);

    await access(fromPath);
    await access(toFolderPath);

    const readStream = createReadStream(fromPath);
    const writeStream = createWriteStream(toFilePath);
    const brotli = createBrotliCompress();

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
    let { base } = path.parse(fromPath);
    const toFilePath = path.join(makeAbsolutePath(args.argRest), base.replace('.brotli', ''));
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
