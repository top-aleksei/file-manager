import { access, rm, writeFile, rename as fsRename } from 'node:fs/promises';
import { makeAbsolutePath, parsePath } from './utils/changePath.js';
import { createReadStream, createWriteStream } from 'node:fs';
import * as path from 'path';

const readFile = async (absPath) =>
  new Promise((resolve, reject) => {
    const readStream = createReadStream(absPath, { encoding: 'utf-8' });
    readStream.on('data', console.log).on('end', resolve).on('error', console.error);
  });

export async function runCat(catPath) {
  let absPath;
  try {
    const parsedPath = parsePath(catPath);
    absPath = makeAbsolutePath(parsedPath.argPath);
    await access(absPath);

    await readFile(absPath);
  } catch {
    console.error(`"${absPath}" doesn't exist or you have no access`);
  }
}

export async function runAdd(fileName) {
  if (!fileName) {
    throw new Error('Specify filename');
  }

  try {
    const absPath = path.join(process.cwd(), fileName);
    await writeFile(absPath, '', { flag: 'wx+' });
  } catch {
    console.error('Operation failed');
  }
}

export async function runRename(options) {
  try {
    const args = parsePath(options);
    const filePath = makeAbsolutePath(args.argPath);
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
    const fromPath = makeAbsolutePath(args.argPath);
    const restArgs = parsePath(args.argRest);
    const toPath = path.join(makeAbsolutePath(restArgs.argPath), path.basename(fromPath));

    await access(fromPath);
    await access(makeAbsolutePath(restArgs.argPath));

    const readStream = createReadStream(fromPath);
    const writeStream = createWriteStream(toPath);
    readStream.pipe(writeStream);
    console.log('file successeful copied');
  } catch {
    console.error('operation failed');
  }
}

export async function runMove(options) {
  try {
    const args = parsePath(options);
    const fromPath = makeAbsolutePath(args.argPath);
    const restArgs = parsePath(args.argRest);
    const toPath = path.join(makeAbsolutePath(restArgs.argPath), path.basename(fromPath));

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
    const deletePath = makeAbsolutePath(args.argPath);
    await access(deletePath);
    await rm(deletePath);
    console.log('file successfully deleted');
  } catch {
    console.error('operation failed');
  }
}
