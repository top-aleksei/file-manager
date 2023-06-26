import { access, writeFile } from 'fs/promises';
import { makeAbsolutePath, parsePath } from './utils/changePath.js';
import * as fs from 'fs';
import * as path from 'path';

export async function runCat(catPath) {
  const absPath = makeAbsolutePath(parsePath(catPath));
  try {
    await access(absPath);

    read(absPath);
  } catch {
    console.error(`"${absPath}" doesn't exist or you have no access`);
  }
}

export async function runAdd(fileName) {
  if (!fileName) {
    throw new Error('Specify filename');
  }
  const absPath = path.join(process.cwd(), fileName);
  await writeFile(absPath, '', { flag: 'wx+' });
  console.log('absPath: ', absPath);
}

async function read(absPath) {
  const readStream = fs.createReadStream(absPath, { encoding: 'utf-8' });
  readStream.on('data', console.log).on('error', console.error);
}
