import { createHash } from 'crypto';
import { access, readFile } from 'fs/promises';
import { parsePath } from './utils/changePath.js';

export async function runHash(options) {
  try {
    const args = parsePath(options);
    const filePath = makeAbsolutePath(args.argPath);
    await access(filePath);
    const fileBuffer = await readFile(filePath);
    const hash = createHash('sha256');
    hash.update(fileBuffer);
    const res = hash.digest('hex');
    console.log(`HASH: ${res}`);
  } catch {
    console.error('operation failed');
  }
}
