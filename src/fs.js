import { access, rm, writeFile } from 'fs/promises';
import { rename as fsRename } from 'fs/promises';

import { makeAbsolutePath, parsePath } from './utils/changePath.js';
import { createReadStream, createWriteStream } from 'fs';
import * as path from 'path';
import { pipeline } from 'stream';

export async function runCat(catPath) {
  let absPath;
  try {
    const parsedPath = parsePath(catPath);
    absPath = makeAbsolutePath(parsedPath.argPath);
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

export async function runRename(options) {
  try {
    const args = parsePath(options);
    const filePath = args.argPath;
    const restArgs = parsePath(args.argRest);
    const fileName = restArgs.argPath;
    try {
      await access(filePath);
    } catch {
      throw new Error('operation failed');
    }
    const fileFolder = path.dirname(filePath);
    const newPath = path.join(fileFolder, fileName);

    await fsRename(filePath, newPath);
    console.log(`file name successeful changed to ${fileName}`);
  } catch (err) {
    console.error(err.message);
  }
}

export async function runCopy(options) {
  try {
    const args = parsePath(options);
    const fromPath = args.argPath;
    const restArgs = parsePath(args.argRest);
    const toPath = path.join(restArgs.argPath, path.basename(fromPath));
    await access(fromPath);
    await access(restArgs.argPath);
    const readStream = createReadStream(fromPath);
    const writeStream = createWriteStream(toPath);
    readStream.pipe(writeStream);
    console.log('file successeful copied');
  } catch (err) {
    console.error('operation failed');
  }
}

export async function runMove(options) {
  try {
    const args = parsePath(options);
    const fromPath = args.argPath;
    const restArgs = parsePath(args.argRest);
    const toPath = path.join(restArgs.argPath, path.basename(fromPath));
    await access(fromPath);
    await access(restArgs.argPath);
    const readStream = createReadStream(fromPath);
    const writeStream = createWriteStream(toPath);
    writeStream.on('close', async () => await rm(fromPath));
    readStream.pipe(writeStream);

    console.log('file successeful moved');
  } catch (err) {
    console.error('operation failed');
  }
}

export async function runDelete(options) {
  try {
    const args = parsePath(options);
    const deletePath = args.argPath;
    await access(deletePath);
    await rm(deletePath);
    console.log('file successfully deleted');
  } catch {
    console.error('operation failed');
  }
}

async function read(absPath) {
  const readStream = createReadStream(absPath, { encoding: 'utf-8' });
  readStream.on('data', console.log).on('error', console.error);
}
